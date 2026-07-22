'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useScrollProgress } from '@/lib/animation/useScrollProgress'
import { easings, durations } from '@/lib/animation/easings'
import { ScrollIndicator } from './scroll-indicator'

const ParticleField = dynamic(() => import('./particle-field').then((m) => ({ default: m.ParticleField })), {
  ssr: false,
})

export function Hero() {
  const { ref, progress } = useScrollProgress<HTMLElement>()

  return (
    <section id="hero" ref={ref} className="relative h-[150vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-bg-base">
        <ParticleField progress={progress} />

        <div className="relative z-10 flex h-full flex-col justify-center px-24 md:px-64 max-w-3xl">
          <motion.p
            className="mb-16 font-mono text-label uppercase text-accent-signal"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: durations.base, ease: easings.confident.framer }}
          >
            Xai — Intelligence Workspace
          </motion.p>
          <motion.h1
            className="font-display text-h1 text-text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: durations.slow, delay: 0.1, ease: easings.confident.framer }}
          >
            Raw data, structured into decisions.
          </motion.h1>
          <motion.p
            className="mt-24 font-display text-body text-text-secondary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: durations.base, delay: 0.3 }}
          >
            Xai ingests noise and returns clarity — watch structure emerge as you scroll.
          </motion.p>
        </div>

        <ScrollIndicator />
      </div>
    </section>
  )
}
