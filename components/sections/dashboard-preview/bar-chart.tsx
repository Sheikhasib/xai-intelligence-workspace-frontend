'use client'

import { motion } from 'framer-motion'
import { colors } from '@/lib/constants'

const data = [
  { label: 'Mon', value: 40 },
  { label: 'Tue', value: 65 },
  { label: 'Wed', value: 45 },
  { label: 'Thu', value: 80 },
  { label: 'Fri', value: 60 },
  { label: 'Sat', value: 90 },
  { label: 'Sun', value: 70 },
]

const max = Math.max(...data.map((d) => d.value))
const W = 240
const H = 120
const PAD = 16
const BW = (W - PAD * 2) / data.length - 4

export function BarChart() {
  return (
    <div className="mt-16 w-full">
      <svg viewBox={`0 0 ${W} ${H + 20}`} className="w-full h-full overflow-visible">
        {data.map((d, i) => {
          const x = PAD + i * ((W - PAD * 2) / data.length) + 2
          const bh = (d.value / max) * (H - PAD)
          const y = H - bh
          return (
            <g key={d.label} className="group">
              <motion.rect
                x={x}
                y={H}
                width={BW}
                height={0}
                fill={colors.accent.signal}
                fillOpacity={0.6}
                rx={1}
                initial={{ y: H, height: 0 }}
                whileInView={{ y, height: bh }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: 'easeOut' }}
              />
              {/* hover highlight */}
              <motion.rect
                x={x - 2}
                y={y - 2}
                width={BW + 4}
                height={bh + 4}
                fill={colors.accent.signal}
                fillOpacity={0}
                rx={2}
                className="transition-opacity duration-200"
                whileHover={{ fillOpacity: 0.15 }}
              />
              {/* label */}
              <text
                x={x + BW / 2}
                y={H + 14}
                textAnchor="middle"
                fill={colors.text.secondary}
                fontSize={8}
                fontFamily="JetBrains Mono, monospace"
              >
                {d.label}
              </text>
              {/* value on hover */}
              <text
                x={x + BW / 2}
                y={y - 6}
                textAnchor="middle"
                fill={colors.accent.signal}
                fontSize={9}
                fontFamily="JetBrains Mono, monospace"
                fontWeight={500}
                opacity={0}
                className="group-hover:opacity-100 transition-opacity duration-200"
              >
                {d.value}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
