#!/bin/bash
set -e

echo "🔨 Building application..."

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Run database migrations
echo "🗄️ Running database migrations..."
./scripts/db-migrate.sh

# Generate Prisma client
echo "🔧 Generating Prisma client..."
pnpm exec prisma generate

# Build the application
echo "🏗️ Building Next.js application..."
pnpm next build

echo "✅ Build completed!"
