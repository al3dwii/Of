# Administrator Dashboard - Data Flow Documentation

## 📁 Location
`/Users/omair/Oold/Of/src/app/[locale]/administrator/`

## 📊 Data Source Summary

The **Administrator Dashboard** gets its data from a **FastAPI Backend** hosted on Railway.

---

## 🔗 API Endpoints

### Base URL
```
NEXT_PUBLIC_API_BASE=https://presentation-api-production.up.railway.app
```

**Fallback (Local Development):**
```javascript
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";
```

---

## 📋 Data Flow by Tab

### 1. **Overview Tab**
**Fetches:**
- Database status
- System metrics

**API Calls:**
```javascript
GET ${API_BASE}/api/admin/database-status
GET ${API_BASE}/api/admin/metrics
```

**Returns:**
```typescript
{
  database: string,
  tables: {
    users: number,
    presentations: number,
    slides: number,
    credit_transactions: number,
    decks: number,
    deck_presentations: number,
    presentation_shares: number,
    api_keys: number
  },
  total_records: number
}
```

---

### 2. **Analytics Tab**
**Fetches:**
- System performance metrics
- User growth data
- Revenue trends

**API Calls:**
```javascript
GET ${API_BASE}/api/admin/analytics
```

**Returns:**
```typescript
{
  cpu_usage: number,
  memory_usage: number,
  disk_usage: number,
  active_users: number,
  requests_per_minute: number,
  error_rate: number
}
```

---

### 3. **Users Tab**
**Fetches:**
- All registered users
- User details (email, credits, subscription tier, etc.)

**API Calls:**
```javascript
GET ${API_BASE}/api/admin/users
```

**Fallback (if admin endpoint fails):**
```javascript
GET ${API_BASE}/api/credits  // Gets current user only
```

**Returns:**
```typescript
{
  users: [
    {
      id: string,
      email: string,
      username: string,
      full_name: string,
      credits: number,
      total_credits_used: number,
      subscription_tier: string,
      is_active: boolean,
      is_verified: boolean,
      created_at: string,
      updated_at: string,
      last_login: string | null
    }
  ]
}
```

---

### 4. **Transactions Tab**
**Fetches:**
- Credit transaction history
- User purchases and deductions

**API Calls:**
```javascript
GET ${API_BASE}/api/credits/transactions?limit=100
```

**Returns:**
```typescript
{
  transactions: [
    {
      id: string,
      user_id: string,
      amount: number,
      balance_after: number,
      reason: string,
      transaction_type: string,
      job_id: string | null,
      created_at: string
    }
  ]
}
```

---

### 5. **Presentations Tab**
**Fetches:**
- All presentations created by users

**API Calls:**
```javascript
GET ${API_BASE}/api/presentations/list?limit=100
```

**Returns:**
```typescript
{
  presentations: [
    {
      id: string,
      user_id: string,
      title: string,
      description: string | null,
      num_slides: number,
      prompt: string,
      status: string,
      is_public: boolean,
      view_count: number,
      thumbnail_url: string | null,
      pptx_url: string | null,
      artifacts_path: string | null,
      created_at: string,
      updated_at: string,
      published_at: string | null
    }
  ]
}
```

---

### 6. **Slides Tab**
**Fetches:**
- Individual slides from presentations

**API Calls:**
```javascript
GET ${API_BASE}/api/admin/slides?limit=100
```

**Returns:**
```typescript
{
  slides: [
    {
      id: string,
      presentation_id: string,
      slide_number: number,
      title: string,
      content: string,
      notes: string | null,
      layout_type: string,
      background_color: string | null,
      text_color: string | null,
      image_url: string | null,
      created_at: string,
      updated_at: string
    }
  ]
}
```

---

### 7. **Activity Logs Tab**
**Fetches:**
- Admin action history
- User activity tracking

**API Calls:**
```javascript
GET ${API_BASE}/api/admin/activity-logs?limit=100
```

**Returns:**
```typescript
{
  logs: [
    {
      id: string,
      user_id: string,
      action: string,
      resource: string,
      ip_address: string,
      user_agent: string,
      timestamp: string
    }
  ]
}
```

---

### 8. **API Keys Tab**
**Fetches:**
- User API keys
- API key status and usage

**API Calls:**
```javascript
GET ${API_BASE}/api/admin/api-keys?limit=100
```

**Returns:**
```typescript
{
  api_keys: [
    {
      id: string,
      user_id: string,
      key_name: string,
      key_hash: string,
      is_active: boolean,
      last_used_at: string | null,
      created_at: string,
      revoked_at: string | null
    }
  ]
}
```

---

### 9. **Settings Tab**
**Fetches:**
- System configuration
- Feature flags

**API Calls:**
```javascript
GET ${API_BASE}/api/admin/settings
PUT ${API_BASE}/api/admin/settings  // To update settings
```

**Returns:**
```typescript
{
  maintenance_mode: boolean,
  registration_enabled: boolean,
  max_upload_size: number,
  default_credits: number,
  api_rate_limit: number
}
```

---

## 🔧 Admin Actions

### User Management
```javascript
// Activate/Deactivate User
POST ${API_BASE}/api/admin/users/{userId}/activate
POST ${API_BASE}/api/admin/users/{userId}/deactivate

// Add Credits to User
POST ${API_BASE}/api/admin/users/{userId}/add_credits/{amount}
```

### Bulk Operations
```javascript
POST ${API_BASE}/api/admin/bulk-action
Body: {
  action: "activate" | "deactivate" | "delete" | "add_credits",
  items: string[],  // Array of IDs
  table: "users" | "presentations" | "slides",
  amount?: number   // For add_credits action
}
```

---

## 🏗️ Backend Architecture

### Technology Stack
- **Backend:** FastAPI (Python)
- **Database:** PostgreSQL (Railway)
- **Deployment:** Railway
- **Authentication:** Clerk (frontend) + Admin middleware (backend)

### Database Tables
1. `users` - User accounts
2. `presentations` - Generated presentations
3. `slides` - Individual slides
4. `credit_transactions` - Credit history
5. `decks` - Presentation collections
6. `deck_presentations` - Deck-presentation relationships
7. `presentation_shares` - Shared presentations
8. `api_keys` - User API keys
9. `activity_logs` - Admin action logs *(to be created)*
10. `system_settings` - System configuration *(to be created)*

---

## 🔐 Authentication Flow

### Frontend (Current State)
```typescript
// No authentication check implemented yet
// TODO in page.tsx:
export default function Page() {
  // TODO: Add authentication protection
  // Use Clerk's auth() with proper middleware configuration
  return <AdminDashboard />;
}
```

### Backend (Required)
```python
# Each admin endpoint should verify:
1. User is authenticated (valid Clerk token)
2. User has admin role (is_admin = TRUE in database)

# Example middleware:
async def get_admin_user(current_user: User = Depends(get_current_user)) -> User:
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    return current_user
```

---

## 🚀 Current Status

### ✅ Implemented (Frontend)
- Complete admin dashboard UI
- 9 functional tabs
- User management interface
- Add credits modal
- Bulk operations UI
- Search functionality
- System metrics display
- Activity logs display
- Settings management UI

### ⚠️ Pending (Backend)
- Most admin API endpoints (only basic ones exist)
- Activity logging system
- System metrics collection
- Settings management endpoints
- Bulk operations endpoint
- Admin authentication middleware

### 📝 Required Backend Implementation
See these files for complete instructions:
1. `/docs/LLM_BACKEND_BUILD_INSTRUCTIONS.md` - Complete backend guide
2. `/docs/ADMIN_API_QUICK_REFERENCE.md` - API endpoint reference
3. `/docs/BACKEND_IMPLEMENTATION_CHECKLIST.md` - Step-by-step checklist

---

## 🔄 Data Refresh Strategy

### Automatic Refresh
```typescript
useEffect(() => {
  fetchData();
}, [activeTab]);  // Refetches when tab changes
```

### Manual Refresh
User can switch tabs to trigger refresh, or implement a refresh button:
```typescript
<button onClick={() => fetchData()}>Refresh</button>
```

### Real-time Updates
Currently **NOT implemented**. Possible future enhancements:
- WebSocket connection for live updates
- Server-Sent Events (SSE)
- Polling with setInterval

---

## 🛠️ Local Development Setup

### 1. Set Environment Variable
```bash
# In .env or .env.local
NEXT_PUBLIC_API_BASE=http://localhost:8000
```

### 2. Start Backend (FastAPI)
```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

### 3. Start Frontend (Next.js)
```bash
cd frontend
pnpm run dev
```

### 4. Access Admin Dashboard
```
http://localhost:3000/en/administrator
```

---

## 🌐 Production Setup

### Backend URL
```
https://presentation-api-production.up.railway.app
```

### Frontend Access
```
https://sharayeh.com/en/administrator
https://sharayeh.com/ar/administrator
https://sharayeh.com/es/administrator
```

### CORS Configuration
Backend must allow requests from:
```python
BACKEND_CORS_ORIGINS = [
    "http://localhost:3000",
    "https://sharayeh.com"
]
```

---

## 🔍 Debugging Data Issues

### Check API Base URL
```javascript
console.log('API Base:', process.env.NEXT_PUBLIC_API_BASE);
```

### Check Network Requests
1. Open browser DevTools
2. Go to Network tab
3. Switch tabs in admin dashboard
4. Inspect API calls and responses

### Common Issues

**1. CORS Errors**
```
Access to fetch at 'https://...' from origin 'https://...' has been blocked by CORS policy
```
**Solution:** Add frontend domain to backend CORS whitelist

**2. 401 Unauthorized**
```
{"detail": "Not authenticated"}
```
**Solution:** Implement authentication in frontend

**3. 403 Forbidden**
```
{"detail": "Admin access required"}
```
**Solution:** Set `is_admin = TRUE` for your user in database

**4. Empty Data**
```
[]  or  null
```
**Solution:** 
- Check if backend endpoint exists
- Verify database has data
- Check API endpoint implementation

---

## 📊 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                  Next.js Frontend                       │
│         /src/app/[locale]/administrator/                │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │         AdminDashboard Component                  │  │
│  │                                                    │  │
│  │  [Overview] [Analytics] [Users] [Transactions]    │  │
│  │  [Presentations] [Slides] [Logs] [API Keys]       │  │
│  │  [Settings]                                        │  │
│  │                                                    │  │
│  │  useEffect(() => fetchData(), [activeTab])        │  │
│  └──────────────┬───────────────────────────────────┘  │
│                 │                                        │
│                 │ HTTP Requests                          │
│                 ▼                                        │
└─────────────────┼─────────────────────────────────────┘
                  │
                  │ HTTPS
                  │
┌─────────────────▼─────────────────────────────────────┐
│           FastAPI Backend (Railway)                    │
│    https://presentation-api-production.up.railway.app  │
│                                                         │
│  ┌─────────────────────────────────────────────────┐  │
│  │         API Endpoints                            │  │
│  │                                                   │  │
│  │  /api/admin/database-status                      │  │
│  │  /api/admin/metrics                              │  │
│  │  /api/admin/analytics                            │  │
│  │  /api/admin/users                                │  │
│  │  /api/admin/activity-logs                        │  │
│  │  /api/admin/settings                             │  │
│  │  /api/credits/transactions                       │  │
│  │  /api/presentations/list                         │  │
│  │  ... etc                                         │  │
│  │                                                   │  │
│  └─────────────┬─────────────────────────────────────┘│
│                │                                        │
│                │ SQL Queries                            │
│                ▼                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │      PostgreSQL Database (Railway)                │ │
│  │                                                    │ │
│  │  Tables: users, presentations, slides,            │ │
│  │          credit_transactions, decks, etc.         │ │
│  └──────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## 📌 Key Files

### Frontend
- `/src/app/[locale]/administrator/page.tsx` - Route entry point
- `/src/app/[locale]/administrator/AdminDashboard.tsx` - Main dashboard component (2,031 lines)

### Environment
- `/.env` - Environment variables (contains API_BASE URL)

### Documentation
- `/docs/LLM_BACKEND_BUILD_INSTRUCTIONS.md` - Backend implementation guide
- `/docs/ADMIN_API_QUICK_REFERENCE.md` - API reference
- `/docs/BACKEND_IMPLEMENTATION_CHECKLIST.md` - Implementation checklist
- `/docs/ADD_CREDITS_MODAL.md` - Add credits feature documentation

---

## 🎯 Summary

The **Administrator Dashboard** (`/administrator`) is a **Next.js frontend** that fetches all its data from a **FastAPI backend** hosted on **Railway**. 

- **No local data** - Everything comes from the backend API
- **Production URL:** `https://presentation-api-production.up.railway.app`
- **Fallback URL:** `http://localhost:8000` (development)
- **Database:** PostgreSQL on Railway
- **Status:** Frontend complete, backend partially implemented

The backend needs to be fully built following the instructions in `/docs/LLM_BACKEND_BUILD_INSTRUCTIONS.md` to make all admin features functional.
