'use client'

import { useMemo, useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import {
  BufferGeometry,
  BufferAttribute,
  LineBasicMaterial,
  LineSegments,
  Vector2,
  DoubleSide,
  type Mesh,
  type Group,
  type MeshStandardMaterial,
  type MeshBasicMaterial,
} from 'three'
import { colors } from '@/lib/constants'
import { useReducedMotion } from '@/lib/useReducedMotion'

const GRID_SIZE = 14

export function ExtrudingLattice({ progress }: { progress: number }) {
  const reduced = useReducedMotion()
  const meshRefs = useRef<(Mesh | null)[]>([])
  const glowRefs = useRef<(Mesh | null)[]>([])
  const linesRef = useRef<LineSegments>(null)
  const groupRef = useRef<Group>(null)
  const coreRef = useRef<Mesh>(null)
  const coreGlowRef = useRef<Mesh>(null)
  const mouseRef = useRef(new Vector2())

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('pointermove', onPointerMove)
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [])

  const positions = useMemo(() => {
    const arr: [number, number][] = []
    for (let x = -GRID_SIZE / 2; x < GRID_SIZE / 2; x++) {
      for (let y = -GRID_SIZE / 2; y < GRID_SIZE / 2; y++) {
        arr.push([x, y])
      }
    }
    return arr
  }, [])

  useEffect(() => {
    meshRefs.current = []
    glowRefs.current = []
    return () => { meshRefs.current = []; glowRefs.current = [] }
  }, [positions])

  const linePairs = useMemo(() => {
    const pairs: number[] = []
    for (let i = 0; i < positions.length; i++) {
      const isLastCol = (i % GRID_SIZE) === GRID_SIZE - 1
      const isLastRow = i >= positions.length - GRID_SIZE
      if (!isLastCol) pairs.push(i, i + 1)
      if (!isLastRow) pairs.push(i, i + GRID_SIZE)
    }
    return pairs
  }, [positions])

  const lineObject = useMemo(() => {
    const arr = new Float32Array(linePairs.length * 3)
    for (let i = 0; i < linePairs.length; i++) {
      const p = positions[linePairs[i]]
      arr[i * 3] = p[0] * 0.6
      arr[i * 3 + 1] = p[1] * 0.6
      arr[i * 3 + 2] = 0
    }
    const geo = new BufferGeometry()
    geo.setAttribute('position', new BufferAttribute(arr, 3))
    geo.computeBoundingSphere()
    const mat = new LineBasicMaterial({
      color: colors.accent.signal,
      transparent: true,
      opacity: 0.12,
    })
    const obj = new LineSegments(geo, mat)
    obj.visible = false
    return obj
  }, [linePairs, positions])

  useFrame((state) => {
    if (reduced) return

    const t = state.clock.elapsedTime
    const mouse = mouseRef.current
    const extrusions = new Float32Array(positions.length)

    let maxExtrusion = 0
    for (let i = 0; i < positions.length; i++) {
      const mesh = meshRefs.current[i]
      if (!mesh) continue
      const [x, y] = positions[i]
      const dist = Math.sqrt(x * x + y * y)
      const wave = Math.sin(t * 0.8 - dist * 0.4) * 0.5 + 0.5

      const mx = x / (GRID_SIZE / 2)
      const my = y / (GRID_SIZE / 2)
      const push = Math.exp(-((mx - mouse.x) ** 2 + (my - mouse.y) ** 2) * 2) * 0.6 * progress

      const extrusion = wave * progress * (1 - dist / GRID_SIZE) * 2.5 + push
      extrusions[i] = extrusion
      if (extrusion > maxExtrusion) maxExtrusion = extrusion

      mesh.position.z = extrusion
      const scale = 0.15 + extrusion * 0.12
      mesh.scale.setScalar(scale)

      const mat = mesh.material as MeshStandardMaterial
      const mix = Math.min(1, extrusion / 2)
      mat.color.setHSL(0.1 - mix * 0.1, 0.8, 0.5 + mix * 0.2)
      mat.emissive.setHSL(0.1 - mix * 0.1, 0.8, 0.15 + mix * 0.15)
      mat.emissiveIntensity = 0.15 + extrusion * 0.2

      // Glow ring around tall nodes
      const glow = glowRefs.current[i]
      if (glow) {
        const glowScale = extrusion > 0.8 ? extrusion * 0.5 : 0
        glow.scale.setScalar(glowScale > 0.01 ? glowScale : 0.001)
        glow.position.z = extrusion
        const glowMat = glow.material as MeshBasicMaterial
        glowMat.opacity = Math.min(0.2, extrusion * 0.1)
      }
    }

    // Core node animation
    if (coreRef.current && coreGlowRef.current) {
      const corePulse = 0.3 + Math.sin(t * 1.2) * 0.15
      coreRef.current.scale.setScalar(corePulse)
      coreRef.current.position.z = maxExtrusion * 0.5

      const coreMat = coreRef.current.material as MeshStandardMaterial
      coreMat.emissiveIntensity = 0.3 + Math.sin(t * 1.2) * 0.2

      coreGlowRef.current.scale.setScalar(corePulse * 3)
      coreGlowRef.current.position.z = maxExtrusion * 0.5
      const glowMat = coreGlowRef.current.material as MeshBasicMaterial
      glowMat.opacity = 0.08 + Math.sin(t * 1.2) * 0.04
    }

    // Lines
    const lineObj = linesRef.current
    if (lineObj && progress > 0.1) {
      const pos = lineObj.geometry.attributes.position as BufferAttribute
      const array = pos.array as Float32Array
      let idx = 0
      for (let i = 0; i < linePairs.length; i += 2) {
        const a = linePairs[i]
        const b = linePairs[i + 1]
        if (b === undefined) break
        const pa = positions[a]
        const pb = positions[b]
        array[idx * 3] = pa[0] * 0.6
        array[idx * 3 + 1] = pa[1] * 0.6
        array[idx * 3 + 2] = extrusions[a]
        idx++
        array[idx * 3] = pb[0] * 0.6
        array[idx * 3 + 1] = pb[1] * 0.6
        array[idx * 3 + 2] = extrusions[b]
        idx++
      }
      pos.needsUpdate = true
      lineObj.visible = true

      // Line opacity increases with progress
      const lineMat = lineObj.material as LineBasicMaterial
      lineMat.opacity = 0.06 + progress * 0.14
    }

    if (groupRef.current) {
      groupRef.current.rotation.x = -0.3 + progress * 0.12 + Math.sin(t * 0.15) * 0.02
      groupRef.current.rotation.y = 0.3 + t * 0.04 * progress + mouse.x * 0.08
    }
  })

  return (
    <group ref={groupRef} rotation={[-0.3, 0.3, 0]}>
      {/* Core glow */}
      <mesh ref={coreGlowRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial color={colors.accent.signal} transparent opacity={0.08} />
      </mesh>

      {/* Core node */}
      <mesh ref={coreRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color={colors.accent.signal}
          emissive={colors.accent.signal}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Grid nodes */}
      {positions.map(([x, y], i) => (
        <group key={`${x}-${y}`}>
          <mesh
            position={[x * 0.6, y * 0.6, 0]}
            ref={(el) => { meshRefs.current[i] = el }}
          >
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshStandardMaterial
              color={colors.accent.signal}
              emissive={colors.accent.signal}
              emissiveIntensity={0.2}
            />
          </mesh>
          <mesh
            position={[x * 0.6, y * 0.6, 0]}
            ref={(el) => { glowRefs.current[i] = el }}
            scale={0.001}
          >
            <ringGeometry args={[0.3, 0.6, 16]} />
            <meshBasicMaterial
              color={colors.accent.signal}
              transparent
              opacity={0}
              side={DoubleSide}
            />
          </mesh>
        </group>
      ))}

      <primitive ref={linesRef} object={lineObject} />
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color={colors.accent.signal} />
      <pointLight position={[-4, -3, 2]} intensity={0.4} color="#3FB950" />
    </group>
  )
}
