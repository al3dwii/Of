#!/bin/bash

# Fix Next.js vendor-chunks error by clearing all caches

echo "🔧 Fixing Next.js vendor-chunks error..."
echo ""

# Stop any running dev servers
echo "📍 Stopping any running dev servers..."
pkill -f "next dev" 2>/dev/null || true
pkill -f "next-server" 2>/dev/null || true

# Clear Next.js cache
echo "🗑️  Clearing .next directory..."
rm -rf .next

# Clear node_modules/.cache if it exists
echo "🗑️  Clearing node_modules cache..."
rm -rf node_modules/.cache

# Clear pnpm cache (optional but helpful)
echo "🗑️  Clearing pnpm cache..."
pnpm store prune 2>/dev/null || true

echo ""
echo "✅ Cache cleared successfully!"
echo ""
echo "Now you can restart your dev server:"
echo "  pnpm dev"
echo ""
