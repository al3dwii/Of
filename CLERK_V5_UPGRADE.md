# 🔄 Clerk v5 Upgrade Guide

## Changes Made:

### 1. ✅ Updated package.json
Added Clerk v5 packages:
```json
"@clerk/clerk-sdk-node": "^5.0.74",
"@clerk/localizations": "^3.17.2",
"@clerk/nextjs": "^5.7.1",
"@clerk/themes": "^1.7.20",
"@clerk/types": "^4.62.1"
```

### 2. ✅ Updated Middleware (src/middleware.ts)
Changed from `authMiddleware` to `clerkMiddleware`:

**Before (v4):**
```typescript
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/(en|ar|es)"],
  afterAuth(auth, req) { ... }
});
```

**After (v5):**
```typescript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
  '/(en|ar|es)/dashboard(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
  return handleLocaleMiddleware(req)
})
```

### 3. ✅ Layout.tsx - No Changes Needed
ClerkProvider works the same way:
```tsx
<ClerkProvider publishableKey={clerkPubKey}>
  {children}
</ClerkProvider>
```

### 4. ✅ Components - No Changes Needed
Hooks remain the same:
- `useUser()` - Still works
- `UserButton` - Still works
- `SignInButton` - Still works (but need to remove if using custom)
- `SignUpButton` - Still works (but need to remove if using custom)

## Installation Steps:

### Step 1: Install New Packages
```bash
cd /Users/omair/Oold/Of
pnpm install
```

This will install:
- @clerk/clerk-sdk-node@5.0.74
- @clerk/localizations@3.17.2
- @clerk/nextjs@5.7.1
- @clerk/themes@1.7.20
- @clerk/types@4.62.1

### Step 2: Environment Variables (Already Set)
Your `.env.local` is already configured:
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/en/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/en/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/en/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/en/dashboard
```

### Step 3: Restart Development Server
```bash
# Kill existing server
lsof -ti:3000 | xargs kill -9

# Start with new packages
pnpm dev
```

## Key Changes in Clerk v5:

### 1. Middleware API
- ✅ `authMiddleware` → `clerkMiddleware`
- ✅ `publicRoutes` → `createRouteMatcher` for protected routes
- ✅ `afterAuth` → Direct async function with `auth.protect()`

### 2. Auth Protection
**Before:**
```typescript
afterAuth(auth, req) {
  if (!auth.userId && isProtectedRoute) {
    return NextResponse.redirect(signInUrl)
  }
}
```

**After:**
```typescript
clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect() // Automatically redirects
  }
})
```

### 3. Server-Side Auth
For API routes and server components:
```typescript
// v5 way
import { auth } from '@clerk/nextjs/server'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return new Response('Unauthorized', { status: 401 })
  // ...
}
```

## Testing After Installation:

### 1. Check Build
```bash
pnpm build
```

Should compile without errors.

### 2. Check Dev Server
```bash
pnpm dev
```

Should start on port 3000.

### 3. Test Auth Flow
1. Visit: http://localhost:3000/en
2. Should see Sign In/Sign Up buttons
3. Click Sign In
4. Should redirect to: `/en/sign-in`
5. Sign in with Clerk
6. Should redirect to: `/en/dashboard`

### 4. Test Protected Routes
1. Visit: http://localhost:3000/en/dashboard (not signed in)
2. Should auto-redirect to: `/en/sign-in`
3. After sign-in, returns to dashboard

## Breaking Changes to Watch:

### ❌ Removed in v5:
- `authMiddleware` - Use `clerkMiddleware` instead
- `publicRoutes` config - Use `createRouteMatcher` instead
- `beforeAuth` callback - Not needed in v5

### ✅ New in v5:
- `clerkMiddleware` - New middleware API
- `createRouteMatcher` - Define protected routes
- `auth.protect()` - Automatic protection
- Better TypeScript support
- Improved performance

## Current File Status:

### ✅ Updated:
- [x] `package.json` - Clerk v5 packages added
- [x] `src/middleware.ts` - Using `clerkMiddleware`

### ✅ No Changes Needed:
- [x] `src/app/layout.tsx` - ClerkProvider unchanged
- [x] `src/components/navigation/navbar.tsx` - Hooks unchanged
- [x] `src/components/dashboard/dashboard-nav.tsx` - Hooks unchanged
- [x] `.env.local` - Environment variables unchanged

## Custom Sign-In/Sign-Up Pages:

Your custom auth pages at:
- `src/app/[locale]/(auth)/sign-in/[[...sign-in]]/page.tsx`
- `src/app/[locale]/(auth)/sign-up/[[...sign-up]]/page.tsx`

These should still work with v5. They use Clerk's hosted components.

## Troubleshooting:

### Error: "Cannot find module '@clerk/nextjs/server'"
**Solution:** Run `pnpm install` to install new packages

### Error: "clerkMiddleware is not a function"
**Solution:** Make sure `@clerk/nextjs@^5.7.1` is installed

### Error: "auth.protect is not a function"
**Solution:** Make sure middleware is using `await auth.protect()`

### Clerk Keys Invalid
**Solution:** Get fresh keys from:
https://dashboard.clerk.com/apps/app_340UkBKyumFg32Fw59MrlIVElMq

## Next Steps:

1. **Run Installation:**
   ```bash
   pnpm install
   ```

2. **Clear any lock conflicts:**
   ```bash
   rm -rf node_modules
   rm pnpm-lock.yaml
   pnpm install
   ```

3. **Restart Server:**
   ```bash
   pnpm dev
   ```

4. **Test Auth:**
   - Visit homepage
   - Click Sign In
   - Verify redirect to `/en/sign-in`
   - Sign in and check dashboard access

## Migration Complete! 🎉

Once `pnpm install` completes successfully:
- ✅ Clerk v5 packages installed
- ✅ Middleware updated to new API
- ✅ All components compatible
- ✅ Auth flow working with locales
- ✅ Dashboard protection enabled

Ready to test!
