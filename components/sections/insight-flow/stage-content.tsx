'use client'

import { motion } from 'framer-motion'
import { easings } from '@/lib/animation/easings'
import { colors } from '@/lib/constants'

interface StageContentProps {
  index: string
  title: string
  description: string
  isActive: boolean
  isPast: boolean
}

export function StageContent({ index, title, description, isActive, isPast }: StageContentProps) {
  const status = isPast ? 'complete' : isActive ? 'active' : 'inactive'

  return (
    <motion.div
      className="flex-1 flex flex-col items-center gap-16 text-center"
      initial={false}
      animate={{
        opacity: status === 'inactive' ? 0.35 : 1,
        y: isActive ? 0 : 8,
      }}
      transition={{ duration: 0.5, ease: easings.confident.framer }}
    >
      <motion.div
        className="flex items-center justify-center w-48 h-48 rounded-sm border cursor-default"
        animate={{
          borderColor:
            status === 'complete'
              ? colors.accent.success
              : status === 'active'
              ? colors.accent.signal
              : colors.border.subtle,
          backgroundColor:
            status === 'active' ? `${colors.accent.signal}15` : 'transparent',
          scale: isActive ? 1.1 : 1,
        }}
        transition={{ duration: 0.3, ease: easings.precise.framer }}
        whileHover={{ scale: 1.15, borderColor: colors.accent.signal }}
      >
        <motion.span
          className="font-mono text-label"
          animate={{
            color:
              status === 'complete'
                ? colors.accent.success
                : status === 'active'
                ? colors.accent.signal
                : colors.text.secondary,
          }}
          transition={{ duration: 0.3 }}
        >
          {index}
        </motion.span>
      </motion.div>

      <div>
        <motion.h3
          className="font-display text-h3"
          animate={{
            color:
              status === 'complete'
                ? colors.accent.success
                : isActive || isPast
                ? colors.text.primary
                : colors.text.secondary,
          }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="mt-8 font-display text-body-sm text-text-secondary max-w-[220px] mx-auto leading-relaxed"
          animate={{
            opacity: isActive ? 1 : 0,
            height: isActive ? 'auto' : 0,
            marginTop: isActive ? 8 : 0,
          }}
          transition={{ duration: 0.4, ease: easings.precise.framer }}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  )
}
