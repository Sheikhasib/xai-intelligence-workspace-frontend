'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GridBackground } from '@/components/ui/grid-background'
import { DataMorph } from './data-morph'
import { StageContent } from './stage-content'
import { ActiveStage, useInsightProgress } from './useInsightProgress'

gsap.registerPlugin(ScrollTrigger)

const stages: { index: string; key: ActiveStage; title: string; description: string }[] = [
  {
    index: '01',
    key: 'ingest',
    title: 'Ingest Data',
    description: 'Raw signals arrive from every source, unstructured and unlabeled.',
  },
  {
    index: '02',
    key: 'analyze',
    title: 'Analyze with AI',
    description: 'Xai finds structure — clusters, patterns, and relationships humans would miss.',
  },
  {
    index: '03',
    key: 'generate',
    title: 'Generate Insight',
    description: 'Structure becomes a decision-ready recommendation, not just a chart.',
  },
]

const stageIdx: Record<ActiveStage, number> = { ingest: 0, analyze: 1, generate: 2 }

export function InsightFlow() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const { progress, activeStage } = useInsightProgress(sectionRef)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=300%',
        pin: pinRef.current,
        pinSpacing: true,
        scrub: 1.2,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="insight-flow" ref={sectionRef} className="relative bg-bg-base overflow-hidden">
      <div ref={pinRef} className="h-screen flex flex-col">
        <GridBackground
          structure={0.5 + (stageIdx[activeStage] / stages.length) * 0.4}
        />

        <div className="relative z-10 flex-1 flex flex-col justify-center px-24 md:px-64 mx-auto w-full max-w-6xl">
          <p className="font-mono text-label uppercase text-text-secondary">Insight Flow</p>
          <h2 className="mt-16 font-display text-h2 text-text-primary">
            From ingestion to decision.
          </h2>

          {/* Unified visualization */}
          <div className="mt-32 w-full h-[240px] md:h-[320px]">
            <DataMorph progress={progress} />
          </div>

          {/* Stage cards */}
          <div className="mt-24 flex flex-col md:flex-row items-start justify-between gap-24 md:gap-32">
            {stages.map((stage) => (
              <StageContent
                key={stage.key}
                index={stage.index}
                title={stage.title}
                description={stage.description}
                isActive={activeStage === stage.key}
                isPast={stageIdx[activeStage] > stageIdx[stage.key]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
