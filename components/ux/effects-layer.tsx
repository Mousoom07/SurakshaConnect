"use client"

import { useEffect, useRef } from "react"

/**
 * EffectsLayer
 * - Custom cursor: soft glow that follows cursor, ripple on click/CTA hover
 * - Parallax: background layers move subtly on scroll
 *
 * Scopes to the page it is mounted on. Zero external deps, low cost.
 */
export default function EffectsLayer({ intensity = 1 }: { intensity?: number }) {
  const glowRef = useRef<HTMLDivElement | null>(null)
  const rippleRef = useRef<HTMLDivElement | null>(null)
  const parallaxRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const glow = glowRef.current!
    const ripple = rippleRef.current!

    const move = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      glow.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }

    const click = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"
      ripple.classList.remove("ux-ripple--play")
      // force reflow
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      ripple.offsetHeight
      ripple.classList.add("ux-ripple--play")
    }

    window.addEventListener("mousemove", move, { passive: true })
    window.addEventListener("click", click)
    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("click", click)
    }
  }, [])

  useEffect(() => {
    const layer = parallaxRef.current!
    const onScroll = () => {
      const y = window.scrollY
      // subtle parallax translate, clamped
      const dy = Math.max(-20, Math.min(20, (y * 0.06 * intensity)))
      layer.style.transform = `translate3d(0, ${dy}px, 0)`
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [intensity])

  return (
    <>
      {/* Cursor soft glow */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none fixed z-[110] ux-cursor-glow"
        style={{ left: 0, top: 0 }}
      />
      {/* Click ripple */}
      <div ref={rippleRef} aria-hidden className="pointer-events-none fixed z-[109] ux-cursor-ripple" />
      {/* Parallax overlay: gentle shield/map sheen */}
      <div ref={parallaxRef} aria-hidden className="pointer-events-none fixed inset-0 z-[1] ux-parallax-overlay" />
    </>
  )
}