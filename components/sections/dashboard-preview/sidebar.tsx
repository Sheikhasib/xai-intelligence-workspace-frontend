'use client'

import { useState } from 'react'

const items = [
  { label: 'Overview', icon: '◆' },
  { label: 'Insights', icon: '▲' },
  { label: 'Automations', icon: '■' },
  { label: 'Sources', icon: '●' },
  { label: 'Settings', icon: '◇' },
]

export function Sidebar() {
  const [active, setActive] = useState('Overview')

  return (
    <aside className="w-[200px] shrink-0 border-r border-border-subtle py-32 pr-24">
      <div className="flex flex-col gap-8">
        {items.map((item) => (
          <button
            key={item.label}
            onClick={() => setActive(item.label)}
            className={`flex items-center gap-12 px-16 py-12 rounded-sm font-mono text-label uppercase transition-all duration-300 cursor-pointer ${
              active === item.label
                ? 'text-accent-signal bg-accent-signal/5'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
            }`}
          >
            <span className="text-caption">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    </aside>
  )
}
