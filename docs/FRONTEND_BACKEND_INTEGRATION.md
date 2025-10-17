# Frontend Integration with Backend - Quick Guide

## ✅ What Was Done

Updated the Admin Dashboard to include **Clerk authentication** in all API calls.

---

## 🔧 Changes Made

### 1. Added Clerk Hook
```typescript
import { useAuth } from "@clerk/nextjs";

export default function DatabaseViewer() {
  const { getToken } = useAuth();
  // ...
}
```

### 2. Added Auth Headers to All API Calls
Every `fetch()` call now includes:
```typescript
const token = await getToken();
const headers: HeadersInit = {
  'Content-Type': 'application/json',
};
if (token) {
  headers['Authorization'] = `Bearer ${token}`;
}

fetch(url, { headers })
```

### 3. Updated Functions
- ✅ `fetchData()` - All tab data fetching
- ✅ `handleBulkAction()` - Bulk operations
- ✅ `handleUserAction()` - User actions
- ✅ `handleAddCredits()` - Add credits
- ✅ `handleUpdateSettings()` - Settings updates

---

## 🚀 Next Steps

### Step 1: Restart Frontend
```bash
# Stop current dev server (Ctrl+C)
pnpm run dev
```

### Step 2: Sign In
1. Go to: `http://localhost:3000/sign-in`
2. Sign in with your account
3. Navigate to: `http://localhost:3000/en/administrator`

### Step 3: Set Admin Role in Database
```sql
-- Connect to your PostgreSQL database
UPDATE users 
SET is_admin = TRUE 
WHERE email = 'your-email@example.com';
```

### Step 4: Configure Backend Auth

Your backend needs to verify Clerk tokens. Add this to your FastAPI:

```python
# app/api/deps.py
from fastapi import Depends, HTTPException, Header
from jose import jwt, JWTError
import httpx

async def get_current_user(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    try:
        token = authorization.replace("Bearer ", "")
        
        # Verify with Clerk
        # Get Clerk public key from: https://your-clerk-domain/.well-known/jwks.json
        # Or use Clerk's Python SDK
        
        # For now, you can decode without verification for testing:
        # payload = jwt.decode(token, options={"verify_signature": False})
        
        # Better: Use Clerk SDK
        from clerk_backend_api import Clerk
        clerk = Clerk(bearer_auth="YOUR_CLERK_SECRET_KEY")
        user = clerk.users.get(user_id=payload["sub"])
        
        return user
        
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid token")

async def get_admin_user(current_user = Depends(get_current_user)):
    # Check if user is admin in your database
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    return current_user
```

### Step 5: Add Dependency to Endpoints
```python
@router.get("/api/admin/metrics")
async def get_metrics(admin: User = Depends(get_admin_user)):
    # Your code
    pass
```

### Step 6: Install Clerk Backend SDK
```bash
# In your backend directory
pip install clerk-backend-api
```

---

## 🔍 Testing

### Check Auth Token
Open browser console:
```javascript
// This should show your token
console.log(await clerk.session.getToken())
```

### Check API Calls
1. Open DevTools (F12) → Network tab
2. Navigate to admin dashboard
3. Click on any API call
4. Check "Request Headers" section
5. You should see: `Authorization: Bearer eyJhbG...`

### Test Endpoints
```bash
# Get your token from browser console
TOKEN="your_token_here"

# Test metrics endpoint
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8000/api/admin/metrics
```

---

## ⚠️ Troubleshooting

### Still Getting 401?
**Option A: Quick Test (Disable Auth Temporarily)**
```python
# In backend, remove auth dependency temporarily
@router.get("/api/admin/metrics")
async def get_metrics():  # No admin parameter
    # Your code
```

**Option B: Check Token**
```javascript
// In browser console
const token = await clerk.session.getToken();
console.log('Token:', token);
console.log('Decoded:', JSON.parse(atob(token.split('.')[1])));
```

**Option C: Verify Backend Receives Token**
```python
# In your backend endpoint
@router.get("/api/admin/metrics")
async def get_metrics(authorization: str = Header(None)):
    print(f"Received authorization: {authorization}")
    # Continue...
```

### CORS Issues?
Add to your backend:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://of-xi.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 📊 Current Status

- ✅ Frontend sends auth tokens
- ⚠️ Backend needs to verify tokens
- ⚠️ Database needs admin user set

---

## 🎯 Quick Win

If you want to test **immediately** without setting up Clerk backend verification:

1. **Temporarily disable auth in backend**
2. Test admin dashboard works
3. Then properly implement Clerk verification

This lets you verify everything else works before tackling auth! 🚀
