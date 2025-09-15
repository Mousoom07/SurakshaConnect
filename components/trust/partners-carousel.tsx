"use client"

import { useEffect, useRef } from "react"

// Simple infinite marquee for partner logos; pass image URLs via props
export default function PartnersCarousel({ logos }: { logos: { src: string; alt: string }[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  // Ensure seamless loop by duplicating content
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const content = el.innerHTML
    el.innerHTML = content + content
  }, [])

  return (
    <div className="overflow-hidden w-full">
      <div
        ref={containerRef}
        className="flex items-center gap-8 whitespace-nowrap animate-[scroll_20s_linear_infinite] opacity-80 hover:opacity-100"
      >
        {logos.map((l, i) => (
          <img
            key={i}
            src={l.src}
            alt={l.alt}
            className="h-10 w-auto object-contain grayscale hover:grayscale-0 transition"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  )
}