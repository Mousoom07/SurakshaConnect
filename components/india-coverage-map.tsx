"use client"

import { useEffect, useRef } from "react"

// Lightweight SVG-based India coverage map with glowing city dots
export default function IndiaCoverageMap() {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    // Optionally, animate glows subtly
    const el = svgRef.current
    if (!el) return
    el.style.filter = "drop-shadow(0 0 6px rgba(59,130,246,0.5))"
  }, [])

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="glass-card rounded-2xl p-4">
        <svg ref={svgRef} viewBox="0 0 400 420" className="w-full h-auto">
          {/* Simplified India outline (placeholder path for performance) */}
          <path d="M210 20l20 30-10 20 30 10-10 25 25 25-15 30 20 20-25 20 10 30-30 10-20 35-25-10-20 15-30-10 5-25-25-20 15-25-10-25 20-15-5-25 25-15 25-20 25-10z" fill="#0f172a" stroke="#334155" strokeWidth="2"/>

          {/* Glowing city dots (approx positions) */}
          {[
            { x: 240, y: 180, name: "Delhi" },
            { x: 180, y: 260, name: "Mumbai" },
            { x: 220, y: 300, name: "Bengaluru" },
            { x: 240, y: 340, name: "Chennai" },
            { x: 270, y: 260, name: "Hyderabad" },
            { x: 280, y: 220, name: "Nagpur" },
          ].map((c, i) => (
            <g key={i} className="group cursor-pointer" onClick={() => alert(`${c.name} coverage active`)}>
              <circle cx={c.x} cy={c.y} r="5" fill="#3b82f6" className="animate-pulse-soft" />
              <circle cx={c.x} cy={c.y} r="10" fill="rgba(59,130,246,0.3)" />
              <text x={c.x + 8} y={c.y - 8} className="text-[10px] fill-white opacity-0 group-hover:opacity-100 transition-opacity">{c.name}</text>
              <title>{c.name}</title>
            </g>
          ))}
        </svg>
        <div className="text-center text-xs text-muted-foreground mt-2">Coverage across 500+ Indian cities</div>
      </div>
    </div>
  )
}