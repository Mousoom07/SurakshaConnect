"use client"

import { useEffect } from "react"

// Animates numbers for elements with [data-animate-counter]
export default function CounterInit() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-animate-counter]'))
    if (!elements.length) return

    // Skip animations for users who prefer reduced motion
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const prefersReduced = media.matches

    const animate = (el: HTMLElement) => {
      const targetAttr = el.getAttribute('data-target') || ''
      const match = String(targetAttr).match(/([0-9]*\.?[0-9]+)/)
      const numTarget = match ? parseFloat(match[1]) : 0
      const suffix = String(targetAttr).replace(String(match?.[1] ?? ''), '')
      const duration = prefersReduced ? 300 : 900 // shorter for perf
      const start = performance.now()

      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        const value = numTarget * progress
        const formatted = numTarget % 1 === 0 ? Math.round(value).toString() : value.toFixed(1)
        el.textContent = `${formatted}${suffix}`
        if (progress < 1) requestAnimationFrame(step)
      }

      if (prefersReduced) {
        // Set immediately
        el.textContent = `${numTarget}${suffix}`
        return
      }
      requestAnimationFrame(step)
    }

    const observeAndAnimate = () => {
      const io = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            animate(entry.target as HTMLElement)
            io.unobserve(entry.target)
          }
        }
      }, { threshold: 0.3 })

      elements.forEach((el) => io.observe(el))

      return () => io.disconnect()
    }

    // Defer setup to browser idle time to avoid blocking initial interaction
    const cleanup = (window as any).requestIdleCallback
      ? (window as any).requestIdleCallback(() => observeAndAnimate())
      : setTimeout(() => observeAndAnimate(), 200)

    return () => {
      if ((window as any).cancelIdleCallback && typeof cleanup === 'number') {
        ;(window as any).cancelIdleCallback(cleanup)
      } else if (typeof cleanup === 'number') {
        clearTimeout(cleanup)
      }
    }
  }, [])

  return null
}