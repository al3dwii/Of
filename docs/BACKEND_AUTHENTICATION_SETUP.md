# Backend Authentication Setup Guide

## Current Status ✅

Your frontend is now successfully connected to the Railway backend! You're getting **401 Unauthorized** errors, which means:

- ✅ Frontend correctly connects to Railway (`presentation-api-production.up.railway.app`)
- ✅ Frontend sends Clerk authentication tokens
- ❌ Backend needs to verify Clerk tokens and check admin role

## Error Analysis

Current errors from browser console:
```
401 Unauthorized from:
- /api/admin/database-status
- /api/admin/metrics
- /api/admin/analytics
- /api/admin/users
- /api/admin/slides
```

**This is expected!** The backend hasn't been configured to verify Clerk tokens yet.

---

## Solution: Implement Clerk Authentication in Backend

### Step 1: Install Clerk Backend Package

In your **FastAPI backend** directory:

```bash
pip install clerk-backend-api
```

Add to `requirements.txt`:
```txt
clerk-backend-api
```

---

### Step 2: Create Authentication Dependency

Create a new file: `app/api/deps.py`

```python
from fastapi import Depends, HTTPException, Header
from clerk_backend_api import Clerk
import os

# Initialize Clerk with your secret key
clerk = Clerk(bearer_auth=os.getenv("CLERK_SECRET_KEY"))

async def get_current_user(authorization: str = Header(None)):
    """
    Verify Clerk JWT token and return user data.
    
    Args:
        authorization: Authorization header with format "Bearer <token>"
    
    Returns:
        dict: User information from Clerk
    
    Raises:
        HTTPException: 401 if token is missing or invalid
    """
    if not authorization:
        raise HTTPException(
            status_code=401, 
            detail="Not authenticated - No authorization header"
        )
    
    try:
        # Extract token from "Bearer <token>"
        token = authorization.replace("Bearer ", "")
        
        # Verify token with Clerk
        session = clerk.sessions.verify_token(token)
        
        return {
            "user_id": session.user_id,
            "session_id": session.id
        }
        
    except Exception as e:
        print(f"❌ Token verification failed: {e}")
        raise HTTPException(
            status_code=401, 
            detail="Invalid or expired token"
        )


async def get_admin_user(current_user = Depends(get_current_user)):
    """
    Check if the authenticated user has admin privileges.
    
    Args:
        current_user: User data from get_current_user dependency
    
    Returns:
        User: Database user object with admin privileges
    
    Raises:
        HTTPException: 403 if user is not admin or not found
    """
    from app.database import SessionLocal
    from app.models import User
    
    db = SessionLocal()
    try:
        # Find user by Clerk ID
        user = db.query(User).filter(
            User.clerk_id == current_user["user_id"]
        ).first()
        
        if not user:
            raise HTTPException(
                status_code=403, 
                detail="User not found in database"
            )
        
        if not user.is_admin:
            raise HTTPException(
                status_code=403, 
                detail="Admin privileges required"
            )
        
        return user
        
    finally:
        db.close()
```

---

### Step 3: Update Admin Endpoints

In your admin routes file (e.g., `app/api/routes/admin.py`):

```python
from fastapi import APIRouter, Depends
from app.api.deps import get_admin_user
from app.models import User

router = APIRouter()

@router.get("/api/admin/database-status")
async def get_database_status(admin_user: User = Depends(get_admin_user)):
    """
    Get database connection status.
    Requires admin authentication.
    """
    # Your implementation here
    return {
        "status": "connected",
        "admin_user": admin_user.email
    }


@router.get("/api/admin/metrics")
async def get_metrics(admin_user: User = Depends(get_admin_user)):
    """
    Get system metrics.
    Requires admin authentication.
    """
    # Your implementation here
    return {
        "metrics": {},
        "admin_user": admin_user.email
    }


@router.get("/api/admin/analytics")
async def get_analytics(admin_user: User = Depends(get_admin_user)):
    """
    Get analytics data.
    Requires admin authentication.
    """
    # Your implementation here
    return {
        "analytics": {},
        "admin_user": admin_user.email
    }


@router.get("/api/admin/users")
async def get_users(admin_user: User = Depends(get_admin_user)):
    """
    Get all users.
    Requires admin authentication.
    """
    # Your implementation here
    return {
        "users": [],
        "admin_user": admin_user.email
    }


@router.get("/api/admin/slides")
async def get_slides(
    limit: int = 100,
    admin_user: User = Depends(get_admin_user)
):
    """
    Get slides data.
    Requires admin authentication.
    """
    # Your implementation here
    return {
        "slides": [],
        "limit": limit,
        "admin_user": admin_user.email
    }
```

**Pattern to follow:**
```python
async def endpoint_name(admin_user: User = Depends(get_admin_user)):
    # admin_user is now available with verified admin privileges
    pass
```

---

### Step 4: Set Admin Role in Database

You need to mark your user as admin in the PostgreSQL database.

#### Option A: Using Railway PostgreSQL Console

1. Go to Railway dashboard
2. Select your PostgreSQL service
3. Click "Query" tab
4. Run:

```sql
-- If you have a clerk_id column
UPDATE users 
SET is_admin = TRUE 
WHERE clerk_id = 'user_XXXXXXXXXXXX';

-- Or if you identify by email
UPDATE users 
SET is_admin = TRUE 
WHERE email = 'your-email@example.com';

-- Verify it worked
SELECT id, email, clerk_id, is_admin 
FROM users 
WHERE email = 'your-email@example.com';
```

#### Option B: Using psql CLI

```bash
# Connect to Railway PostgreSQL
psql <your-railway-database-url>

# Run the update
UPDATE users SET is_admin = TRUE WHERE email = 'your-email@example.com';

# Verify
SELECT email, is_admin FROM users;
```

#### Option C: If `is_admin` column doesn't exist

```sql
-- Add the column
ALTER TABLE users ADD COLUMN is_admin BOOLEAN DEFAULT FALSE;

-- Set your user as admin
UPDATE users SET is_admin = TRUE WHERE email = 'your-email@example.com';
```

---

### Step 5: Add Environment Variable to Railway

1. Go to Railway dashboard
2. Select your FastAPI backend service
3. Go to **Variables** tab
4. Add new variable:

```
Key:   CLERK_SECRET_KEY
Value: sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

You can find your Clerk Secret Key at:
- Clerk Dashboard → Your Application → API Keys → Secret keys

**Important:** Use the **secret key** (starts with `sk_test_` or `sk_live_`), NOT the publishable key!

---

### Step 6: Redeploy Backend

After making changes:

```bash
# In your backend directory
git add .
git commit -m "Add Clerk authentication to admin endpoints"
git push origin main
```

Railway will automatically redeploy with the new code.

---

## Quick Alternative: Test Without Auth (Temporary)

If you want to verify everything else works before implementing full authentication, you can **temporarily** disable auth:

### Temporary Option 1: Skip Auth Dependency

```python
# Comment out the dependency temporarily
@router.get("/api/admin/database-status")
async def get_database_status():  # Remove: admin_user = Depends(get_admin_user)
    """TEMPORARY - No auth check"""
    # Your code here
    return {"status": "connected"}
```

### Temporary Option 2: Create a Bypass Dependency

```python
# In app/api/deps.py
async def get_admin_user_bypass():
    """TEMPORARY - Skip auth for testing"""
    print("⚠️ WARNING: Authentication bypassed for testing!")
    return {"email": "test@example.com", "is_admin": True}

# In routes
@router.get("/api/admin/database-status")
async def get_database_status(admin_user = Depends(get_admin_user_bypass)):
    # Your code
    pass
```

**⚠️ Remember to remove this bypass before going to production!**

---

## Testing the Setup

### 1. Test Frontend Connection

After implementing authentication:

1. Open `http://localhost:3000/en/administrator`
2. Sign in with Clerk
3. Open DevTools (F12) → Network tab
4. Refresh the page
5. Check API calls to Railway

**Expected successful response:**
```json
{
  "status": "connected",
  "admin_user": "your-email@example.com"
}
```

### 2. Verify Authentication Headers

In Network tab, click on any admin API call:
- **Request Headers** should show: `Authorization: Bearer eyJhbG...`
- **Status Code** should be: `200 OK` (not 401)

### 3. Test Admin Privileges

If you see `403 Forbidden` instead of `401`:
- ✅ Authentication works (token verified)
- ❌ User is not marked as admin in database
- → Run the SQL UPDATE command from Step 4

---

## Troubleshooting

### Still Getting 401 Errors

**Check:**
1. `CLERK_SECRET_KEY` is set in Railway environment variables
2. Backend has been redeployed after adding the environment variable
3. Clerk secret key is correct (from Clerk dashboard)

**Debug:**
```python
# Add logging in deps.py
async def get_current_user(authorization: str = Header(None)):
    print(f"🔍 Authorization header: {authorization[:50]}...")  # First 50 chars
    
    if not authorization:
        print("❌ No authorization header!")
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    try:
        token = authorization.replace("Bearer ", "")
        print(f"🔑 Token: {token[:50]}...")
        
        session = clerk.sessions.verify_token(token)
        print(f"✅ Token verified for user: {session.user_id}")
        
        return {"user_id": session.user_id, "session_id": session.id}
    except Exception as e:
        print(f"❌ Token verification failed: {e}")
        raise HTTPException(status_code=401, detail="Invalid token")
```

### Getting 403 Forbidden

**User is authenticated but not admin:**

1. Check if user exists in database:
```sql
SELECT email, clerk_id, is_admin FROM users WHERE email = 'your@email.com';
```

2. If user doesn't exist, create one:
```sql
INSERT INTO users (email, clerk_id, is_admin, created_at) 
VALUES ('your@email.com', 'user_XXXX', TRUE, NOW());
```

3. If user exists but `is_admin` is FALSE:
```sql
UPDATE users SET is_admin = TRUE WHERE email = 'your@email.com';
```

### Clerk Token Verification Fails

**Check Clerk configuration:**
1. Correct secret key format: `sk_test_XXXXXXXXXXXX` or `sk_live_XXXXXXXXXXXX`
2. Secret key matches your Clerk application
3. Token hasn't expired (Clerk tokens expire after 1 hour by default)

---

## Security Best Practices

### 1. Use Different Keys for Development/Production

**.env (local development):**
```env
CLERK_SECRET_KEY=sk_test_XXXXXXXXXXXX
```

**Railway (production):**
```env
CLERK_SECRET_KEY=sk_live_XXXXXXXXXXXX
```

### 2. Never Commit Secret Keys

Add to `.gitignore`:
```
.env
.env.local
*.pem
*.key
```

### 3. Add Rate Limiting

```python
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@router.get("/api/admin/users")
@limiter.limit("10/minute")
async def get_users(admin_user: User = Depends(get_admin_user)):
    # Limited to 10 requests per minute
    pass
```

### 4. Add Logging

```python
import logging

logger = logging.getLogger(__name__)

@router.get("/api/admin/database-status")
async def get_database_status(admin_user: User = Depends(get_admin_user)):
    logger.info(f"Admin {admin_user.email} accessed database status")
    # Your code
```

---

## Next Steps After Authentication Works

1. ✅ Verify all admin endpoints return 200 instead of 401
2. ✅ Test all admin dashboard features
3. ✅ Add proper error handling
4. ✅ Add activity logging for admin actions
5. ✅ Set up monitoring/alerts
6. ✅ Test with multiple users (admin and non-admin)

---

## Related Documentation

- [ADMINISTRATOR_DATA_FLOW.md](./ADMINISTRATOR_DATA_FLOW.md) - Data flow architecture
- [FRONTEND_BACKEND_INTEGRATION.md](./FRONTEND_BACKEND_INTEGRATION.md) - Frontend integration guide
- [Clerk Backend API Docs](https://clerk.com/docs/backend-requests/overview) - Official Clerk documentation

---

## Questions?

If you encounter any issues:

1. Check Railway logs for backend errors
2. Check browser console for frontend errors
3. Verify environment variables are set correctly
4. Ensure database user has `is_admin = TRUE`
5. Confirm Clerk secret key is valid

**Common issue:** If you still see 401 after setup, restart the Railway backend service to ensure it picks up the new `CLERK_SECRET_KEY` environment variable.
