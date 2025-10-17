# Quick Reference: Admin Backend API Endpoints

## 🎯 Base URL
```
Production: https://presentation-api-production.up.railway.app
Development: http://localhost:8000
```

---

## 📡 Admin API Endpoints

### Authentication
All admin endpoints require:
```
Authorization: Bearer YOUR_TOKEN
```

---

### 1. System Metrics
```http
GET /api/admin/metrics
```

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

---

### 2. Analytics Data
```http
GET /api/admin/analytics
```

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
    {"date": "2025-01-01", "count": 100}
  ],
  "revenue_data": []
}
```

---

### 3. Activity Logs
```http
GET /api/admin/activity-logs?limit=100&user_id=xxx&action=xxx
```

**Query Parameters:**
- `limit` (optional): Number of logs (default: 100, max: 1000)
- `user_id` (optional): Filter by user ID
- `action` (optional): Filter by action type

**Response:**
```json
{
  "logs": [
    {
      "id": "log-uuid",
      "user_id": "user-uuid",
      "action": "create_presentation",
      "resource": "presentation",
      "ip_address": "192.168.1.1",
      "user_agent": "Mozilla/5.0...",
      "timestamp": "2025-10-16T10:30:00Z"
    }
  ],
  "total": 1543,
  "page": 1
}
```

---

### 4. System Settings - Get
```http
GET /api/admin/settings
```

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

---

### 5. System Settings - Update
```http
PUT /api/admin/settings
Content-Type: application/json
```

**Request Body:**
```json
{
  "maintenance_mode": true,
  "max_upload_size": 1000,
  "default_credits": 200
}
```

**Response:**
```json
{
  "success": true,
  "message": "Settings updated successfully"
}
```

---

### 6. User Actions
```http
POST /api/admin/users/{user_id}/{action}
```

**Available Actions:**
- `activate` - Activate user account
- `deactivate` - Deactivate user account
- `add_credits/{amount}` - Add credits (e.g., `add_credits/500`)

**Example:**
```http
POST /api/admin/users/abc123/add_credits/500
```

**Response:**
```json
{
  "success": true,
  "message": "Added 500 credits successfully"
}
```

---

### 7. Bulk Actions
```http
POST /api/admin/bulk-action
Content-Type: application/json
```

**Request Body:**
```json
{
  "action": "activate",
  "items": ["user-id-1", "user-id-2"],
  "table": "users",
  "amount": 100
}
```

**Available Actions:**
- `delete` - Delete items
- `activate` - Activate items
- `deactivate` - Deactivate items
- `add_credits` - Add credits (requires `amount` field)

**Response:**
```json
{
  "success": true,
  "affected": 2,
  "message": "Bulk action 'activate' completed successfully"
}
```

---

### 8. Database Status
```http
GET /api/admin/database-status
```

**Response:**
```json
{
  "database": "connected",
  "tables": {
    "users": 150,
    "presentations": 450,
    "slides": 3200,
    "credit_transactions": 890,
    "decks": 25,
    "deck_presentations": 75,
    "presentation_shares": 12,
    "api_keys": 8
  },
  "total_records": 4810
}
```

---

## 🔐 Security Headers

All requests should include:
```
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json
```

---

## ⚠️ Error Responses

### 401 Unauthorized
```json
{
  "detail": "Not authenticated"
}
```

### 403 Forbidden
```json
{
  "detail": "Admin access required"
}
```

### 404 Not Found
```json
{
  "detail": "User not found"
}
```

### 400 Bad Request
```json
{
  "detail": "Invalid amount"
}
```

### 500 Internal Server Error
```json
{
  "detail": "Internal server error"
}
```

---

## 🧪 Testing with cURL

### Get Metrics
```bash
curl -X GET "http://localhost:8000/api/admin/metrics" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Add Credits
```bash
curl -X POST "http://localhost:8000/api/admin/users/user-id/add_credits/500" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Bulk Activate Users
```bash
curl -X POST "http://localhost:8000/api/admin/bulk-action" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "activate",
    "items": ["user-1", "user-2"],
    "table": "users"
  }'
```

### Update Settings
```bash
curl -X PUT "http://localhost:8000/api/admin/settings" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "maintenance_mode": true
  }'
```

---

## 📊 Rate Limiting

Default: **60 requests per minute** per IP address

Exceeding limit returns:
```json
{
  "error": "Rate limit exceeded"
}
```

---

## 🚀 Quick Start Checklist

1. [ ] Install dependencies: `pip install -r requirements.txt`
2. [ ] Set up database: Run migration scripts
3. [ ] Configure `.env` file with DATABASE_URL
4. [ ] Create admin user in database
5. [ ] Run server: `uvicorn app.main:app --reload`
6. [ ] Test with `/health` endpoint
7. [ ] Test admin endpoints with cURL
8. [ ] Deploy to Railway
9. [ ] Update CORS settings
10. [ ] Test from frontend

---

## 📚 Documentation

- **Interactive API Docs**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`
- **OpenAPI JSON**: `http://localhost:8000/api/openapi.json`

---

## 🆘 Support

For implementation help, refer to:
- `/docs/LLM_BACKEND_BUILD_INSTRUCTIONS.md` - Complete build guide
- `/docs/ADMIN_API_IMPLEMENTATION.md` - Detailed API specs
- `/docs/ADMIN_DASHBOARD_IMPROVEMENTS.md` - Frontend features

---

## ✅ Endpoint Status Checklist

Mark as complete when tested:

- [ ] GET /api/admin/metrics
- [ ] GET /api/admin/analytics
- [ ] GET /api/admin/activity-logs
- [ ] GET /api/admin/settings
- [ ] PUT /api/admin/settings
- [ ] POST /api/admin/users/{id}/{action}
- [ ] POST /api/admin/bulk-action
- [ ] GET /api/admin/database-status

---

**Ready to build! 🚀**
