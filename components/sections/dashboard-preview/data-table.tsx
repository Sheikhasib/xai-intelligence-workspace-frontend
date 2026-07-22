'use client'

import { motion } from 'framer-motion'

const rows = [
  { cluster: 'Alpha', confidence: 94, volume: '2.4K' },
  { cluster: 'Beta', confidence: 87, volume: '1.8K' },
  { cluster: 'Gamma', confidence: 81, volume: '1.2K' },
  { cluster: 'Delta', confidence: 76, volume: '980' },
  { cluster: 'Epsilon', confidence: 72, volume: '650' },
]

export function DataTable() {
  return (
    <div className="mt-16 flex flex-col gap-8">
      {rows.map((row, i) => (
        <motion.div
          key={row.cluster}
          className="flex items-center justify-between border-b border-border-subtle pb-8"
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-12">
            <span className="font-mono text-caption text-text-secondary">{String(i + 1).padStart(2, '0')}</span>
            <span className="font-display text-body-sm text-text-primary">{row.cluster}</span>
          </div>
          <div className="flex items-center gap-16">
            <span className="font-mono text-caption text-accent-signal">{row.confidence}%</span>
            <span className="font-mono text-caption text-text-secondary">{row.volume}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
