'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg-base px-24">
      <p className="font-mono text-[120px] font-black text-accent-signal/20 leading-none">404</p>
      <h1 className="font-display text-h1 text-text-primary mt-8">Page not found</h1>
      <p className="font-display text-body text-text-secondary mt-16 max-w-md text-center">
        This page has drifted outside the structured domain.
      </p>
      <Link
        href="/"
        className="mt-32 px-24 py-16 text-body-sm font-display border border-accent-signal text-accent-signal hover:bg-accent-signal hover:text-bg-base transition-colors duration-300 rounded-sm"
      >
        Return to Intelligence Workspace
      </Link>
    </div>
  )
}
