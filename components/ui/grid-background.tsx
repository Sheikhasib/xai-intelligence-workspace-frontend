'use client'

import { useMemo } from 'react'
import { GRID_UNIT, colors } from '@/lib/constants'

const STRUCTURE_EASING = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

interface GridBackgroundProps {
  structure?: number
  className?: string
}

export function GridBackground({ structure = 0, className = '' }: GridBackgroundProps) {
  const nodes = useMemo(() => {
    const cols = 24
    const rows = 16
    const list: { sx: number; sy: number; jx: number; jy: number }[] = []
    for (let x = 0; x <= cols; x++) {
      for (let y = 0; y <= rows; y++) {
        const seed = (x * 31 + y * 17) % 97
        list.push({
          sx: x * GRID_UNIT,
          sy: y * GRID_UNIT,
          jx: (seed % 13) - 6,
          jy: ((seed * 7) % 13) - 6,
        })
      }
    }
    return list
  }, [])

  const gridOpacity = 0.08 + structure * 0.12
  const dotColor = structure > 0.7 ? colors.accent.signal : colors.text.secondary
  const dotRadius = structure > 0.7 ? 2 : 1.5
  const dotOpacity = 0.15 + structure * 0.25

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" className="absolute inset-0">
        {/* coarse grid lines at 48px spacing, dense nodes at 24px — nodes sit on
             and between line intersections for a richer lattice visual */}
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

        {nodes.map((n, i) => (
          <g
            key={i}
            style={{
              transform: `translate(${n.jx * (1 - structure)}px, ${n.jy * (1 - structure)}px)`,
              transition: `transform 0.4s ${STRUCTURE_EASING}`,
            }}
          >
            <circle cx={n.sx} cy={n.sy} r={dotRadius} fill={dotColor} opacity={dotOpacity} />
          </g>
        ))}
      </svg>
    </div>
  )
}
