#!/bin/bash
set -e

echo "🔨 Building application..."

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Generate Prisma client (without database connection)
echo "� Generating Prisma client..."
pnpm exec prisma generate

# Skip database migrations during build (they should be run separately)
# This allows the build to succeed even if the database is not accessible
echo "⏭️  Skipping database migrations during build..."
echo "   Run './scripts/db-migrate.sh' separately to apply migrations"

# Build the application
echo "🏗️ Building Next.js application..."
pnpm next build

echo "✅ Build completed!"
