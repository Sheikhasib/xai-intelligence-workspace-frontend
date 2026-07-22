'use client'

import { motion } from 'framer-motion'

export function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-48 left-1/2 -translate-x-1/2 flex flex-col items-center gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.6 }}
    >
      <span className="font-mono text-caption uppercase text-text-secondary">
        Scroll to structure
      </span>
      <motion.div
        className="h-24 w-[1px] bg-accent-signal/60"
        animate={{ scaleY: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}
