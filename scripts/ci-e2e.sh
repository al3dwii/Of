#!/bin/bash
set -e

echo "🧪 Running e2e tests..."

# Install Playwright browsers if needed
echo "🎭 Installing Playwright browsers..."
pnpm exec playwright install

# Run the tests
echo "🚀 Running e2e tests..."
pnpm exec playwright test

echo "✅ E2e tests completed!"
