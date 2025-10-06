# Vercel Build Dependencies Fix - Complete Guide

## Problem

Vercel build failing with multiple "package not found" errors despite packages being installed locally.

## Root Cause

**pnpm + Vercel production builds skip `devDependencies`**

When Vercel runs a production build with pnpm, it only installs packages from `dependencies`, not `devDependencies`. However, Next.js needs several "dev" tools during the build process:

1. **TypeScript** - For type checking (`tsc --noEmit`)
2. **Type Definitions** - For TypeScript compilation
3. **PostCSS Tools** - For CSS processing (Tailwind)

## The Complete Solution

Move ALL build-time tools from `devDependencies` to `dependencies`:

### Required in Production Dependencies:

```json
{
  "dependencies": {
    // TypeScript and type definitions (for type checking during build)
    "typescript": "^5.3.3",
    "@types/node": "^20.10.5",
    "@types/react": "^18.3.24",
    "@types/react-dom": "^18.3.7",
    
    // CSS processing tools (for Tailwind/PostCSS during build)
    "postcss": "^8.4.32",
    "tailwindcss": "^3.3.6",
    "autoprefixer": "^10.4.16",
    
    // Your other runtime dependencies...
  },
  "devDependencies": {
    // Only development tools that DON'T run during build
    "@playwright/test": "^1.40.1",
    "eslint": "^8.56.0",
    "prettier": "^3.1.1",
    "vitest": "^1.0.4",
    // etc...
  }
}
```

## Error Progression & Fixes

### Error 1: Module Resolution
```
Module not found: Can't resolve '@/lib/api/client'
```

**Fix**: Add `jsconfig.json`
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}
```
**Commit**: `1cef5d8`

---

### Error 2: PostCSS Plugin Not Found
```
Error: Cannot find module 'tailwindcss'
at loadPlugin (/vercel/path0/.../css/plugins.js:49:32)
```

**Fix**: Move PostCSS tools to dependencies
- `postcss`
- `tailwindcss`
- `autoprefixer`

**Commit**: `1773139`

---

### Error 3: TypeScript Not Installed
```
Please install typescript, @types/react, and @types/node
```

**Fix**: Move TypeScript and types to dependencies
- `typescript`
- `@types/node`
- `@types/react`
- `@types/react-dom`

**Commit**: `bcdcb44`

## Why This Happens

### Local Development (Works)
```bash
pnpm install  # Installs BOTH dependencies and devDependencies
npm run build # Uses all packages
```

### Vercel Production (Fails without fix)
```bash
pnpm install --prod  # Only installs dependencies
npm run build        # Missing devDependencies!
```

Next.js build process needs:
1. ✅ TypeScript compiler for type checking
2. ✅ Type definitions for compilation
3. ✅ PostCSS/Tailwind for CSS processing

All happen during `next build`, so they must be in `dependencies`.

## General Rule for Next.js + pnpm + Vercel

**Move to `dependencies` if:**
- ✅ Used during `next build`
- ✅ Required for type checking
- ✅ Required for CSS processing
- ✅ Required for static generation
- ✅ Part of the build output

**Keep in `devDependencies` if:**
- ✅ Only used during development
- ✅ Testing tools (Vitest, Playwright)
- ✅ Linting tools (ESLint, Prettier)
- ✅ Development utilities

## Files Changed

1. ✅ `jsconfig.json` - Created for module path resolution
2. ✅ `package.json` - Moved 7 packages to dependencies
3. ✅ `pnpm-lock.yaml` - Regenerated

## Verification

### Check Dependencies Are Correct
```bash
# These should be in dependencies, not devDependencies
pnpm list typescript postcss tailwindcss autoprefixer
```

### Test Build Locally
```bash
# Clean build
rm -rf .next
pnpm build

# Should see:
# ✓ Compiled successfully
# ✓ Linting and checking validity of types
# ✓ Generating static pages (270/270)
# ✅ Build completed!
```

### Test Production-Like Build (Optional)
```bash
# Install only production dependencies
rm -rf node_modules
pnpm install --prod

# Try to build (should work if deps are correct)
pnpm build
```

## Commits Applied

```
bcdcb44 - ✅ Move TypeScript and type definitions to production dependencies
3819154 - 📝 Updated documentation
1773139 - ✅ Move PostCSS tools to production dependencies
1cef5d8 - ✅ Add jsconfig.json for module resolution
```

## Expected Vercel Build Output

```
✓ Installing dependencies
✓ Running "pnpm install"
✓ Creating an optimized production build
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Generating static pages (270/270)
✓ Finalizing page optimization
✓ Build completed!
```

## Common Mistakes to Avoid

❌ **Don't** keep build tools in devDependencies with pnpm + Vercel
❌ **Don't** assume local build = production build behavior
❌ **Don't** use `npm` and `pnpm` interchangeably (different behavior)

✅ **Do** move all build-time dependencies to dependencies
✅ **Do** test with `pnpm install --prod` locally
✅ **Do** check Vercel build logs for "module not found" errors

## Troubleshooting

### Still Getting "Module Not Found"?

1. **Check the package is in `dependencies`** (not devDependencies)
2. **Regenerate lockfile**: `rm pnpm-lock.yaml && pnpm install`
3. **Clear Vercel cache**: Project Settings → Clear Build Cache
4. **Redeploy**: Deployments → ... → Redeploy (uncheck "Use existing cache")

### Build Works Locally But Not on Vercel?

This is the classic sign of dependencies in the wrong section. Review which packages your build process actually needs and move them to `dependencies`.

## References

- [Vercel pnpm Support](https://vercel.com/docs/concepts/deployments/build-step#pnpm)
- [Next.js Build Process](https://nextjs.org/docs/architecture/nextjs-compiler)
- [pnpm Install Flags](https://pnpm.io/cli/install#--prod)

## Last Updated

October 6, 2025 - All dependencies correctly configured for Vercel production builds (commit bcdcb44)
