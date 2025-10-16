# Admin Dashboard - Real Data Integration

## Overview
The admin dashboard at `/en/admin` has been updated to fetch **real data** from your PostgreSQL database instead of using mock data.

## What's Been Added

### 1. API Routes (`/src/app/api/admin/`)

#### **`/api/admin/stats`**
Fetches dashboard statistics:
- Total users count
- Active users (users with activity in last 30 days)
- Total content (presentations + dubbing jobs)
- User growth percentage
- Content growth percentage
- Total organizations

**Example Response:**
```json
{
  "totalUsers": 45,
  "activeUsers": 23,
  "totalContent": 128,
  "totalOrgs": 12,
  "totalPresentations": 89,
  "totalDubbing": 39,
  "userGrowth": 15.2,
  "contentGrowth": 22.5,
  "activeGrowth": 8.3,
  "totalRevenue": 0,
  "revenueGrowth": 0
}
```

#### **`/api/admin/users`**
Fetches user list with pagination and search:
- Query params: `limit`, `offset`, `search`
- Returns users with their organizations and project counts
- Includes activity status based on last 30 days

**Example Response:**
```json
{
  "users": [
    {
      "id": "clx...",
      "userId": "user_...",
      "name": "John Doe",
      "email": "john@example.com",
      "status": "active",
      "joined": "2024-01-15",
      "projects": 12,
      "orgs": 2,
      "lastActive": "2024-01-28T..."
    }
  ],
  "total": 45,
  "limit": 10,
  "offset": 0
}
```

#### **`/api/admin/content`**
Fetches recent content (presentations and dubbing):
- Combines both presentation and dubbing data
- Sorted by creation date (newest first)
- Includes user info, status, and metadata

**Example Response:**
```json
{
  "content": [
    {
      "id": "clx...",
      "title": "AI Presentation",
      "user": "John Doe",
      "type": "presentation",
      "created": "2024-01-28T...",
      "status": "completed",
      "language": "en",
      "slidesCount": 10
    }
  ],
  "total": 128,
  "presentations": 89,
  "dubbing": 39
}
```

### 2. Updated AdminDashboard Component

The `AdminDashboard.tsx` component now:
- ✅ Fetches real data on mount
- ✅ Shows loading spinner while fetching
- ✅ Displays error states with retry button
- ✅ Auto-refreshes data when switching tabs
- ✅ Has a refresh button in the header
- ✅ Shows "No data" states when empty
- ✅ Properly typed with TypeScript interfaces

## Database Schema Used

The admin dashboard uses these Prisma models:
- `UserProfile` - User accounts
- `Org` - Organizations
- `OrgMember` - Organization membership
- `PresentationMirror` - Presentation jobs
- `DubbingMirror` - Dubbing jobs
- `AuditLog` - Activity logs (not yet implemented in UI)

## Authentication & Authorization

### Current Status
- ✅ Requires Clerk authentication
- ⚠️ **TODO:** Add admin role check

### To Add Admin Role Protection

1. **Update middleware or API routes:**
```typescript
// In API route
const { userId } = await auth();
if (!userId) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

// Check if user is admin (implement this based on your auth system)
const isAdmin = await checkAdminRole(userId);
if (!isAdmin) {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}
```

2. **Using Clerk Organizations:**
```typescript
import { clerkClient } from '@clerk/nextjs/server';

async function checkAdminRole(userId: string) {
  const user = await clerkClient.users.getUser(userId);
  return user.publicMetadata.role === 'admin';
}
```

3. **Or use database:**
```typescript
const userProfile = await prisma.userProfile.findUnique({
  where: { userId },
  include: { orgMemberships: true }
});
const isAdmin = userProfile?.orgMemberships.some(m => m.role === 'owner');
```

## Features Implemented

✅ **Overview Tab:**
- Real-time statistics cards
- Recent users list
- Recent content list
- Growth percentages

✅ **Users Tab:**
- Paginated user table
- Search functionality (prepared)
- User status indicators
- Project counts per user

✅ **Content Tab:**
- Content management placeholder

✅ **Analytics Tab:**
- Analytics placeholder

✅ **Settings Tab:**
- Settings placeholder

## Next Steps

### Immediate TODOs:
1. **Add admin role authorization** (see above)
2. **Implement search functionality** in users tab
3. **Add pagination controls** for users table
4. **Implement user actions** (view, edit, delete buttons)
5. **Add export functionality** for data export button

### Future Enhancements:
1. **Content Tab:** Full content management interface
2. **Analytics Tab:** Charts and graphs for usage analytics
3. **Settings Tab:** System configuration panel
4. **Audit Log:** View and filter audit logs
5. **Real-time updates:** Use polling or WebSockets
6. **Advanced filters:** By date range, status, etc.
7. **Bulk actions:** Select and act on multiple items
8. **Revenue tracking:** If you implement billing

## Testing

### Test the Admin Dashboard:

1. **Start your dev server:**
```bash
npm run dev
```

2. **Make sure DATABASE_URL is set:**
```bash
# In .env
DATABASE_URL="your_postgresql_connection_string"
```

3. **Run migrations if needed:**
```bash
npx prisma migrate dev
```

4. **Visit the admin page:**
```
http://localhost:3000/en/admin
```

5. **Check for data:**
- If you have no data, the dashboard will show "0" values
- Add some test data through your app to see real numbers

### Test API Endpoints Directly:

```bash
# Get stats
curl http://localhost:3000/api/admin/stats

# Get users
curl http://localhost:3000/api/admin/users?limit=10

# Get content
curl http://localhost:3000/api/admin/content?limit=10
```

## Environment Variables Required

```env
# Database
DATABASE_URL="postgresql://..."

# Clerk (for authentication)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."
```

## Security Notes

⚠️ **IMPORTANT:** Before deploying to production:

1. Add proper admin authorization checks
2. Add rate limiting to API routes
3. Validate and sanitize all inputs
4. Add CSRF protection if needed
5. Log all admin actions in audit log
6. Consider adding 2FA for admin accounts
7. Implement IP whitelisting if needed

## Performance Considerations

- API routes use database indexes (ensure Prisma migrations have been run)
- Pagination is implemented in API routes
- Consider adding caching for stats (Redis)
- Add database indexes for frequently queried fields
- Monitor query performance with Prisma logging

## Troubleshooting

### "Unauthorized" Error
- Make sure you're logged in with Clerk
- Check that CLERK_SECRET_KEY is set in .env

### "No data" Showing
- Check if you have data in your database
- Run: `npx prisma studio` to view database
- Try creating some presentations or users first

### API Errors
- Check browser console for detailed errors
- Check server logs for API route errors
- Verify DATABASE_URL is correct
- Run `npx prisma generate` to update Prisma client

### Slow Loading
- Check database query performance
- Add indexes to frequently queried fields
- Consider implementing caching
- Use Prisma query logging to debug

## Files Modified/Created

```
src/
├── app/
│   ├── [locale]/
│   │   └── admin/
│   │       ├── page.tsx (updated with comment)
│   │       └── AdminDashboard.tsx (completely refactored)
│   └── api/
│       └── admin/
│           ├── stats/
│           │   └── route.ts (new)
│           ├── users/
│           │   └── route.ts (new)
│           └── content/
│               └── route.ts (new)
```

## Support

If you encounter issues:
1. Check the console for errors
2. Verify database connection
3. Ensure Clerk authentication is working
4. Check that all environment variables are set
5. Review API route responses in Network tab
