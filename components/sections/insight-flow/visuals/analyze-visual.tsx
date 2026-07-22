'use client'

import { motion } from 'framer-motion'

const bars = [30, 55, 40, 70, 50, 80, 45, 65, 35]

export function AnalyzeVisual() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" className="overflow-visible">
      <defs>
        <linearGradient id="analyze-grad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#FFB454" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#FFB454" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={10 + i * 20}
          y={200 - h * 1.5}
          width="12"
          height={h * 1.5}
          fill="url(#analyze-grad)"
          initial={{ scaleY: 0, y: 200 }}
          animate={{
            scaleY: 1,
            y: 0,
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.08,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatDelay: 2,
          }}
          style={{ transformOrigin: `${10 + i * 20 + 6}px 200px` }}
        />
      ))}
      {/* Connecting line */}
      <motion.polyline
        points={bars.map((h, i) => `${16 + i * 20},${200 - h * 1.5}`).join(' ')}
        fill="none"
        stroke="#FFB454"
        strokeWidth="1"
        strokeOpacity="0.4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />
    </svg>
  )
}
