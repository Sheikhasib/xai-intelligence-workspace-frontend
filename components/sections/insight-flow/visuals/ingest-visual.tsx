'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'

export function IngestVisual() {
  const particles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        cx: 40 + ((i * 37 + 13) % 121),
        cy: 40 + ((i * 53 + 7) % 121),
        r: 1.5 + ((i * 11) % 21) / 10,
        delay: ((i * 17) % 21) / 10,
      })),
    []
  )

  return (
    <svg width="200" height="200" viewBox="0 0 200 200" className="overflow-visible">
      <defs>
        <radialGradient id="ingest-glow">
          <stop offset="0%" stopColor="#FFB454" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FFB454" stopOpacity="0" />
        </radialGradient>
      </defs>
      {particles.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.cx}
          cy={p.cy}
          r={p.r}
          fill="#8B949E"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2 + p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}
    </svg>
  )
}
