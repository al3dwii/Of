# Admin Dashboard - Backend API Implementation Guide

## 🎯 Overview
This document provides complete API specifications for the enhanced admin dashboard. Implement these endpoints on your Railway backend to enable all admin dashboard features.

---

## 📡 Required API Endpoints

### 1. System Metrics Endpoint
**GET** `/api/admin/metrics`

Returns current system performance metrics.

**Response:**
```json
{
  "cpu_usage": 45.2,
  "memory_usage": 62.8,
  "disk_usage": 38.5,
  "active_users": 127,
  "requests_per_minute": 450,
  "error_rate": 0.8
}
```

**Implementation Example (FastAPI):**
```python
import psutil
from fastapi import APIRouter

router = APIRouter()

@router.get("/api/admin/metrics")
async def get_system_metrics():
    cpu_percent = psutil.cpu_percent(interval=1)
    memory = psutil.virtual_memory()
    disk = psutil.disk_usage('/')
    
    # Get active users from database
    active_users = await db.users.count_documents({
        "last_activity": {"$gte": datetime.now() - timedelta(minutes=15)}
    })
    
    return {
        "cpu_usage": cpu_percent,
        "memory_usage": memory.percent,
        "disk_usage": disk.percent,
        "active_users": active_users,
        "requests_per_minute": cache.get("rpm", 0),
        "error_rate": cache.get("error_rate", 0.0)
    }
```

---

### 2. Analytics Endpoint
**GET** `/api/admin/analytics`

Returns comprehensive analytics data.

**Response:**
```json
{
  "cpu_usage": 45.2,
  "memory_usage": 62.8,
  "disk_usage": 38.5,
  "active_users": 127,
  "requests_per_minute": 450,
  "error_rate": 0.8,
  "user_growth": [
    {"date": "2025-01-01", "count": 100},
    {"date": "2025-01-02", "count": 105}
  ],
  "revenue_data": [
    {"date": "2025-01-01", "amount": 1500},
    {"date": "2025-01-02", "amount": 1650}
  ]
}
```

**Implementation:**
```python
@router.get("/api/admin/analytics")
async def get_analytics():
    # Get user growth data (last 30 days)
    user_growth = await get_user_growth_data()
    
    # Get revenue trends
    revenue_data = await get_revenue_trends()
    
    # Get system metrics
    metrics = await get_system_metrics()
    
    return {
        **metrics,
        "user_growth": user_growth,
        "revenue_data": revenue_data
    }
```

---

### 3. Activity Logs Endpoint
**GET** `/api/admin/activity-logs`

**Query Parameters:**
- `limit` (optional): Number of logs to return (default: 100)
- `user_id` (optional): Filter by user ID
- `action` (optional): Filter by action type

**Response:**
```json
{
  "logs": [
    {
      "id": "log-uuid-1",
      "user_id": "user-uuid-1",
      "action": "create_presentation",
      "resource": "presentation-uuid-1",
      "ip_address": "192.168.1.1",
      "user_agent": "Mozilla/5.0...",
      "timestamp": "2025-01-15T10:30:00Z"
    }
  ],
  "total": 1543,
  "page": 1
}
```

**Implementation:**
```python
@router.get("/api/admin/activity-logs")
async def get_activity_logs(
    limit: int = 100,
    user_id: str = None,
    action: str = None
):
    query = {}
    if user_id:
        query["user_id"] = user_id
    if action:
        query["action"] = action
    
    logs = await db.activity_logs.find(query)\
        .sort("timestamp", -1)\
        .limit(limit)\
        .to_list()
    
    total = await db.activity_logs.count_documents(query)
    
    return {
        "logs": logs,
        "total": total,
        "page": 1
    }
```

**Activity Log Creation (Middleware):**
```python
from fastapi import Request

async def log_activity(
    request: Request,
    user_id: str,
    action: str,
    resource: str = None
):
    log_entry = {
        "id": str(uuid.uuid4()),
        "user_id": user_id,
        "action": action,
        "resource": resource,
        "ip_address": request.client.host,
        "user_agent": request.headers.get("user-agent", ""),
        "timestamp": datetime.utcnow()
    }
    
    await db.activity_logs.insert_one(log_entry)
```

---

### 4. System Settings Endpoints

#### Get Settings
**GET** `/api/admin/settings`

**Response:**
```json
{
  "maintenance_mode": false,
  "registration_enabled": true,
  "max_upload_size": 500,
  "default_credits": 100,
  "api_rate_limit": 60
}
```

**Implementation:**
```python
@router.get("/api/admin/settings")
async def get_settings():
    settings = await db.system_settings.find_one({})
    
    if not settings:
        # Default settings
        settings = {
            "maintenance_mode": False,
            "registration_enabled": True,
            "max_upload_size": 500,
            "default_credits": 100,
            "api_rate_limit": 60
        }
        await db.system_settings.insert_one(settings)
    
    return settings
```

#### Update Settings
**PUT** `/api/admin/settings`

**Request Body:**
```json
{
  "maintenance_mode": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Settings updated successfully"
}
```

**Implementation:**
```python
from pydantic import BaseModel

class SettingsUpdate(BaseModel):
    maintenance_mode: bool = None
    registration_enabled: bool = None
    max_upload_size: int = None
    default_credits: int = None
    api_rate_limit: int = None

@router.put("/api/admin/settings")
async def update_settings(settings: SettingsUpdate):
    update_data = settings.dict(exclude_none=True)
    
    await db.system_settings.update_one(
        {},
        {"$set": update_data},
        upsert=True
    )
    
    return {
        "success": True,
        "message": "Settings updated successfully"
    }
```

---

### 5. Bulk Actions Endpoint

**POST** `/api/admin/bulk-action`

**Request Body:**
```json
{
  "action": "delete",
  "items": ["item-id-1", "item-id-2"],
  "table": "users"
}
```

**Supported Actions:**
- `delete` - Delete items
- `activate` - Activate items
- `deactivate` - Deactivate items
- `add_credits` - Add credits (users only)

**Response:**
```json
{
  "success": true,
  "affected": 2,
  "message": "Bulk action completed successfully"
}
```

**Implementation:**
```python
class BulkActionRequest(BaseModel):
    action: str
    items: list[str]
    table: str
    amount: int = None  # For add_credits

@router.post("/api/admin/bulk-action")
async def bulk_action(request: BulkActionRequest):
    affected = 0
    
    if request.action == "delete":
        if request.table == "users":
            result = await db.users.delete_many({"id": {"$in": request.items}})
            affected = result.deleted_count
        elif request.table == "presentations":
            result = await db.presentations.delete_many({"id": {"$in": request.items}})
            affected = result.deleted_count
            
    elif request.action == "activate":
        result = await db[request.table].update_many(
            {"id": {"$in": request.items}},
            {"$set": {"is_active": True}}
        )
        affected = result.modified_count
        
    elif request.action == "deactivate":
        result = await db[request.table].update_many(
            {"id": {"$in": request.items}},
            {"$set": {"is_active": False}}
        )
        affected = result.modified_count
        
    elif request.action == "add_credits" and request.table == "users":
        result = await db.users.update_many(
            {"id": {"$in": request.items}},
            {"$inc": {"credits": request.amount}}
        )
        affected = result.modified_count
    
    return {
        "success": True,
        "affected": affected,
        "message": f"Bulk action '{request.action}' completed successfully"
    }
```

---

### 6. User Actions Endpoint

**POST** `/api/admin/users/{user_id}/{action}`

**Supported Actions:**
- `activate` - Activate user account
- `deactivate` - Deactivate user account
- `add_credits/{amount}` - Add credits to user
- `reset_password` - Send password reset email
- `verify_email` - Mark email as verified

**Response:**
```json
{
  "success": true,
  "message": "User activated successfully"
}
```

**Implementation:**
```python
@router.post("/api/admin/users/{user_id}/{action}")
async def user_action(user_id: str, action: str):
    user = await db.users.find_one({"id": user_id})
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if action == "activate":
        await db.users.update_one(
            {"id": user_id},
            {"$set": {"is_active": True}}
        )
        message = "User activated successfully"
        
    elif action == "deactivate":
        await db.users.update_one(
            {"id": user_id},
            {"$set": {"is_active": False}}
        )
        message = "User deactivated successfully"
        
    elif action.startswith("add_credits/"):
        amount = int(action.split("/")[1])
        await db.users.update_one(
            {"id": user_id},
            {"$inc": {"credits": amount}}
        )
        
        # Log transaction
        await db.credit_transactions.insert_one({
            "id": str(uuid.uuid4()),
            "user_id": user_id,
            "amount": amount,
            "reason": "Admin credit adjustment",
            "transaction_type": "admin_add",
            "created_at": datetime.utcnow()
        })
        
        message = f"Added {amount} credits successfully"
    
    # Log admin action
    await log_activity(
        request=request,
        user_id=request.state.admin_id,
        action=f"user_{action}",
        resource=user_id
    )
    
    return {
        "success": True,
        "message": message
    }
```

---

## 🔐 Authentication & Authorization

### Admin Check Middleware
```python
from fastapi import Depends, HTTPException, status

async def verify_admin(request: Request):
    # Get user from token
    token = request.headers.get("Authorization")
    user = await verify_token(token)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication"
        )
    
    # Check if user is admin
    if not user.get("is_admin"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    
    request.state.admin_id = user["id"]
    return user

# Apply to all admin routes
@router.get("/api/admin/metrics", dependencies=[Depends(verify_admin)])
async def get_system_metrics():
    # ...
```

---

## 📊 Database Schema Updates

### Activity Logs Table
```sql
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    resource VARCHAR(255),
    ip_address INET,
    user_agent TEXT,
    timestamp TIMESTAMP DEFAULT NOW(),
    metadata JSONB
);

CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_timestamp ON activity_logs(timestamp DESC);
CREATE INDEX idx_activity_logs_action ON activity_logs(action);
```

### System Settings Table
```sql
CREATE TABLE system_settings (
    id SERIAL PRIMARY KEY,
    maintenance_mode BOOLEAN DEFAULT FALSE,
    registration_enabled BOOLEAN DEFAULT TRUE,
    max_upload_size INTEGER DEFAULT 500,
    default_credits INTEGER DEFAULT 100,
    api_rate_limit INTEGER DEFAULT 60,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert default settings
INSERT INTO system_settings (id) VALUES (1);
```

---

## 🧪 Testing Endpoints

### Using cURL

**Test Metrics:**
```bash
curl -X GET "http://localhost:8000/api/admin/metrics" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

**Test Bulk Action:**
```bash
curl -X POST "http://localhost:8000/api/admin/bulk-action" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "activate",
    "items": ["user-id-1", "user-id-2"],
    "table": "users"
  }'
```

**Test Settings Update:**
```bash
curl -X PUT "http://localhost:8000/api/admin/settings" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "maintenance_mode": true,
    "max_upload_size": 1000
  }'
```

---

## 📝 Implementation Checklist

- [ ] Install psutil for system metrics (`pip install psutil`)
- [ ] Create activity_logs table/collection
- [ ] Create system_settings table/collection
- [ ] Implement admin authentication middleware
- [ ] Add metrics endpoint with system monitoring
- [ ] Add analytics endpoint with charts data
- [ ] Add activity logs endpoint with filtering
- [ ] Add settings GET/PUT endpoints
- [ ] Add bulk actions endpoint
- [ ] Add user actions endpoint
- [ ] Create activity logging middleware
- [ ] Add error handling and validation
- [ ] Add rate limiting for admin endpoints
- [ ] Test all endpoints thoroughly
- [ ] Update CORS settings to allow frontend

---

## 🚀 Deployment Notes

1. **Environment Variables:**
```env
ADMIN_SECRET_KEY=your-secret-key
ENABLE_ADMIN_API=true
ADMIN_RATE_LIMIT=100
```

2. **Rate Limiting:**
```python
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@router.get("/api/admin/metrics")
@limiter.limit("10/minute")
async def get_system_metrics():
    # ...
```

3. **Caching:**
```python
from aiocache import cached

@cached(ttl=60)  # Cache for 60 seconds
async def get_system_metrics():
    # Expensive operations
```

---

## 📞 Support & Troubleshooting

**Common Issues:**

1. **401 Unauthorized:**
   - Check admin authentication middleware
   - Verify token is valid and user has admin role

2. **500 Server Error:**
   - Check database connection
   - Verify all required tables exist
   - Check server logs for details

3. **Slow Performance:**
   - Add database indexes
   - Implement caching
   - Optimize expensive queries

4. **CORS Errors:**
   - Update CORS settings to include frontend URL
   - Check allowed methods and headers

---

## 🎯 Next Steps

1. Implement all endpoints on Railway backend
2. Test each endpoint with Postman or cURL
3. Update frontend `.env` with correct API base URL
4. Test admin dashboard end-to-end
5. Add monitoring and logging
6. Deploy to production

**Ready to build! 🚀**
