'use client'

import { motion } from 'framer-motion'

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

export function BarChart() {
  return (
    <div className="mt-16 flex h-[120px] items-end gap-8">
      {data.map((d, i) => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-4">
          <motion.div
            className="w-full rounded-t-sm bg-accent-signal/60"
            initial={{ height: 0 }}
            whileInView={{ height: `${(d.value / max) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: 'easeOut' }}
          />
        </div>
      ))}
    </div>
  )
}
