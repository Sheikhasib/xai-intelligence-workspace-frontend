'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { colors, GRID_UNIT } from '@/lib/constants'
import { useReducedMotion } from '@/lib/useReducedMotion'

const PARTICLE_COUNT = 800

function Particles({ progress }: { progress: number }) {
  const reduced = useReducedMotion()
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)

  const { rawPositions, gridPositions } = useMemo(() => {
    const raw = new Float32Array(PARTICLE_COUNT * 3)
    const grid = new Float32Array(PARTICLE_COUNT * 3)
    const cols = Math.ceil(Math.sqrt(PARTICLE_COUNT))
    const spacing = GRID_UNIT / 10

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      raw[i * 3] = (Math.random() - 0.5) * 12
      raw[i * 3 + 1] = (Math.random() - 0.5) * 8
      raw[i * 3 + 2] = (Math.random() - 0.5) * 6

      const col = i % cols
      const row = Math.floor(i / cols)
      grid[i * 3] = (col - cols / 2) * spacing
      grid[i * 3 + 1] = (row - cols / 2) * spacing
      grid[i * 3 + 2] = 0
    }
    return { rawPositions: raw, gridPositions: grid }
  }, [])

  const currentPositions = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), [])

  const linePairs = useMemo(() => {
    const pairs: number[] = []
    const cols = Math.ceil(Math.sqrt(PARTICLE_COUNT))
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const col = i % cols
      const row = Math.floor(i / cols)
      const hasRight = col < cols - 1 && i + 1 < PARTICLE_COUNT
      const hasBelow = row < Math.floor(PARTICLE_COUNT / cols) - 1 && i + cols < PARTICLE_COUNT
      if (hasRight) pairs.push(i, i + 1)
      if (hasBelow) pairs.push(i, i + cols)
    }
    return pairs
  }, [])

  const lineObject = useMemo(() => {
    const arr = new Float32Array(linePairs.length * 3)
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(arr, 3))
    geo.computeBoundingSphere()
    const mat = new THREE.LineBasicMaterial({
      color: colors.accent.signal,
      transparent: true,
      opacity: 0.15,
    })
    const obj = new THREE.LineSegments(geo, mat)
    obj.visible = false
    return obj
  }, [linePairs])

  useFrame((state) => {
    if (!pointsRef.current) return
    const t = state.clock.elapsedTime
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute

    if (reduced) {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const idx = i * 3
        currentPositions[idx] = gridPositions[idx]
        currentPositions[idx + 1] = gridPositions[idx + 1]
        currentPositions[idx + 2] = gridPositions[idx + 2]
      }
      posAttr.array = currentPositions
      posAttr.needsUpdate = true
      return
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3
      const driftX = Math.sin(t * 0.3 + i) * 0.15 * (1 - progress)
      const driftY = Math.cos(t * 0.2 + i) * 0.15 * (1 - progress)

      currentPositions[idx] =
        THREE.MathUtils.lerp(rawPositions[idx], gridPositions[idx], progress) + driftX
      currentPositions[idx + 1] =
        THREE.MathUtils.lerp(rawPositions[idx + 1], gridPositions[idx + 1], progress) + driftY
      currentPositions[idx + 2] = THREE.MathUtils.lerp(
        rawPositions[idx + 2],
        gridPositions[idx + 2],
        progress
      )
    }
    posAttr.array = currentPositions
    posAttr.needsUpdate = true
    pointsRef.current.rotation.y = t * 0.02 * (1 - progress)

    const lineObj = linesRef.current
    if (lineObj && progress > 0.5) {
      const lineAttr = lineObj.geometry.attributes.position as THREE.BufferAttribute
      const arr = lineAttr.array as Float32Array
      for (let i = 0; i < linePairs.length; i++) {
        const pi = linePairs[i]
        arr[i * 3] = currentPositions[pi * 3]
        arr[i * 3 + 1] = currentPositions[pi * 3 + 1]
        arr[i * 3 + 2] = currentPositions[pi * 3 + 2]
      }
      lineAttr.needsUpdate = true
      lineObj.visible = true
    }
  })

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[currentPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color={progress > 0.6 ? colors.accent.signal : colors.text.secondary}
          transparent
          opacity={0.7}
          sizeAttenuation
        />
      </points>
      <primitive ref={linesRef} object={lineObject} />
    </group>
  )
}

export function ParticleField({ progress = 0 }: { progress?: number }) {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 1.5]}>
        <Particles progress={progress} />
      </Canvas>
    </div>
  )
}
