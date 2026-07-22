'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg-base gap-16">
      <h2 className="font-display text-h2 text-text-primary">Something went wrong</h2>
      <button
        onClick={() => reset()}
        className="px-24 py-16 text-body-sm font-display border border-accent-signal text-accent-signal hover:bg-accent-signal hover:text-bg-base transition-colors duration-300 rounded-sm"
      >
        Try again
      </button>
    </div>
  )
}
