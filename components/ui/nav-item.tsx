'use client'

interface NavItemProps {
  label: string
  active?: boolean
  onClick?: () => void
}

export function NavItem({ label, active = false, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`relative pb-8 text-label uppercase font-mono transition-colors duration-300 ${
        active ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
      }`}
    >
      {label}
      {active && (
        <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-accent-signal" />
      )}
    </button>
  )
}
