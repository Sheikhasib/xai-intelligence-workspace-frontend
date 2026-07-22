'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface AnimatedStatProps {
  value: number
  label: string
  suffix?: string
}

export function AnimatedStat({ value, label, suffix = '' }: AnimatedStatProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 800
    const step = 16
    const increment = value / (duration / step)
    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, step)
    return () => clearInterval(timer)
  }, [value, inView])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <p className="font-mono text-label uppercase text-text-secondary">{label}</p>
      <p className="mt-8 font-display text-h2 text-text-primary">
        {count.toLocaleString()}{suffix}
      </p>
    </motion.div>
  )
}
