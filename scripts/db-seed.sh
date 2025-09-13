#!/bin/bash
set -e

echo "🌱 Seeding database..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "❌ DATABASE_URL environment variable is not set"
  exit 1
fi

# Run the seed script
echo "📊 Running seed script..."
pnpm exec tsx prisma/seed.ts

echo "✅ Database seeding completed!"
