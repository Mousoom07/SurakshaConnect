// Sentry client (browser)
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || undefined,
  tracesSampleRate: 0.1, // adjust per environment
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
})