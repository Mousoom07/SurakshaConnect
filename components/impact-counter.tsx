"use client"

import { useEffect, useState } from "react"

// Lightweight polling impact counter for real-time updates
export default function ImpactCounter({ initial }: { initial?: number }) {
  const [value, setValue] = useState<number | null>(initial ?? null)

  useEffect(() => {
    let cancelled = false

    const fetchValue = async () => {
      try {
        const res = await fetch("/api/impact", { cache: "no-store" })
        if (!res.ok) return
        const json = await res.json()
        if (!cancelled && typeof json?.livesSaved === "number") {
          setValue(json.livesSaved)
        }
      } catch {
        // ignore errors to stay resilient in emergencies
      }
    }

    // initial fetch after first paint (non-blocking)
    const t = setTimeout(fetchValue, 200)

    // light polling every 20s
    const interval = setInterval(fetchValue, 20000)

    return () => {
      cancelled = true
      clearTimeout(t)
      clearInterval(interval)
    }
  }, [])

  // Render animated target using data-animate-counter if initial is null
  if (value == null) {
    return (
      <div
        className="text-3xl md:text-4xl font-bold text-green-600"
        data-animate-counter
        data-target={String(initial ?? 12543)}
      >
        0
      </div>
    )
  }

  return (
    <div className="text-3xl md:text-4xl font-bold text-green-600">{value.toLocaleString()}</div>
  )
}