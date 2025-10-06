# Vercel Build Cache Issues

## Problem

Sometimes Vercel's build cache can cause "Module not found" errors even when the files exist and the build works locally. This happens because:

1. **File System Case Sensitivity**: macOS is case-insensitive, but Linux (used by Vercel) is case-sensitive
2. **Stale Build Cache**: Vercel caches build artifacts, and sometimes the cache gets out of sync
3. **Module Resolution Cache**: Next.js caches module resolution, which can become stale

## Recent Errors Encountered

```
Module not found: Can't resolve '@/lib/api/client'
Module not found: Can't resolve '@/components/navigation/breadcrumb'
Module not found: Can't resolve '@/components/landing/FeatureCard'
```

## Solutions

### 1. Clear Vercel Build Cache (Recommended)

Go to your Vercel project dashboard:
1. Navigate to **Settings** → **General**
2. Scroll down to **Build & Development Settings**
3. Find the **Deployment Protection** section
4. Click **Clear Build Cache**

### 2. Force Rebuild via Git

Add a dummy file to force Vercel to rebuild:

```bash
echo "# Build timestamp: $(date)" >> .vercel-build-timestamp
git add .vercel-build-timestamp
git commit -m "force: clear Vercel build cache"
git push origin main
```

### 3. Redeploy from Vercel Dashboard

1. Go to your Vercel project
2. Click on **Deployments**
3. Find the latest deployment
4. Click the **...** menu
5. Select **Redeploy**
6. Check **"Use existing Build Cache"** to **OFF**

### 4. Clear Next.js Cache Locally

Before pushing:

```bash
rm -rf .next
pnpm build
```

### 5. Check Import Path Case Sensitivity

Ensure imports match the actual file names exactly:

```typescript
// ✅ Correct (matches breadcrumb.tsx)
import { Breadcrumb } from '@/components/navigation/breadcrumb'

// ❌ Wrong (would look for Breadcrumb.tsx)
import { Breadcrumb } from '@/components/navigation/Breadcrumb'
```

## Verification

All these files exist and are properly exported:

- ✅ `/src/lib/api/client.ts` - exports `apiClient`
- ✅ `/src/components/navigation/breadcrumb.tsx` - exports `Breadcrumb` component
- ✅ `/src/components/landing/FeatureCard.tsx` - default export `FeatureCard`

## Prevention

1. **Always use correct case** in imports
2. **Clear local cache** before pushing: `rm -rf .next`
3. **Test production build** locally: `pnpm build`
4. **Use consistent naming**: prefer lowercase with hyphens

## Build Status

- ✅ Local build: Working (after clearing `.next`)
- ⏳ Vercel build: Triggered rebuild after cache clear

## Last Updated

October 6, 2025 - Pushed cache-clearing commit (8fd233a)
