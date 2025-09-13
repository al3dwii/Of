#!/bin/bash
set -e

echo "🚀 Starting production server..."

# Check if build exists
if [ ! -d ".next" ]; then
  echo "❌ No build found. Run 'pnpm run build' first."
  exit 1
fi

# Start the production server
echo "🌐 Starting Next.js production server..."
pnpm next start
