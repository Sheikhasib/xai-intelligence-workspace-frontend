'use client'

import { useEffect, useState, type RefObject } from 'react'

export type ActiveStage = 'ingest' | 'analyze' | 'generate'

const stageOffsets: Record<ActiveStage, [number, number]> = {
  ingest: [0, 0.33],
  analyze: [0.33, 0.66],
  generate: [0.66, 1],
}

export function useActiveStage(
  sectionRef: RefObject<HTMLElement | null>
): ActiveStage {
  const [active, setActive] = useState<ActiveStage>('ingest')

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const viewportH = window.innerHeight
      const total = el.scrollHeight
      const scrolled = viewportH - rect.top
      const raw = Math.min(1, Math.max(0, scrolled / total))

      for (const [stage, [start, end]] of Object.entries(stageOffsets)) {
        if (raw >= start && raw < end) {
          setActive(stage as ActiveStage)
          return
        }
      }
      if (raw >= 0.99) setActive('generate')
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [sectionRef])

  return active
}
