'use client'

import { motion } from 'framer-motion'
import { easings, durations } from '@/lib/animation/easings'
import { colors } from '@/lib/constants'
import type { ActiveStage } from './useActiveStage'
import { IngestVisual } from './visuals/ingest-visual'
import { AnalyzeVisual } from './visuals/analyze-visual'
import { GenerateVisual } from './visuals/generate-visual'

interface StageContentProps {
  stage: ActiveStage
  index: string
  title: string
  description: string
  isActive: boolean
  isPast: boolean
  stageIndex: number
}

const visuals: Record<ActiveStage, React.FC> = {
  ingest: IngestVisual,
  analyze: AnalyzeVisual,
  generate: GenerateVisual,
}

export function StageContent({
  stage,
  index,
  title,
  description,
  isActive,
  isPast,
  stageIndex,
}: StageContentProps) {
  const Visual = visuals[stage]
  const status = isPast ? 'complete' : isActive ? 'active' : 'inactive'

  return (
    <motion.div
      className="flex flex-col items-center gap-32 flex-1"
      initial={false}
      animate={{ opacity: status === 'inactive' ? 0.3 : 1 }}
      transition={{ duration: 0.4, ease: easings.precise.framer }}
    >
      <div className="relative flex h-[200px] w-full items-center justify-center">
        <Visual />

        {stageIndex < 2 && (
          <svg
            className="absolute -right-[calc(50%+8px)] top-1/2 -translate-y-1/2 pointer-events-none"
            width="24"
            height="2"
            viewBox="0 0 24 2"
          >
            <motion.line
              x1="0"
              y1="1"
              x2="24"
              y2="1"
              stroke={isPast ? colors.accent.success : colors.border.subtle}
              strokeWidth="1"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isPast ? 1 : 0.3 }}
              transition={{ duration: 0.6, ease: easings.confident.framer }}
              style={{ transformOrigin: 'left' }}
            />
          </svg>
        )}
      </div>

      <div className="text-center">
        <motion.span
          className="font-mono text-label text-accent-signal block"
          animate={{
            color: isPast ? colors.accent.success : colors.accent.signal,
          }}
          transition={{ duration: 0.4 }}
        >
          {index}
        </motion.span>
        <h3
          className={`mt-8 font-display text-h3 transition-colors duration-300 ${
            isPast || isActive ? 'text-text-primary' : 'text-text-secondary'
          }`}
        >
          {title}
        </h3>
        <motion.p
          className="mt-8 font-display text-body-sm text-text-secondary max-w-[240px] mx-auto"
          animate={{
            height: isActive ? 'auto' : 0,
            opacity: isActive ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: easings.precise.framer }}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  )
}
