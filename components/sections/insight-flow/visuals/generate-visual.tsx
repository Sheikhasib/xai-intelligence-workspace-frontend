'use client'

import { motion } from 'framer-motion'

const nodes = [
  { x: 60, y: 60, size: 4 },
  { x: 140, y: 60, size: 3 },
  { x: 60, y: 140, size: 3.5 },
  { x: 140, y: 140, size: 2.5 },
  { x: 100, y: 100, size: 5 },
]

export function GenerateVisual() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" className="overflow-visible">
      <defs>
        <radialGradient id="gen-glow">
          <stop offset="0%" stopColor="#3FB950" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#3FB950" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Grid structure */}
      <motion.rect
        x="40"
        y="40"
        width="120"
        height="120"
        fill="none"
        stroke="#3FB950"
        strokeWidth="0.5"
        strokeOpacity="0.3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />
      {/* Connector lines */}
      {nodes.slice(1).map((node, i) => (
        <motion.line
          key={i}
          x1={nodes[0].x}
          y1={nodes[0].y}
          x2={node.x}
          y2={node.y}
          stroke="#3FB950"
          strokeWidth="0.5"
          strokeOpacity="0.4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
        />
      ))}
      {/* Nodes */}
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={n.size}
          fill="#3FB950"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0.85, 1],
            opacity: 1,
          }}
          transition={{
            duration: 1,
            delay: i * 0.2,
            ease: 'easeOut',
          }}
        />
      ))}
    </svg>
  )
}
