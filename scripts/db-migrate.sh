#!/bin/bash
set -e

echo "🗄️ Running database migrations..."

# Load environment variables from .env.local if it exists
if [ -f ".env.local" ]; then
  export $(cat .env.local | grep -v '^#' | xargs)
fi

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "❌ DATABASE_URL environment variable is not set"
  exit 1
fi

# Generate Prisma client first
echo "🔧 Generating Prisma client..."
pnpm exec prisma generate

# Run migrations
echo "📝 Applying database migrations..."
pnpm exec prisma migrate deploy

echo "✅ Database migrations completed!"
