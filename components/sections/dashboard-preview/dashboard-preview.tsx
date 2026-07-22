'use client'

import { useState } from 'react'
import { useScrollProgress } from '@/lib/animation/useScrollProgress'
import { GridBackground } from '@/components/ui/grid-background'
import { Sidebar } from './sidebar'
import { Panel, TabbedPanel } from './panel'

const tabs = [
  { id: 'overview', label: 'Overview', type: 'chart' as const },
  { id: 'clusters', label: 'Clusters', type: 'table' as const },
  { id: 'metrics', label: 'Metrics', type: 'stats-group' as const, data: [
    { label: 'Accuracy', value: 97, suffix: '%' },
    { label: 'Latency', value: 12, suffix: 'ms' },
    { label: 'Sources', value: 48, suffix: '' },
    { label: 'Automations', value: 24, suffix: '' },
  ]},
]

export function DashboardPreview() {
  const { ref, progress } = useScrollProgress<HTMLElement>()
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <section id="dashboard" ref={ref} className="relative bg-bg-base px-24 md:px-64 py-128">
      <GridBackground structure={0.85 + progress * 0.15} />
      <div className="relative z-10 mx-auto max-w-6xl">
        <p className="font-mono text-label uppercase text-text-secondary">Intelligence Dashboard</p>
        <h2 className="mt-16 font-display text-h2 text-text-primary">
          Structure, made usable.
        </h2>

        <div className="mt-64 flex flex-col md:flex-row rounded-sm border border-border-subtle bg-bg-surface overflow-hidden">
          <Sidebar />
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-16 p-16 md:p-32">
            <Panel type="stat" title="Nodes Processed" delay={0} data={[{ label: 'Total', value: 2048 }]} />
            <Panel type="chart" title="Weekly Activity" delay={0.1} />
            <Panel type="table" title="Top Clusters" delay={0.2} />
            <div className="md:col-span-3">
              <TabbedPanel tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
