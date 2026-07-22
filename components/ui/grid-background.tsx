'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { GRID_UNIT, colors } from '@/lib/constants'

interface GridBackgroundProps {
  /**
   * 0 = raw/scattered (hero), 1 = fully structured (dashboard).
   * Drives both opacity/jitter of the grid lines and node highlight density —
   * this is the single prop every section uses to say "how organized is
   * the data right now," so the transformation reads as one continuous
   * system rather than four separate animations.
   */
  structure?: number
  className?: string
}

export function GridBackground({ structure = 0, className = '' }: GridBackgroundProps) {
  const nodes = useMemo(() => {
    const cols = 24
    const rows = 16
    const list: { x: number; y: number; jitterX: number; jitterY: number; id: string }[] = []
    for (let x = 0; x <= cols; x++) {
      for (let y = 0; y <= rows; y++) {
        // deterministic pseudo-random jitter so raw state looks organic, not random each render
        const seed = (x * 31 + y * 17) % 97
        list.push({
          x: x * GRID_UNIT,
          y: y * GRID_UNIT,
          jitterX: ((seed % 13) - 6),
          jitterY: (((seed * 7) % 13) - 6),
          id: `${x}-${y}`,
        })
      }
    }
    return list
  }, [])

  const gridOpacity = 0.08 + structure * 0.12

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" className="absolute inset-0">
        {/* Base lattice lines - fade in as structure increases */}
        <g style={{ opacity: gridOpacity }}>
          {Array.from({ length: 25 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * GRID_UNIT * 2}
              y1={0}
              x2={i * GRID_UNIT * 2}
              y2="100%"
              stroke={colors.border.subtle}
              strokeWidth={1}
            />
          ))}
          {Array.from({ length: 17 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1={0}
              y1={i * GRID_UNIT * 2}
              x2="100%"
              y2={i * GRID_UNIT * 2}
              stroke={colors.border.subtle}
              strokeWidth={1}
            />
          ))}
        </g>

        {/* Nodes - interpolate from jittered (raw) to snapped (structured) position */}
        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            cx={node.x + node.jitterX * (1 - structure)}
            cy={node.y + node.jitterY * (1 - structure)}
            r={structure > 0.7 ? 2 : 1.5}
            fill={structure > 0.7 ? colors.accent.signal : colors.text.secondary}
            initial={false}
            animate={{
              cx: node.x + node.jitterX * (1 - structure),
              cy: node.y + node.jitterY * (1 - structure),
              opacity: 0.15 + structure * 0.25,
            }}
            transition={{ type: 'spring', stiffness: 60, damping: 20 }}
          />
        ))}
      </svg>
    </div>
  )
}
