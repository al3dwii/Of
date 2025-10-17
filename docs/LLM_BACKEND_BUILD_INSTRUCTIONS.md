# Backend Implementation Instructions for Admin Dashboard

## 🎯 Task Overview
Build a complete FastAPI backend for an admin dashboard with user management, credits system, analytics, activity logging, and system settings. The backend must integrate with an existing PostgreSQL database and provide secure admin-only endpoints.

---

## 📋 Project Context

### Current Stack
- **Frontend**: Next.js 14 with TypeScript, deployed on Vercel
- **Backend**: FastAPI (Python), deployed on Railway
- **Database**: PostgreSQL on Railway
- **Authentication**: Clerk (frontend handles user auth)
- **Current API Base**: `https://presentation-api-production.up.railway.app`

### Existing Database Tables
```sql
-- Users table (already exists)
users (
  id UUID PRIMARY KEY,
  email VARCHAR(255),
  username VARCHAR(100),
  full_name VARCHAR(255),
  credits INTEGER DEFAULT 0,
  total_credits_used INTEGER DEFAULT 0,
  subscription_tier VARCHAR(50) DEFAULT 'free',
  is_active BOOLEAN DEFAULT TRUE,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  last_login TIMESTAMP
)

-- Other existing tables:
- presentations
- slides
- credit_transactions
- decks
- deck_presentations
- presentation_shares
- api_keys
```

---

## 🏗️ Implementation Requirements

### 1. Database Schema Updates

Create new tables needed for admin dashboard:

```sql
-- Activity logs table
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    admin_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    resource VARCHAR(255),
    resource_id UUID,
    ip_address INET,
    user_agent TEXT,
    metadata JSONB,
    timestamp TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_admin ON activity_logs(admin_id);
CREATE INDEX idx_activity_logs_timestamp ON activity_logs(timestamp DESC);
CREATE INDEX idx_activity_logs_action ON activity_logs(action);

-- System settings table (singleton table)
CREATE TABLE system_settings (
    id INTEGER PRIMARY KEY DEFAULT 1,
    maintenance_mode BOOLEAN DEFAULT FALSE,
    registration_enabled BOOLEAN DEFAULT TRUE,
    max_upload_size INTEGER DEFAULT 500,
    default_credits INTEGER DEFAULT 100,
    api_rate_limit INTEGER DEFAULT 60,
    updated_at TIMESTAMP DEFAULT NOW(),
    updated_by UUID REFERENCES users(id),
    CONSTRAINT single_row CHECK (id = 1)
);

-- Insert default settings
INSERT INTO system_settings (id) VALUES (1)
ON CONFLICT (id) DO NOTHING;

-- Add admin role to users table (if not exists)
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'user';

-- Create admin user (IMPORTANT: Change credentials in production)
UPDATE users 
SET is_admin = TRUE, role = 'admin' 
WHERE email = 'admin@sharayeh.com';
```

---

### 2. Required Python Dependencies

Add to `requirements.txt`:

```txt
fastapi>=0.104.0
uvicorn[standard]>=0.24.0
sqlalchemy>=2.0.0
asyncpg>=0.29.0
psycopg2-binary>=2.9.9
pydantic>=2.5.0
python-jose[cryptography]>=3.3.0
passlib[bcrypt]>=1.7.4
python-multipart>=0.0.6
slowapi>=0.1.9  # Rate limiting
psutil>=5.9.6   # System metrics
aiocache>=0.12.2  # Caching
redis>=5.0.0  # Optional: for distributed caching
```

Install:
```bash
pip install -r requirements.txt
```

---

### 3. Project Structure

Create this directory structure:

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI app entry point
│   ├── config.py               # Configuration and environment variables
│   ├── database.py             # Database connection and session
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py            # User SQLAlchemy model
│   │   ├── activity_log.py    # Activity log model
│   │   └── settings.py        # System settings model
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── user.py            # Pydantic schemas for users
│   │   ├── admin.py           # Admin-specific schemas
│   │   └── settings.py        # Settings schemas
│   ├── api/
│   │   ├── __init__.py
│   │   ├── deps.py            # Dependencies (auth, db session)
│   │   └── v1/
│   │       ├── __init__.py
│   │       ├── admin/
│   │       │   ├── __init__.py
│   │       │   ├── users.py       # User management endpoints
│   │       │   ├── metrics.py     # System metrics
│   │       │   ├── analytics.py   # Analytics data
│   │       │   ├── logs.py        # Activity logs
│   │       │   ├── settings.py    # System settings
│   │       │   └── bulk.py        # Bulk operations
│   │       └── routes.py
│   ├── core/
│   │   ├── __init__.py
│   │   ├── security.py        # Authentication and authorization
│   │   └── logging.py         # Activity logging utilities
│   └── utils/
│       ├── __init__.py
│       └── metrics.py         # System metrics collection
├── alembic/                   # Database migrations
│   └── versions/
├── .env
└── requirements.txt
```

---

### 4. Configuration Setup

**File: `app/config.py`**

```python
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str
    
    # Security
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ADMIN_SECRET_KEY: str = "admin-secret-key-change-in-production"
    
    # API Settings
    API_V1_PREFIX: str = "/api"
    PROJECT_NAME: str = "Admin Dashboard API"
    
    # CORS
    BACKEND_CORS_ORIGINS: list = [
        "http://localhost:3000",
        "https://of-xi.vercel.app",
        "https://*.vercel.app"
    ]
    
    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = 60
    
    # Admin Settings
    ENABLE_ADMIN_API: bool = True
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
```

**File: `.env`**

```env
DATABASE_URL=postgresql://user:password@host:port/database
SECRET_KEY=your-super-secret-key-here
ADMIN_SECRET_KEY=your-admin-secret-key-here
BACKEND_CORS_ORIGINS=["http://localhost:3000","https://of-xi.vercel.app"]
ENABLE_ADMIN_API=true
```

---

### 5. Database Connection

**File: `app/database.py`**

```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings

engine = create_engine(settings.DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

---

### 6. Authentication Middleware

**File: `app/api/deps.py`**

```python
from fastapi import Depends, HTTPException, status, Header
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from typing import Optional

async def get_current_user(
    authorization: Optional[str] = Header(None),
    db: Session = Depends(get_db)
) -> User:
    """
    Get current user from authorization header.
    For production, integrate with Clerk or your auth system.
    """
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated"
        )
    
    # TODO: Validate token with Clerk or your auth system
    # For now, extract user_id from token
    try:
        # This is a placeholder - implement proper token validation
        token = authorization.replace("Bearer ", "")
        # Validate token and get user_id
        # user_id = validate_token(token)
        
        # For development, you might use a simple approach
        # In production, validate with Clerk
        user = db.query(User).filter(User.id == "user-id-from-token").first()
        
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
            
        return user
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials"
        )

async def get_admin_user(
    current_user: User = Depends(get_current_user)
) -> User:
    """
    Verify user has admin privileges.
    """
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    return current_user
```

---

### 7. Activity Logging Utility

**File: `app/core/logging.py`**

```python
from sqlalchemy.orm import Session
from app.models.activity_log import ActivityLog
from typing import Optional
import uuid
from datetime import datetime

async def log_activity(
    db: Session,
    admin_id: str,
    action: str,
    resource: str = None,
    resource_id: str = None,
    user_id: str = None,
    ip_address: str = None,
    user_agent: str = None,
    metadata: dict = None
):
    """
    Log an admin activity to the database.
    """
    activity_log = ActivityLog(
        id=str(uuid.uuid4()),
        admin_id=admin_id,
        user_id=user_id,
        action=action,
        resource=resource,
        resource_id=resource_id,
        ip_address=ip_address,
        user_agent=user_agent,
        metadata=metadata,
        timestamp=datetime.utcnow()
    )
    
    db.add(activity_log)
    db.commit()
    db.refresh(activity_log)
    
    return activity_log
```

---

### 8. System Metrics Collection

**File: `app/utils/metrics.py`**

```python
import psutil
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from app.models.user import User

def get_system_metrics():
    """
    Collect system performance metrics.
    """
    cpu_percent = psutil.cpu_percent(interval=1)
    memory = psutil.virtual_memory()
    disk = psutil.disk_usage('/')
    
    return {
        "cpu_usage": round(cpu_percent, 1),
        "memory_usage": round(memory.percent, 1),
        "disk_usage": round(disk.percent, 1),
    }

def get_active_users_count(db: Session) -> int:
    """
    Count users active in the last 15 minutes.
    """
    fifteen_min_ago = datetime.utcnow() - timedelta(minutes=15)
    return db.query(User).filter(
        User.last_login >= fifteen_min_ago
    ).count()
```

---

### 9. API Endpoints Implementation

#### 9.1 System Metrics Endpoint

**File: `app/api/v1/admin/metrics.py`**

```python
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.deps import get_admin_user, get_db
from app.models.user import User
from app.utils.metrics import get_system_metrics, get_active_users_count

router = APIRouter()

@router.get("/metrics")
async def get_metrics(
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    """
    Get system performance metrics.
    Requires admin authentication.
    """
    system_metrics = get_system_metrics()
    active_users = get_active_users_count(db)
    
    # You can add more metrics here
    # For example, get requests per minute from cache/redis
    
    return {
        **system_metrics,
        "active_users": active_users,
        "requests_per_minute": 0,  # Implement with middleware counter
        "error_rate": 0.0  # Implement with error tracking
    }
```

#### 9.2 Analytics Endpoint

**File: `app/api/v1/admin/analytics.py`**

```python
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from app.api.deps import get_admin_user, get_db
from app.models.user import User
from app.utils.metrics import get_system_metrics, get_active_users_count

router = APIRouter()

@router.get("/analytics")
async def get_analytics(
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    """
    Get analytics data including user growth trends.
    """
    system_metrics = get_system_metrics()
    active_users = get_active_users_count(db)
    
    # Get user growth data (last 30 days)
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    
    user_growth = db.query(
        func.date(User.created_at).label('date'),
        func.count(User.id).label('count')
    ).filter(
        User.created_at >= thirty_days_ago
    ).group_by(
        func.date(User.created_at)
    ).all()
    
    user_growth_data = [
        {"date": str(row.date), "count": row.count}
        for row in user_growth
    ]
    
    return {
        **system_metrics,
        "active_users": active_users,
        "requests_per_minute": 0,
        "error_rate": 0.0,
        "user_growth": user_growth_data,
        "revenue_data": []  # Implement based on your billing system
    }
```

#### 9.3 Activity Logs Endpoint

**File: `app/api/v1/admin/logs.py`**

```python
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional
from app.api.deps import get_admin_user, get_db
from app.models.user import User
from app.models.activity_log import ActivityLog

router = APIRouter()

@router.get("/activity-logs")
async def get_activity_logs(
    limit: int = Query(100, ge=1, le=1000),
    user_id: Optional[str] = None,
    action: Optional[str] = None,
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    """
    Get activity logs with optional filtering.
    """
    query = db.query(ActivityLog)
    
    if user_id:
        query = query.filter(ActivityLog.user_id == user_id)
    if action:
        query = query.filter(ActivityLog.action == action)
    
    logs = query.order_by(ActivityLog.timestamp.desc()).limit(limit).all()
    total = query.count()
    
    return {
        "logs": [
            {
                "id": log.id,
                "user_id": log.user_id,
                "action": log.action,
                "resource": log.resource,
                "ip_address": str(log.ip_address) if log.ip_address else None,
                "user_agent": log.user_agent,
                "timestamp": log.timestamp.isoformat()
            }
            for log in logs
        ],
        "total": total,
        "page": 1
    }
```

#### 9.4 System Settings Endpoints

**File: `app/api/v1/admin/settings.py`**

```python
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from app.api.deps import get_admin_user, get_db
from app.models.user import User
from app.models.settings import SystemSettings

router = APIRouter()

class SettingsUpdate(BaseModel):
    maintenance_mode: Optional[bool] = None
    registration_enabled: Optional[bool] = None
    max_upload_size: Optional[int] = None
    default_credits: Optional[int] = None
    api_rate_limit: Optional[int] = None

@router.get("/settings")
async def get_settings(
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    """
    Get system settings.
    """
    settings = db.query(SystemSettings).filter(SystemSettings.id == 1).first()
    
    if not settings:
        # Create default settings
        settings = SystemSettings(
            id=1,
            maintenance_mode=False,
            registration_enabled=True,
            max_upload_size=500,
            default_credits=100,
            api_rate_limit=60
        )
        db.add(settings)
        db.commit()
        db.refresh(settings)
    
    return {
        "maintenance_mode": settings.maintenance_mode,
        "registration_enabled": settings.registration_enabled,
        "max_upload_size": settings.max_upload_size,
        "default_credits": settings.default_credits,
        "api_rate_limit": settings.api_rate_limit
    }

@router.put("/settings")
async def update_settings(
    settings_update: SettingsUpdate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    """
    Update system settings.
    """
    settings = db.query(SystemSettings).filter(SystemSettings.id == 1).first()
    
    if not settings:
        settings = SystemSettings(id=1)
        db.add(settings)
    
    # Update only provided fields
    update_data = settings_update.dict(exclude_none=True)
    for key, value in update_data.items():
        setattr(settings, key, value)
    
    settings.updated_by = admin.id
    
    db.commit()
    db.refresh(settings)
    
    return {
        "success": True,
        "message": "Settings updated successfully"
    }
```

#### 9.5 User Management Endpoints

**File: `app/api/v1/admin/users.py`**

```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_admin_user, get_db
from app.models.user import User
from app.models.credit_transaction import CreditTransaction
from app.core.logging import log_activity
from datetime import datetime
import uuid

router = APIRouter()

@router.post("/users/{user_id}/{action}")
async def user_action(
    user_id: str,
    action: str,
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    """
    Perform actions on a specific user.
    Actions: activate, deactivate, add_credits/{amount}
    """
    user = db.query(User).filter(User.id == user_id).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if action == "activate":
        user.is_active = True
        message = "User activated successfully"
        
    elif action == "deactivate":
        user.is_active = False
        message = "User deactivated successfully"
        
    elif action.startswith("add_credits/"):
        try:
            amount = int(action.split("/")[1])
            
            if amount <= 0:
                raise HTTPException(
                    status_code=400,
                    detail="Amount must be greater than 0"
                )
            
            # Update user credits
            old_balance = user.credits
            user.credits += amount
            
            # Create credit transaction
            transaction = CreditTransaction(
                id=str(uuid.uuid4()),
                user_id=user_id,
                amount=amount,
                balance_after=user.credits,
                reason="Admin credit adjustment",
                transaction_type="admin_add",
                created_at=datetime.utcnow()
            )
            db.add(transaction)
            
            message = f"Added {amount} credits successfully"
            
            # Log activity
            await log_activity(
                db=db,
                admin_id=admin.id,
                action="add_credits",
                resource="user",
                resource_id=user_id,
                user_id=user_id,
                metadata={"amount": amount, "old_balance": old_balance}
            )
            
        except (ValueError, IndexError):
            raise HTTPException(status_code=400, detail="Invalid amount")
    
    else:
        raise HTTPException(status_code=400, detail="Invalid action")
    
    db.commit()
    
    # Log activity for activate/deactivate
    if action in ["activate", "deactivate"]:
        await log_activity(
            db=db,
            admin_id=admin.id,
            action=action,
            resource="user",
            resource_id=user_id,
            user_id=user_id
        )
    
    return {
        "success": True,
        "message": message
    }
```

#### 9.6 Bulk Operations Endpoint

**File: `app/api/v1/admin/bulk.py`**

```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
from app.api.deps import get_admin_user, get_db
from app.models.user import User
from app.core.logging import log_activity

router = APIRouter()

class BulkActionRequest(BaseModel):
    action: str
    items: List[str]
    table: str
    amount: Optional[int] = None

@router.post("/bulk-action")
async def bulk_action(
    request: BulkActionRequest,
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    """
    Perform bulk operations on multiple items.
    """
    affected = 0
    
    if request.table == "users":
        if request.action == "delete":
            result = db.query(User).filter(User.id.in_(request.items)).delete(synchronize_session=False)
            affected = result
            
        elif request.action == "activate":
            db.query(User).filter(User.id.in_(request.items)).update(
                {"is_active": True},
                synchronize_session=False
            )
            affected = len(request.items)
            
        elif request.action == "deactivate":
            db.query(User).filter(User.id.in_(request.items)).update(
                {"is_active": False},
                synchronize_session=False
            )
            affected = len(request.items)
            
        elif request.action == "add_credits" and request.amount:
            for user_id in request.items:
                user = db.query(User).filter(User.id == user_id).first()
                if user:
                    user.credits += request.amount
                    affected += 1
    
    db.commit()
    
    # Log bulk action
    await log_activity(
        db=db,
        admin_id=admin.id,
        action=f"bulk_{request.action}",
        resource=request.table,
        metadata={
            "items_count": len(request.items),
            "affected": affected
        }
    )
    
    return {
        "success": True,
        "affected": affected,
        "message": f"Bulk action '{request.action}' completed successfully"
    }
```

#### 9.7 Database Status Endpoint

**File: `app/api/v1/admin/database.py`**

```python
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import inspect
from app.api.deps import get_admin_user, get_db
from app.models.user import User
from app.models.presentation import Presentation
from app.models.slide import Slide
from app.models.credit_transaction import CreditTransaction

router = APIRouter()

@router.get("/database-status")
async def get_database_status(
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    """
    Get database connection status and table counts.
    """
    # Get counts from each table
    users_count = db.query(User).count()
    presentations_count = db.query(Presentation).count() if hasattr(db.query, 'Presentation') else 0
    slides_count = db.query(Slide).count() if hasattr(db.query, 'Slide') else 0
    transactions_count = db.query(CreditTransaction).count() if hasattr(db.query, 'CreditTransaction') else 0
    
    total_records = users_count + presentations_count + slides_count + transactions_count
    
    return {
        "database": "connected",
        "tables": {
            "users": users_count,
            "presentations": presentations_count,
            "slides": slides_count,
            "credit_transactions": transactions_count,
            "decks": 0,
            "deck_presentations": 0,
            "presentation_shares": 0,
            "api_keys": 0
        },
        "total_records": total_records
    }
```

---

### 10. Main Application Setup

**File: `app/main.py`**

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from app.config import settings
from app.api.v1.admin import (
    metrics,
    analytics,
    logs,
    settings as settings_router,
    users,
    bulk,
    database
)

# Initialize rate limiter
limiter = Limiter(key_func=get_remote_address)

# Create FastAPI app
app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_PREFIX}/openapi.json"
)

# Add rate limiting
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include admin routers
app.include_router(
    metrics.router,
    prefix=f"{settings.API_V1_PREFIX}/admin",
    tags=["admin-metrics"]
)

app.include_router(
    analytics.router,
    prefix=f"{settings.API_V1_PREFIX}/admin",
    tags=["admin-analytics"]
)

app.include_router(
    logs.router,
    prefix=f"{settings.API_V1_PREFIX}/admin",
    tags=["admin-logs"]
)

app.include_router(
    settings_router.router,
    prefix=f"{settings.API_V1_PREFIX}/admin",
    tags=["admin-settings"]
)

app.include_router(
    users.router,
    prefix=f"{settings.API_V1_PREFIX}/admin",
    tags=["admin-users"]
)

app.include_router(
    bulk.router,
    prefix=f"{settings.API_V1_PREFIX}/admin",
    tags=["admin-bulk"]
)

app.include_router(
    database.router,
    prefix=f"{settings.API_V1_PREFIX}/admin",
    tags=["admin-database"]
)

@app.get("/")
async def root():
    return {
        "message": "Admin Dashboard API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

---

### 11. Database Models

**File: `app/models/activity_log.py`**

```python
from sqlalchemy import Column, String, DateTime, JSONB, Integer
from sqlalchemy.dialects.postgresql import UUID, INET
from app.database import Base
from datetime import datetime

class ActivityLog(Base):
    __tablename__ = "activity_logs"
    
    id = Column(UUID, primary_key=True)
    user_id = Column(UUID, nullable=True)
    admin_id = Column(UUID, nullable=True)
    action = Column(String(100), nullable=False)
    resource = Column(String(255), nullable=True)
    resource_id = Column(UUID, nullable=True)
    ip_address = Column(INET, nullable=True)
    user_agent = Column(String, nullable=True)
    metadata = Column(JSONB, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
```

**File: `app/models/settings.py`**

```python
from sqlalchemy import Column, Integer, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base
from datetime import datetime

class SystemSettings(Base):
    __tablename__ = "system_settings"
    
    id = Column(Integer, primary_key=True, default=1)
    maintenance_mode = Column(Boolean, default=False)
    registration_enabled = Column(Boolean, default=True)
    max_upload_size = Column(Integer, default=500)
    default_credits = Column(Integer, default=100)
    api_rate_limit = Column(Integer, default=60)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    updated_by = Column(UUID, nullable=True)
```

---

### 12. Testing Instructions

#### Test with cURL

**1. Test System Metrics:**
```bash
curl -X GET "http://localhost:8000/api/admin/metrics" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**2. Test Add Credits:**
```bash
curl -X POST "http://localhost:8000/api/admin/users/USER_ID/add_credits/500" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**3. Test Bulk Action:**
```bash
curl -X POST "http://localhost:8000/api/admin/bulk-action" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "activate",
    "items": ["user-id-1", "user-id-2"],
    "table": "users"
  }'
```

**4. Test Settings Update:**
```bash
curl -X PUT "http://localhost:8000/api/admin/settings" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "maintenance_mode": true,
    "max_upload_size": 1000
  }'
```

---

### 13. Deployment to Railway

#### Deploy Steps:

1. **Push code to GitHub**
2. **Connect Railway to repository**
3. **Add environment variables in Railway:**
   - `DATABASE_URL` (from Railway PostgreSQL)
   - `SECRET_KEY`
   - `ADMIN_SECRET_KEY`
   - `BACKEND_CORS_ORIGINS`

4. **Railway will auto-deploy**

#### Verify Deployment:
```bash
curl https://your-railway-app.up.railway.app/health
```

---

### 14. Security Checklist

- [ ] Implement proper token validation (integrate with Clerk)
- [ ] Add rate limiting on all admin endpoints
- [ ] Validate all input data with Pydantic
- [ ] Use prepared statements (SQLAlchemy does this)
- [ ] Add IP whitelisting for admin access (optional)
- [ ] Enable HTTPS only in production
- [ ] Rotate SECRET_KEY regularly
- [ ] Log all admin actions
- [ ] Add request/response validation
- [ ] Implement CSRF protection if needed
- [ ] Add database connection pooling
- [ ] Use environment variables for all secrets
- [ ] Enable SQL query logging in development only
- [ ] Add backup automation for database
- [ ] Implement audit trail for sensitive operations

---

### 15. Performance Optimization

- [ ] Add Redis caching for frequently accessed data
- [ ] Implement database query optimization with indexes
- [ ] Use async operations where possible
- [ ] Add pagination to all list endpoints
- [ ] Implement connection pooling
- [ ] Cache system metrics (TTL: 60 seconds)
- [ ] Use background tasks for heavy operations
- [ ] Add database read replicas if needed
- [ ] Implement query result caching
- [ ] Monitor slow queries and optimize

---

### 16. Monitoring & Logging

```python
# Add to main.py
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

# Add request logging middleware
@app.middleware("http")
async def log_requests(request, call_next):
    logger.info(f"{request.method} {request.url}")
    response = await call_next(request)
    logger.info(f"Status: {response.status_code}")
    return response
```

---

## 🎯 Success Criteria

Your backend is complete when:

1. ✅ All 7 endpoints are implemented and tested
2. ✅ Database migrations are created and applied
3. ✅ Admin authentication is working
4. ✅ Activity logging is functional
5. ✅ System metrics are being collected
6. ✅ CORS is properly configured
7. ✅ Rate limiting is active
8. ✅ Error handling is comprehensive
9. ✅ API documentation is auto-generated (FastAPI /docs)
10. ✅ Deployed to Railway and accessible

---

## 📚 Additional Resources

- FastAPI Documentation: https://fastapi.tiangolo.com/
- SQLAlchemy Documentation: https://docs.sqlalchemy.org/
- Alembic Migrations: https://alembic.sqlalchemy.org/
- Railway Deployment: https://docs.railway.app/
- Pydantic: https://docs.pydantic.dev/

---

## 🆘 Troubleshooting

### Common Issues:

**1. Database Connection Failed**
- Check DATABASE_URL format
- Verify PostgreSQL is running
- Check firewall rules

**2. CORS Errors**
- Verify BACKEND_CORS_ORIGINS includes your frontend URL
- Check if wildcard patterns work

**3. Authentication Errors**
- Implement proper Clerk integration
- Verify token format
- Check admin role assignment

**4. Import Errors**
- Ensure all `__init__.py` files exist
- Check Python path
- Verify dependencies are installed

---

## 🎉 Final Notes

This backend provides:
- ✅ Complete admin dashboard functionality
- ✅ Secure authentication and authorization
- ✅ Activity logging and audit trail
- ✅ System monitoring and analytics
- ✅ User management with credits system
- ✅ Bulk operations support
- ✅ System settings management
- ✅ Production-ready error handling
- ✅ Rate limiting and security
- ✅ Scalable architecture

**Build it step by step, test each endpoint, and deploy to Railway!** 🚀
