'use client'

import { type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost'
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  const base =
    'px-24 py-16 text-body-sm font-display transition-colors duration-300 rounded-sm'
  const variants = {
    // Outlined, not filled - keeps the "calm, technically confident" register
    // instead of a loud marketing CTA
    primary:
      'border border-accent-signal text-accent-signal hover:bg-accent-signal hover:text-bg-base',
    ghost:
      'text-text-secondary hover:text-text-primary',
  }

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  )
}
