import { z } from 'zod'

// Define and validate required environment variables at runtime
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  // Add more as needed: AUTH_SECRET: z.string(), DATABASE_URL: z.string().url(), etc.
})

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
})