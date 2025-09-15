import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// TEMP: Pass-through middleware while migrating to NextAuth v5-compatible auth() middleware
export async function middleware(_req: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
  ],
}