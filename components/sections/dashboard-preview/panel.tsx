'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { easings, durations } from '@/lib/animation/easings'
import { BarChart } from './bar-chart'
import { DataTable } from './data-table'
import { AnimatedStat } from './animated-stat'
import type { PanelType, StatData, TabData } from './types'

interface PanelProps {
  type: PanelType
  title: string
  delay?: number
  data?: StatData[]
}

function PanelContent({ type, data }: { type: PanelType; data?: StatData[] }) {
  switch (type) {
    case 'stat':
      return (
        <AnimatedStat
          value={data?.[0]?.value ?? 2048}
          label={data?.[0]?.label ?? 'Total'}
          suffix={data?.[0]?.suffix ?? ''}
        />
      )
    case 'chart':
      return <BarChart />
    case 'table':
      return <DataTable />
    case 'stats-group':
      return (
        <div className="mt-16 grid grid-cols-2 gap-16">
          {data?.map((d) => (
            <AnimatedStat key={d.label} value={d.value} label={d.label} suffix={d.suffix} />
          ))}
        </div>
      )
  }
}

export function Panel({ type, title, delay = 0, data }: PanelProps) {
  return (
    <motion.div
      className="rounded-sm border border-border-subtle bg-bg-surface p-24 hover:bg-bg-hover transition-colors duration-300"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: durations.base, delay, ease: easings.confident.framer }}
    >
      <p className="font-mono text-label uppercase text-text-secondary">{title}</p>
      <PanelContent type={type} data={data} />
    </motion.div>
  )
}

export function TabbedPanel({
  tabs,
  activeTab,
  onTabChange,
}: {
  tabs: TabData[]
  activeTab: string
  onTabChange: (id: string) => void
}) {
  const active = tabs.find((t) => t.id === activeTab) ?? tabs[0]

  return (
    <div className="col-span-3 rounded-sm border border-border-subtle bg-bg-surface p-24">
      <div className="flex gap-24 border-b border-border-subtle pb-16">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`font-mono text-label uppercase transition-colors duration-300 cursor-pointer ${
              activeTab === tab.id ? 'text-accent-signal' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: easings.precise.framer }}
        >
          <PanelContent type={active.type} data={active.data} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
