import { NextResponse } from "next/server"

// Simple in-memory baseline and jitter to simulate growth
let baseline = 12543

export async function GET() {
  // Simulate a small increase over time
  const now = Date.now()
  const increment = Math.floor((now / 10000) % 7) // 0..6 changes every 10s
  const value = baseline + increment

  return NextResponse.json({ livesSaved: value, updatedAt: new Date().toISOString() }, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  })
}