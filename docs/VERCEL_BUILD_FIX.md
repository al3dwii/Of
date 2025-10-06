# Vercel Build Fix - "prisma: command not found"

## Problem

When deploying to Vercel, the build was failing with:

```
> agentic-frontend@1.0.0 postinstall /vercel/path0
> prisma generate
sh: line 1: prisma: command not found
 ELIFECYCLE  Command failed.
```

## Root Cause

The `prisma` package was in `devDependencies`, which may not be installed before the `postinstall` script runs on Vercel. This caused the `prisma generate` command to fail.

## Solution

### 1. Moved Prisma to Production Dependencies

**File: `package.json`**

Changed:
```json
"dependencies": {
  "@prisma/client": "^5.7.1",
  // ... other deps
},
"devDependencies": {
  "prisma": "^5.7.1",
  // ... other deps
}
```

To:
```json
"dependencies": {
  "@prisma/client": "^5.22.0",
  "prisma": "^5.22.0",
  // ... other deps
},
"devDependencies": {
  // prisma removed from here
  // ... other deps
}
```

**Why this works:**
- Production dependencies are **always** installed before postinstall scripts run
- DevDependencies may be skipped in certain build environments
- Prisma CLI is needed at build time to generate the Prisma Client
- Both `prisma` (CLI) and `@prisma/client` (generated code) are now in dependencies

### 2. Made Postinstall Script More Resilient

Changed:
```json
"postinstall": "prisma generate"
```

To:
```json
"postinstall": "prisma generate || echo 'Prisma generate failed, will retry during build'"
```

**Why this helps:**
- If postinstall fails for any reason, it won't block the entire install
- The build script (`scripts/build.sh`) already runs `prisma generate` again
- This provides a fallback mechanism

### 3. Build Script Already Has Failsafe

The `scripts/build.sh` file already contains:

```bash
# Generate Prisma client (without database connection)
echo "🔧 Generating Prisma client..."
pnpm exec prisma generate
```

This ensures Prisma Client is generated even if postinstall failed.

## Version Updates

Updated Prisma from `5.7.1` to `5.22.0` to match the versions already being used by the running application (as seen in the build logs).

## Deployment Steps

1. ✅ Update `package.json` (done)
2. ✅ Commit changes to git
3. ✅ Push to your repository
4. ✅ Vercel will automatically detect the changes and redeploy

```bash
git add package.json
git commit -m "fix: move prisma to production dependencies for Vercel build"
git push origin main
```

## Additional Vercel Configuration (Optional)

If you continue to have issues, you can also add a `vercel.json` configuration:

```json
{
  "buildCommand": "pnpm install && pnpm prisma generate && pnpm next build",
  "installCommand": "pnpm install --frozen-lockfile"
}
```

However, this should **not be necessary** with the current fix.

## Why This is a Common Issue

1. **Build Environment Differences**: Vercel's build environment may handle devDependencies differently than local development
2. **Postinstall Timing**: The postinstall hook runs immediately after package installation, and the order of dependency installation can vary
3. **Prisma's Dual Nature**: Prisma needs both:
   - The CLI (`prisma`) to generate code
   - The client (`@prisma/client`) to use at runtime
   - Both should be in production dependencies for deployment

## Testing Locally

The build should still work locally:

```bash
# Clean install
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Test build
npm run build
```

## Expected Behavior on Vercel

After this fix:

1. ✅ `pnpm install` runs and installs all production dependencies including `prisma`
2. ✅ `postinstall` hook runs `prisma generate` successfully
3. ✅ Build script runs and generates Prisma client again (failsafe)
4. ✅ Next.js build completes successfully

## Verification

Once deployed, check:
- ✅ Build logs show "Generated Prisma Client" (should appear 2-3 times)
- ✅ No "command not found" errors
- ✅ Build completes with "Build completed!" message
- ✅ Application runs without database connection errors

## Related Files

- `/package.json` - Dependencies configuration
- `/scripts/build.sh` - Build script with Prisma generation
- `/.env` - Database connection (already configured correctly with port 54322)
- `/prisma/schema.prisma` - Database schema

## Summary

✅ **Fixed by moving `prisma` from devDependencies to dependencies**
✅ **Version aligned to 5.22.0**
✅ **Postinstall script made resilient with fallback**
✅ **Build script already has failsafe Prisma generation**

The build should now work on Vercel! 🚀
