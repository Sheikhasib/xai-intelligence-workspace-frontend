'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { useScrollProgress } from '@/lib/animation/useScrollProgress'

const ExtrudingLattice = dynamic(
  () => import('./extruding-lattice').then((m) => ({ default: m.ExtrudingLattice })),
  { ssr: false }
)

const GRID_SIZE = 14

export function SignatureInteraction() {
  const { ref, progress } = useScrollProgress<HTMLElement>()
  const [nodeCount] = useState(GRID_SIZE * GRID_SIZE)
  const clusters = Math.round(3 + progress * 9)

  return (
    <section id="signature" ref={ref} className="relative h-[130vh] bg-bg-base">
      <div className="sticky top-0 h-screen overflow-hidden">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 1.5]}>
          <ExtrudingLattice progress={progress} />
        </Canvas>

        <div className="pointer-events-none absolute bottom-48 left-1/2 -translate-x-1/2 font-mono text-label uppercase text-accent-signal text-center">
          <p>NODES: {nodeCount.toLocaleString()}</p>
          <p>CLUSTERS: {clusters}</p>
        </div>

        <div className="pointer-events-none absolute left-24 md:left-64 top-1/3 max-w-md">
          <p className="font-display text-h2 text-text-primary">
            Every cluster, reorganized in real time.
          </p>
        </div>
      </div>
    </section>
  )
}
