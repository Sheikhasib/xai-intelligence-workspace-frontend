'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { colors } from '@/lib/constants'
import { lerp, clamp, smoothstep } from '@/lib/utils'

const PARTICLE_COUNT = 48
const S_W = 600
const S_H = 360
const CX = S_W / 2
const CY = S_H / 2

interface ParticleDef {
  id: number
  r0: [number, number]
  r1: [number, number]
  r2: [number, number]
  size0: number
  size1: number
  size2: number
  color01: string
  color12: string
}

function seeded(i: number): number {
  return ((i * 16807 + 1) % 2147483647) / 2147483647
}

export function DataMorph({ progress }: { progress: number }) {
  const particles = useMemo(() => {
    const cols = 8
    const spacing = 52
    const clusterCenters: [number, number][] = [
      [CX - 100, CY - 20],
      [CX + 80, CY - 40],
      [CX - 40, CY + 60],
    ]

    return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const s1 = seeded(i)
      const s2 = seeded(i + 100)
      const s3 = seeded(i + 200)
      const s4 = seeded(i + 300)

      const col = i % cols
      const row = Math.floor(i / cols)

      const center = clusterCenters[i % 3]
      const gauss = (s: number) => (s + s + s) / 3 - 0.5

      return {
        id: i,
        r0: [s1 * S_W * 0.8 + S_W * 0.1, s2 * S_H * 0.7 + S_H * 0.15] as [number, number],
        r1: [
          center[0] + gauss(s3) * 80,
          center[1] + gauss(s4) * 60,
        ] as [number, number],
        r2: [
          CX + (col - cols / 2) * spacing + (s1 - 0.5) * 8,
          CY + (row - Math.floor(PARTICLE_COUNT / cols) / 2) * spacing + (s2 - 0.5) * 8,
        ] as [number, number],
        size0: 1.5 + s3 * 2.5,
        size1: 2 + s4 * 3,
        size2: 1.5 + s1 * 1.5,
        col1: s2 > 0.5 ? colors.accent.signal : colors.text.secondary,
        col2: s1 > 0.5 ? colors.accent.success : colors.accent.signal,
      }
    })
  }, [])

  const t1 = smoothstep(0, 0.33, progress)
  const t2 = smoothstep(0.33, 0.66, progress)
  const morph = t1 < 1 ? t1 / 1 : 1 + (t2 - 1) * 0
  const stage1 = clamp(progress / 0.33)
  const stage2 = clamp((progress - 0.33) / 0.33)
  const stage3 = clamp((progress - 0.66) / 0.34)

  return (
    <svg
      viewBox={`0 0 ${S_W} ${S_H}`}
      className="w-full h-full overflow-visible"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id="morph-glow-a">
          <stop offset="0%" stopColor="#FFB454" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#FFB454" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="morph-glow-b">
          <stop offset="0%" stopColor="#3FB950" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#3FB950" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Connector lines between nearby particles */}
      {stage2 > 0 && particles.slice(0, 30).map((a, i) => {
        const b = particles[(i + 3) % particles.length]
        const ax = lerp(a.r0[0], lerp(a.r1[0], a.r2[0], stage2), stage1)
        const ay = lerp(a.r0[1], lerp(a.r1[1], a.r2[1], stage2), stage1)
        const bx = lerp(b.r0[0], lerp(b.r1[0], b.r2[0], stage2), stage1)
        const by = lerp(b.r0[1], lerp(b.r1[1], b.r2[1], stage2), stage1)
        const dist = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2)
        if (dist > 120) return null

        return (
          <motion.line
            key={`line-${i}`}
            x1={ax} y1={ay} x2={bx} y2={by}
            stroke={stage3 > 0.5 ? colors.accent.success : colors.accent.signal}
            strokeWidth={0.5 + stage2 * 1 + stage3 * 0.5}
            strokeOpacity={stage2 * 0.25}
          />
        )
      })}

      {/* Ambient glow behind clusters */}
      {stage2 > 0.3 && (
        <motion.ellipse
          cx={CX}
          cy={CY}
          rx={120 + stage2 * 40}
          ry={80 + stage2 * 30}
          fill={stage3 > 0.5 ? 'url(#morph-glow-b)' : 'url(#morph-glow-a)'}
          animate={{ opacity: stage2 > 0.5 ? 1 : 0.5 }}
          transition={{ duration: 0.6 }}
        />
      )}

      {/* Particles */}
      {particles.map((p) => {
        const x = lerp(p.r0[0], lerp(p.r1[0], p.r2[0], stage2), stage1)
        const y = lerp(p.r0[1], lerp(p.r1[1], p.r2[1], stage2), stage1)
        const sz = lerp(p.size0, lerp(p.size1, p.size2, stage2), stage1)
        const col = stage3 > 0.3 ? p.col2 : (stage2 > 0.3 ? p.col1 : colors.text.secondary)
        const isEmissive = (stage2 > 0.5 && seeded(p.id + 50) > 0.6) || (stage3 > 0.3 && seeded(p.id + 80) > 0.7)

        return (
          <g key={p.id}>
            {/* Glow ring for highlighted particles */}
            {isEmissive && (
              <motion.circle
                cx={x} cy={y}
                r={sz * 4}
                fill="none"
                stroke={col}
                strokeWidth={0.5}
                strokeOpacity={0.2}
                animate={{
                  r: [sz * 4, sz * 6, sz * 4],
                  strokeOpacity: [0.2, 0.05, 0.2],
                }}
                transition={{ duration: 2 + seeded(p.id) * 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
            <motion.circle
              cx={x} cy={y}
              r={sz}
              fill={col}
              animate={{
                opacity: stage1 < 0.8 ? 0.4 + seeded(p.id + 10) * 0.6 : 0.7 + seeded(p.id + 10) * 0.3,
              }}
              transition={{ duration: 0.4 }}
            />
          </g>
        )
      })}
    </svg>
  )
}
