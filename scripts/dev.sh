#!/bin/bash
set -e

echo "🚀 Starting development server..."

# Load environment variables from .env.local if it exists
if [ -f ".env.local" ]; then
  echo "📄 Loading environment variables from .env.local..."
  export $(cat .env.local | grep -v '^#' | xargs)
fi

# Ensure dependencies are installed
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  pnpm install
fi

# Skip database operations for now
echo "⏭️ Skipping database operations for development..."

# Start the development server
echo "🔥 Starting Next.js dev server..."
pnpm next dev
