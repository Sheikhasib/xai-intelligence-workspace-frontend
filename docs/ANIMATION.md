# Animation System

## Philosophy

Every animation in Xai serves a single purpose: to visualise the
transformation of unstructured data into organised intelligence. Motion
is never decorative - it is always communicating something about the
state of the system.

Three principles guide every animation decision:

1. **Purpose over polish.** If an animation doesn't explain the product,
   it doesn't exist.
2. **One tool per job.** GSAP owns narrative, Framer Motion owns
   interaction, Three.js owns geometry. They never compete.
3. **Shared timing.** Every animation - regardless of tool - pulls from
   the same easing curves and durations.

---

## Easing Curves

Defined in `lib/animation/easings.ts`. Three curves are used across every
section:

| Name | GSAP format | Framer format | Character | Used for |
|------|-------------|---------------|-----------|----------|
| `confident` | `power3.out` | `[0.16, 1, 0.3, 1]` | Calm settle; eases out gently | Section entrances, text reveals, layout transitions |
| `precise` | `power2.out` | `[0.25, 0.46, 0.45, 0.94]` | Snappy, responsive | Hover states, tab switches, micro-interactions |
| `snap` | `back.out(1.4)` | `[0.34, 1.56, 0.64, 1]` | Slight overshoot, deliberate | Grid nodes snapping into position |

```
confident  -------------------------->  gradual settle
precise    -------->                    quick, responsive
snap       ----------------o---->       overshoot then snap back
```

## Durations

| Name | Value | Used for |
|------|-------|----------|
| `instant` | 0.15 s | Colour transitions, opacity changes |
| `fast` | 0.3 s | Hover feedback, tab switches |
| `base` | 0.6 s | Card entrances, text reveals |
| `slow` | 1.0 s | Hero headline entrance |
| `sceneTransition` | 1.4 s | _(reserved for future use)_ |

---

## Section-by-Section Breakdown

### 1. Hero

| What | How | Duration | Easing |
|------|-----|----------|--------|
| Eyebrow label fade + slide up | Framer `animate` | 0.6 s | `confident` |
| Headline fade + slide up | Framer `animate` | 1.0 s (delay 0.1 s) | `confident` |
| Subtitle fade in | Framer `animate` | 0.6 s (delay 0.3 s) | - |
| Particles scattered -> grid | R3F `useFrame` lerp | Continuous (scroll-driven) | Linear (lerp) |
| Particle ambient drift | R3F `useFrame` sine wave | Continuous | - |
| Scroll indicator appearance | Framer `animate` | 0.6 s (delay 1.5 s) | - |
| Connector lines visibility | R3F conditional render | Crossfade at structure > 50% | - |

The particle field is the centrepiece. Two Float32Array position sets
(raw and grid) are pre-computed in `useMemo`. Every frame, `useFrame`
interpolates between them using `THREE.MathUtils.lerp` driven by scroll
progress, plus a sine-wave drift on the raw state that fades to zero as
structure approaches 1.

```ts
// Each frame, for each of 800 particles:
currentPositions[idx] =
  THREE.MathUtils.lerp(rawPositions[idx], gridPositions[idx], progress)
  + Math.sin(t * 0.3 + i) * 0.15 * (1 - progress)
```

### 2. Insight Flow

| What | How | Duration | Easing |
|------|-----|----------|--------|
| Section pinning | GSAP ScrollTrigger | 300 % scroll | Scrub 1.2 |
| SVG particle positions (scatter -> cluster -> grid) | Smoothstep interpolation | Continuous (scroll-driven) | `t^2(3-2t)` per stage boundary |
| Connector lines between particles | SVG `<line>` conditional render | Fade in at stage 2 | - |
| Ambient glow behind clusters | SVG `<ellipse>` opacity | Fade in at stage 2 | 0.6 s |
| Stage cards opacity | Framer `animate` | 0.5 s | `confident` |
| Number badge scale + border colour | Framer `animate` | 0.3 s | `precise` |
| Description text fade + slide | Framer `animate` | 0.4 s | `precise` |

The DataMorph SVG uses smoothstep interpolation (`t^2(3-2t)`) to transition
between three pre-defined states. Each of the 48 particles has three
position sets (scattered, clustered around centroids, gridded). The
progress value is mapped through three smoothstep functions, one per
stage boundary, so transitions feel organic:

```ts
const t1 = smoothstep(0, 0.33, progress)   // scatter -> cluster
const t2 = smoothstep(0.33, 0.66, progress) // cluster -> grid
const x = lerp(r0[0], lerp(r1[0], r2[0], t2), t1)
const y = lerp(r0[1], lerp(r1[1], r2[1], t2), t1)
```

### 3. Dashboard

| What | How | Duration | Easing |
|------|-----|----------|--------|
| Panel entrances | Framer `whileInView` | 0.6 s + stagger | `confident` |
| Bar chart bars | Framer `whileInView` height | 0.5 s + stagger 0.05 s | Ease out |
| Data table rows | Framer `whileInView` slide in | 0.4 s + stagger 0.08 s | Ease out |
| Stat counter | Custom `setInterval` count-up | 0.8 s | Linear |
| Tab transitions | Framer `AnimatePresence` | 0.3 s | `precise` |
| Sidebar hover | Tailwind `transition-colors` | 0.3 s | - |

### 4. Signature Interaction

| What | How | Duration | Easing |
|------|-----|----------|--------|
| Node extrusion (wave) | R3F `useFrame` | Continuous | Sine wave |
| Connector lines update | `BufferAttribute.needsUpdate` | Every frame | - |
| Core node pulse | R3F `useFrame` scale | 1.2 s cycle | Sine wave |
| Glow ring scale | R3F `useFrame` scale | Threshold at extrusion > 0.8 | - |
| Camera orbit X | `groupRef.rotation.x` | Continuous + scroll | Scrub + `sin(t*0.15)` wobble |
| Camera orbit Y | `groupRef.rotation.y` | Continuous + scroll + mouse | Scrub + mouse lerp |
| Colour shift (amber -> green) | `material.color.setHSL` | Continuous (extrusion-driven) | Linear lerp |

The extruding lattice uses a wave equation based on each node's distance
from centre, modulated by scroll progress:

```ts
const wave = Math.sin(t * 0.8 - dist * 0.4) * 0.5 + 0.5
const push = Math.exp(-((mx - mouse.x) ** 2 + (my - mouse.y) ** 2) * 2) * 0.6 * progress
const extrusion = wave * progress * (1 - dist / GRID_SIZE) * 2.5 + push
```

The mouse influence creates an exponential falloff field. Nodes within the
cursor's radius are pushed upward, creating the impression that the lattice
is a responsive surface rather than a static grid.

---

## Reduced Motion

The project respects `prefers-reduced-motion` at two levels:

1. **CSS level** (`globals.css`): Sets all animation-duration and
   transition-duration to 0.01 ms.
2. **JS level** (`useReducedMotion` hook): Both R3F scenes check this hook
   and bail out of their `useFrame` loops early, rendering the structured
   state instantly instead of animating.

```ts
// In particle-field.tsx:
if (reduced) {
  // Snap all particles to grid positions immediately
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    currentPositions[idx] = gridPositions[idx]
    // ...
  }
  return  // skip the animated loop entirely
}
```
