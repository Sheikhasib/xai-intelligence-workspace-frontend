'use client'

import { useActiveSection } from '@/lib/useActiveSection'
import { cn } from '@/lib/utils'

const links = [
  { id: 'hero', label: 'Data' },
  { id: 'insight-flow', label: 'Insight' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'signature', label: 'Intelligence' },
]

export function Navbar() {
  const active = useActiveSection()

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="fixed top-8 left-8 right-8 z-50 mx-auto max-w-6xl">
      <div className="flex items-center justify-between rounded-sm border border-border-subtle bg-bg-surface/80 px-16 md:px-32 py-12 md:py-16 backdrop-blur-md">
        <button
          onClick={() => scrollTo('hero')}
          className="font-mono text-label uppercase tracking-wider text-accent-signal"
        >
          Xai
        </button>

        <div className="hidden md:flex items-center gap-32">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={cn(
                'relative font-mono text-label uppercase transition-colors duration-300',
                active === link.id
                  ? 'text-text-primary'
                  : 'text-text-secondary hover:text-text-primary'
              )}
            >
              {link.label}
              {active === link.id && (
                <span className="absolute -bottom-4 left-1/2 h-[2px] w-16 -translate-x-1/2 bg-accent-signal" />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
