# User Dashboard Implementation Guide - Basic Setup

## Overview
Simple guide to connect the dashboard at `https://of-xi.vercel.app/en/dashboard` to the backend with essential features only.

## What Users Will See

### Dashboard Overview
1. **Stats Cards:**
   - Total Presentations
   - AI Credits (with progress bar)

2. **Recent Projects:**
   - List of user's presentations
   - Status (completed, processing, failed)
   - Basic info (title, slides count, created date)

---

## Step 1: Update Database Schema

### Add userId to PresentationMirror

Update `prisma/schema.prisma`:

```prisma
model PresentationMirror {
  id           String   @id @default(cuid())
  planId       String   @unique
  userId       String   // ADD THIS - Clerk user id
  orgId        String
  title        String
  language     String
  slidesCount  Int
  status       String    // queued|running|completed|failed
  lastEventAt  DateTime?
  artifacts    Json?
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  org          Org       @relation(fields: [orgId], references: [id], onDelete: Cascade)
  
  @@index([userId])  // ADD THIS - Index for fast user queries
  @@map("presentation_mirrors")
}
```

### Create Migration

```bash
cd prisma
npx prisma migrate dev --name add_user_id_to_presentations
```

---

## Step 2: Add Backend API Endpoints

### Create Dashboard Router

Create file: `app/api/routes/dashboard.py`

```python
from fastapi import APIRouter, Depends
from sqlalchemy import desc
from app.api.deps import get_current_user
from app.db import get_db

router = APIRouter()

@router.get("/api/dashboard/stats")
async def get_dashboard_stats(
    current_user = Depends(get_current_user),
    db = Depends(get_db)
):
    """Get basic dashboard statistics"""
    
    # Count user's presentations
    total_presentations = db.query(PresentationMirror).filter(
        PresentationMirror.userId == current_user.id
    ).count()
    
    return {
        "totalPresentations": total_presentations,
        "aiCredits": 1000,      # Hardcoded for now
        "aiCreditsUsed": 250     # Hardcoded for now
    }


@router.get("/api/dashboard/presentations")
async def get_user_presentations(
    current_user = Depends(get_current_user),
    db = Depends(get_db),
    limit: int = 10
):
    """Get user's recent presentations"""
    
    presentations = db.query(PresentationMirror).filter(
        PresentationMirror.userId == current_user.id
    ).order_by(desc(PresentationMirror.createdAt)).limit(limit).all()
    
    return {
        "presentations": [
            {
                "id": p.id,
                "planId": p.planId,
                "title": p.title,
                "status": p.status,
                "slidesCount": p.slidesCount,
                "createdAt": p.createdAt.isoformat(),
                "artifacts": p.artifacts
            }
            for p in presentations
        ]
    }
```

### Register Router

In `app/main.py`:

```python
from app.api.routes import dashboard

app.include_router(dashboard.router, tags=["dashboard"])
```

---

## Step 3: Update Frontend API Client

In `src/lib/api/client.ts`, add:

```typescript
export const apiClient = {
  // ... existing methods
  
  async getDashboardStats() {
    const token = await getAuthToken()
    const response = await fetch(`${API_BASE}/api/dashboard/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response.json()
  },
  
  async getUserPresentations(limit = 10) {
    const token = await getAuthToken()
    const response = await fetch(
      `${API_BASE}/api/dashboard/presentations?limit=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )
    return response.json()
  }
}
```

---

## Step 4: Update Dashboard Page

In `src/app/[locale]/(dashboard)/dashboard/page.tsx`:

```typescript
useEffect(() => {
  const loadData = async () => {
    try {
      // Load stats
      const stats = await apiClient.getDashboardStats()
      setStats({
        presentations: stats.totalPresentations,
        apiConnected: true
      })
      
      // Load recent presentations
      const presentations = await apiClient.getUserPresentations(6)
      setRecentProjects(presentations.presentations)
      
    } catch (error) {
      console.error('Failed to load dashboard:', error)
      // Keep using mock data as fallback
    }
  }
  
  loadData()
}, [])
```

---

## Step 5: Deploy to Railway

### Update Backend
1. Push schema changes to Railway
2. Run migration on Railway database
3. Deploy updated API code

```bash
git add .
git commit -m "Add basic dashboard support"
git push railway main
```

### Verify Migration on Railway

In Railway dashboard:
1. Go to PostgreSQL database
2. Open Query tab
3. Verify `userId` column exists:

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'presentation_mirrors' 
  AND column_name = 'userId';
```

---

## Quick Implementation Checklist

### Backend (30 minutes)
- [ ] Add `userId` field to `PresentationMirror` in schema
- [ ] Create and run migration: `npx prisma migrate dev --name add_user_id`
- [ ] Create `app/api/routes/dashboard.py` with 2 endpoints
- [ ] Register router in `main.py`
- [ ] Test endpoints locally: `http://localhost:8000/api/dashboard/stats`
- [ ] Deploy to Railway

### Frontend (15 minutes)
- [ ] Add 2 methods to `src/lib/api/client.ts`
- [ ] Update dashboard page to call real APIs
- [ ] Replace mock data with API responses
- [ ] Test on localhost
- [ ] Deploy to Vercel (auto-deploys on git push)

### Verification (5 minutes)
- [ ] Visit `https://of-xi.vercel.app/en/dashboard`
- [ ] Check browser console for API calls
- [ ] Verify stats show real numbers
- [ ] Create a test presentation
- [ ] Refresh dashboard - count should increase

**Total Time: ~50 minutes**

---

## Notes

- AI Credits are hardcoded (1000 total, 250 used) - you can add a proper UserStats table later
- Only presentations are tracked - documents/videos can be added later
- No activity tracking yet - this is the minimal working version
- Dashboard falls back to mock data if API fails - user experience isn't broken

---

## Need Help?

If you get stuck on any step, check:
1. Backend logs in Railway dashboard
2. Browser console for frontend errors
3. Network tab to see API request/response
