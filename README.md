# Agentic Frontend

A production-grade Next.js 14 App Router frontend for the Agentic Kernel SaaS platform, featuring AI-powered presentations and video dubbing.

## Features

- 🎯 **AI Presentations**: Generate professional slide decks from prompts
- 🎬 **Video Dubbing**: Translate and dub videos with AI voices  
- 🏢 **Multi-tenant**: Organization-based access with Clerk
- 🔄 **Real-time Updates**: SSE streaming for job progress
- 📱 **Responsive Design**: Mobile-first with shadcn/ui
- 🔐 **Secure**: Enterprise-grade security and validation
- 🐳 **Containerized**: Docker & docker-compose ready
- 🧪 **Tested**: Playwright e2e + Vitest unit tests

## Tech Stack

- **Framework**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Authentication**: Clerk (users + organizations)
- **Database**: PostgreSQL with Prisma ORM
- **Backend Integration**: Type-safe SDK with OpenAPI
- **Real-time**: Server-Sent Events (SSE)
- **Testing**: Playwright (e2e) + Vitest (unit)
- **Deployment**: Docker + docker-compose

## Quick Start

### Prerequisites

- Node.js 18.17+ 
- pnpm 8+
- PostgreSQL 15+
- Backend API running on port 8000

### 1. Clone and Install

```bash
git clone <repository>
cd agentic-frontend
pnpm install
```

### 2. Environment Setup

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Backend API
NEXT_PUBLIC_API_BASE=http://localhost:8000
NEXT_PUBLIC_ARTIFACTS_BASE=http://localhost:8000/artifacts

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_secret_here
CLERK_SIGN_IN_URL=/sign-in
CLERK_SIGN_UP_URL=/sign-up

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5434/frontend

# Security
NEXT_PUBLIC_ALLOWED_FILE_EXT=mp4,pdf,pptx,zip
NEXT_PUBLIC_MAX_UPLOAD_MB=200

NODE_ENV=development
```

### 3. Database Setup

```bash
# Run migrations
./scripts/db-migrate.sh

# Seed database (optional)
./scripts/db-seed.sh
```

### 4. Start Development

```bash
./scripts/dev.sh
```

Visit [http://localhost:3000](http://localhost:3000)

## Clerk Setup

1. Create account at [clerk.dev](https://clerk.dev)
2. Create new application
3. Enable organizations in Clerk dashboard
4. Copy your publishable key and secret key to `.env.local`
5. Configure redirect URLs:
   - Sign-in: `http://localhost:3000/sign-in`  
   - Sign-up: `http://localhost:3000/sign-up`
   - After sign-in: `http://localhost:3000/dashboard`

## Docker Deployment

### Development with Docker

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f frontend

# Stop services
docker-compose down
```

### Production Build

```bash
# Build image
docker build -t agentic-frontend .

# Run with environment file
docker run -p 3000:3000 --env-file .env agentic-frontend
```

## Project Structure

```
agentic-frontend/
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── (public)/           # Public pages
│   │   ├── (auth)/             # Auth pages (Clerk)
│   │   ├── dashboard/          # Protected dashboard
│   │   ├── presentations/      # Presentation features
│   │   ├── dubbing/           # Video dubbing features
│   │   └── settings/          # User/org settings
│   ├── components/             # React components
│   │   ├── ui/                # shadcn/ui components
│   │   ├── nav/               # Navigation components
│   │   ├── forms/             # Form components
│   │   └── common/            # Shared components
│   ├── lib/                   # Utilities
│   │   ├── backend.ts         # Backend API client
│   │   ├── prisma.ts          # Database client
│   │   ├── sse.ts             # SSE client
│   │   └── zod-schemas.ts     # Validation schemas
│   └── server/                # Server-side code
│       ├── actions/           # Server Actions
│       └── adapters/          # Backend adapters
├── prisma/                    # Database schema & migrations
├── scripts/                   # Development scripts
├── tests/                     # Test suites
└── docker-compose.yml         # Container orchestration
```

## API Integration

### Backend Connection

The frontend connects to the Agentic Kernel backend via:

- **Base URL**: `NEXT_PUBLIC_API_BASE`
- **Artifacts**: `NEXT_PUBLIC_ARTIFACTS_BASE`
- **Authentication**: Clerk JWT tokens
- **Type Safety**: Generated OpenAPI client

### Endpoints Used

```typescript
// Presentations
POST /v1/presentations
POST /v1/presentations/{planId}/edits  
GET  /v1/presentations/{planId}
GET  /v1/presentations/{planId}/trace
GET  /v1/presentations/{planId}/citations

// Dubbing  
POST /v1/dubbing
GET  /v1/dubbing/{jobId}
GET  /v1/dubbing/{jobId}/trace

// Health
GET  /healthz
```

### Real-time Updates

Server-Sent Events (SSE) provide real-time job progress:

```typescript
// Connect to trace endpoint
const sseUrl = `${API_BASE}/v1/presentations/${planId}/trace`
const connection = createSSEConnection(sseUrl, {
  onEvent: (data) => updateProgress(data),
  onError: (error) => handleError(error)
})
```

## Development

### Available Scripts

```bash
# Development
./scripts/dev.sh              # Start dev server
./scripts/build.sh            # Production build  
./scripts/start.sh            # Start production server

# Database
./scripts/db-migrate.sh       # Run migrations
./scripts/db-seed.sh          # Seed database

# SDK
./scripts/gen-sdk.sh          # Generate backend client

# Testing
./scripts/ci-e2e.sh           # Run e2e tests
pnpm test                     # Run unit tests
```

### Code Quality

```bash
# Linting
pnpm lint

# Type checking  
pnpm type-check

# Formatting (auto-fix)
pnpm format
```

### Testing

```bash
# Unit tests
pnpm test

# E2e tests (requires running app)
pnpm test:e2e

# Watch mode
pnpm test --watch
```

## Security

### Content Security Policy

CSP headers are configured in `next.config.mjs`:

```javascript
"Content-Security-Policy": [
  "default-src 'self'",
  "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://clerk.{domain}.dev",
  "style-src 'self' 'unsafe-inline'",  
  "img-src 'self' data: https:",
  "connect-src 'self' https: wss:",
  "frame-src 'self' https:",
  "object-src 'none'"
].join('; ')
```

### Input Validation

All inputs validated with Zod schemas:

```typescript
const createPresentationSchema = z.object({
  prompt: z.string().min(10).max(2000),
  slides_count: z.number().min(1).max(30),
  language: z.enum(['en', 'ar', 'es'])
})
```

### File Upload Security

- Extension allowlist: `NEXT_PUBLIC_ALLOWED_FILE_EXT`
- Size limits: `NEXT_PUBLIC_MAX_UPLOAD_MB`  
- Sandboxed artifact iframes

## SSE Troubleshooting

### CORS Issues

If browser blocks cross-origin SSE:

1. Use proxy route: `/api/proxy/trace?target=<encoded_url>`
2. Configure backend CORS headers
3. Check network/firewall restrictions

### Connection Problems

```typescript
// SSE client includes reconnection logic
const connection = createSSEConnection(url, {
  reconnect: true,      // Auto-reconnect
  maxRetries: 10,       // Max retry attempts
  onError: (error) => {
    console.log('SSE error:', error)
  }
})
```

### Debug Mode

Enable SSE debug logging:

```env
NODE_ENV=development  # Enables debug logs
```

## Feature Flags

Control features via `src/lib/featureFlags.ts`:

```typescript
export const featureFlags = {
  presentations: true,    // Enable/disable presentations
  dubbing: true,         // Enable/disable video dubbing  
  artifactViewer: true,  // Enable/disable iframe viewer
  billing: false,        // Show/hide billing section
}
```

## Database

### Schema Management

```bash
# Create migration
pnpm exec prisma migrate dev --name description

# Reset database  
pnpm exec prisma migrate reset

# View data
pnpm exec prisma studio
```

### Frontend State

The frontend database stores UI-specific data:

- **User Profiles**: Preferences, display names
- **Organizations**: Clerk org mapping
- **Mirrors**: Local job/presentation state 
- **Audit Logs**: User actions for compliance
- **API Keys**: Frontend SDK authentication

## Deployment

### Environment Variables

Production deployment requires:

```env
# Required
NEXT_PUBLIC_API_BASE=https://api.yourdomain.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
DATABASE_URL=postgresql://...

# Optional
NEXT_PUBLIC_ARTIFACTS_BASE=https://artifacts.yourdomain.com
NEXT_PUBLIC_MAX_UPLOAD_MB=500
```

### Docker Production

```bash
# Build for production
docker build --target runner -t agentic-frontend:latest .

# Run with external database
docker run -p 3000:3000 \
  -e DATABASE_URL=postgresql://... \
  -e NEXT_PUBLIC_API_BASE=https://api.yourdomain.com \
  agentic-frontend:latest
```

### Health Checks

The app includes health monitoring:

- **API Health**: `/healthz` endpoint status
- **Database**: Connection verification
- **SSE**: Connection status indicators

## Known Limitations

1. **SSE Fallback**: No automatic polling fallback (could be added)
2. **Offline Support**: No service worker/offline capabilities  
3. **File Upload**: Direct upload not implemented (uses URLs)
4. **Billing**: UI only, no Stripe integration
5. **Mobile**: Some complex interactions not optimized for touch

## Troubleshooting

### Common Issues

**"API Offline" in dashboard:**
- Check `NEXT_PUBLIC_API_BASE` environment variable
- Verify backend is running and accessible
- Check network connectivity

**Clerk authentication errors:**  
- Verify publishable key and secret key
- Check redirect URLs in Clerk dashboard
- Ensure organization features are enabled

**Database connection failed:**
- Check `DATABASE_URL` format
- Verify PostgreSQL is running
- Run migrations with `./scripts/db-migrate.sh`

**SSE not working:**
- Check browser console for CORS errors
- Verify backend supports SSE
- Try using proxy route for cross-origin

### Debug Mode

Enable additional logging:

```env
NODE_ENV=development
```

This enables:
- SSE connection logs
- Backend API request/response logs  
- Detailed error messages
- React development warnings

## Contributing

1. **Setup**: Follow quick start guide
2. **Conventions**: 
   - Use TypeScript strict mode
   - Follow ESLint/Prettier rules
   - Add tests for new features
3. **Commits**: Use conventional commit format
4. **PRs**: Include tests and documentation

## License

This project is licensed under the MIT License.
