'use client'

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-base px-24 py-48 md:px-64">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-16 md:flex-row">
        <p className="font-mono text-label uppercase text-accent-signal">Xai — Intelligence Workspace</p>
        <p className="font-display text-body-sm text-text-secondary">
          Raw data, structured into decisions.
        </p>
      </div>
    </footer>
  )
}
