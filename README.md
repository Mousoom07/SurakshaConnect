# CrisisConnect Pro

## Auth setup

### Demo credentials (in-memory)
- Email: `demo@example.com`
- Password: `demo1234`

These are only for local development. Replace with a real database-backed solution before production.

### OAuth providers
Set the following environment variables in `.env`:
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- GITHUB_ID
- GITHUB_SECRET

Then configure provider callback URLs in Google/GitHub consoles to:
- `http://localhost:3000/api/auth/callback/google`
- `http://localhost:3000/api/auth/callback/github`

### Required env
- AUTH_SECRET: random strong string
- NEXT_PUBLIC_APP_URL: e.g., `http://localhost:3000` in dev

## Sentry
- Client DSN: `NEXT_PUBLIC_SENTRY_DSN`
- Server DSN: `SENTRY_DSN` (or reuse `NEXT_PUBLIC_SENTRY_DSN`)

## CI
GitHub Actions workflow runs type check, lint, build, and tests on PRs and pushes to `main`.