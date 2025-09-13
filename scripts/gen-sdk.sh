#!/bin/bash
set -e

echo "🔧 Generating SDK from OpenAPI schema..."

# Check if backend OpenAPI spec exists
OPENAPI_URL="${NEXT_PUBLIC_API_BASE:-http://localhost:8000}/openapi.json"

echo "📡 Fetching OpenAPI spec from: $OPENAPI_URL"

# Generate TypeScript types from OpenAPI
pnpm exec openapi-typescript "$OPENAPI_URL" --output src/lib/backend-types.ts

echo "✅ SDK generation completed!"
