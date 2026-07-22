'use client'

import { useEffect, useState, useRef, type RefObject } from 'react'

export type ActiveStage = 'ingest' | 'analyze' | 'generate'

const stageRanges: [number, number][] = [
  [0, 0.33],
  [0.33, 0.66],
  [0.66, 1],
]

const stageKeys: ActiveStage[] = ['ingest', 'analyze', 'generate']

export function useInsightProgress(
  sectionRef: RefObject<HTMLElement | null>
): { progress: number; activeStage: ActiveStage } {
  const [progress, setProgress] = useState(0)
  const [activeStage, setActiveStage] = useState<ActiveStage>('ingest')

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const onScroll = () => {
      const scrollY = window.scrollY
      const sectionTop = el.offsetTop
      const viewportH = window.innerHeight
      const totalScroll = viewportH * 3
      const raw = Math.min(1, Math.max(0, (scrollY - sectionTop) / totalScroll))

      setProgress(raw)

      for (let i = 0; i < stageRanges.length; i++) {
        const [start, end] = stageRanges[i]
        if (raw >= start && raw < end) {
          setActiveStage(stageKeys[i])
          return
        }
      }
      if (raw >= 0.99) setActiveStage('generate')
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [sectionRef])

  return { progress, activeStage }
}
