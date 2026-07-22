'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'

/**
 * Shared scroll-progress hook. Every section reads scroll state from here
 * instead of writing its own listener — this is what keeps the page-level
 * narrative (grid tightening from loose -> structured) consistent instead
 * of each section improvising its own scroll math.
 *
 * Returns a 0->1 progress value for the given element's scroll-through range.
 */
export function useScrollProgress<T extends HTMLElement>(): {
  ref: RefObject<T | null>
  progress: number
} {
  const ref = useRef<T>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const viewportH = window.innerHeight
      // 0 when element top enters viewport bottom, 1 when element bottom exits viewport top
      const total = rect.height + viewportH
      const scrolled = viewportH - rect.top
      const raw = scrolled / total
      setProgress(Math.min(1, Math.max(0, raw)))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return { ref, progress }
}
