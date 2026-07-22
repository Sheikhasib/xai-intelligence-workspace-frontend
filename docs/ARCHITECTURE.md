# Architecture

## Overview

Xai is a single-page application built with Next.js 15 (App Router). The
page is divided into four sequentially rendered sections, each representing
a stage in the data-to-intelligence pipeline:

```
+--------------------------------------------------+
|                    Navbar                         |
+--------------------------------------------------+
|                                                  |
|  1. Hero                                         |
|     Data -> Intelligence                          |
|     (800 particles, R3F, scroll-driven morph)    |
|                                                  |
+--------------------------------------------------+
|                                                  |
|  2. Insight Flow                                 |
|     Ingestion -> Analysis -> Generation            |
|     (GSAP pinned section, SVG morph, 3 stages)   |
|                                                  |
+--------------------------------------------------+
|                                                  |
|  3. Dashboard Preview                            |
|     Product UI with sidebar, charts, tabs        |
|     (Framer Motion entrances, AnimatePresence)   |
|                                                  |
+--------------------------------------------------+
|                                                  |
|  4. Signature Interaction                        |
|     14x14 extruding 3D lattice                   |
|     (R3F, mouse influence, glow rings)           |
|                                                  |
+--------------------------------------------------+
|                    Footer                         |
+--------------------------------------------------+
```

Every section reads the same `structure` value (0 -> 1) from scroll
progress. The central `GridBackground` SVG lattice tightens its nodes as
this value increases, visually unifying all four sections into one
continuous transformation.

---

## The Unifying Device: `GridBackground`

The component at `components/ui/grid-background.tsx` is a full-viewport SVG
lattice that interpolates between two states:

| structure | Grid lines | Nodes | Behaviour |
|-----------|------------|-------|-----------|
| 0 | Faint, low opacity | Positioned with jitter, small radius, gray | "Raw data" - chaotic, sparse |
| 1 | Visible, higher opacity | Snapped to exact positions, larger radius, amber | "Structured intelligence" - organised, signal-coloured |

Each section passes its own `structure` value derived from scroll progress:

| Section | structure range |
|---------|----------------|
| Hero | `progress` (0 -> 0.3) |
| Insight Flow | `0.5 + (stageIndex / 3) * 0.4` |
| Dashboard | `0.85 + progress * 0.15` |
| Signature | _(not used - the 3D scene replaces the 2D grid)_ |

---

## Animation Layers

The project separates concerns across three distinct animation tools:

```
+----------------------------------------------------+
|  GSAP + ScrollTrigger                              |
|  -------------------                               |
|  Owns page-level narrative.                        |
|  - Insight Flow section pinning (300% scroll)      |
|  - Scroll-driven scrub timelines                   |
|  - The "one transformation" feeling                |
+----------------------------------------------------+
|  Framer Motion                                     |
|  -----------------                                  |
|  Owns component-level choreography.                |
|  - Entrance animations (whileInView)               |
|  - Hover states and micro-interactions             |
|  - Tab transitions (AnimatePresence)               |
|  - Stage card reveals                              |
+----------------------------------------------------+
|  Three.js / React Three Fiber                      |
|  ------------------------                          |
|  Owns all 3D and WebGL content.                    |
|  - Hero particle field (800 points)                |
|  - Extruding lattice in Signature Interaction      |
|  - Connector lines (THREE.LineSegments)            |
+----------------------------------------------------+
```

Shared easing curves and durations in `lib/animation/easings.ts` ensure
every animation - regardless of which tool drives it - feels like it
belongs to the same product.

---

## Data Flow

The application has no backend. All data is either:

- **Static:** Dashboard chart values, table rows, stage descriptions
- **Derived from scroll:** Particle positions, grid structure, stage
  visibility, lattice extrusion, camera rotation
- **Derived from user input:** Active sidebar nav item, selected tab,
  mouse position (for 3D influence)

```
Scroll Position
       |
       v
useScrollProgress ------> Hero ParticleField
       |                      |
       |                      v
       |               structure prop
       |                      |
       +----------------------+----> GridBackground (SVG lattice)
       |                      |
       v                      v
  useInsightProgress     InsightFlow
       |                      |
       v                      v
  ActiveStage            DataMorph SVG
       |                      |
       v                      v
  StageContent            Particle positions
  (card UI)              (interpolated)
```

---

## Component Tree

```
<RootLayout>
  +-- <main>
      +-- <Navbar>
      |   +-- useActiveSection (IntersectionObserver)
      |
      +-- <Hero>
      |   +-- <ParticleField>              (R3F, dynamic import)
      |   |   +-- <Particles>
      |   |       +-- <points>             800 particles
      |   |       +-- <primitive>          LineSegments
      |   +-- <ScrollIndicator>
      |
      +-- <InsightFlow>
      |   +-- <GridBackground>
      |   +-- <DataMorph>                  SVG, 48 particles
      |   +-- <StageContent> x 3
      |
      +-- <DashboardPreview>
      |   +-- <GridBackground>
      |   +-- <Sidebar>
      |   +-- <Panel> x 3
      |   |   +-- <AnimatedStat>
      |   |   +-- <BarChart>               SVG
      |   |   +-- <DataTable>
      |   +-- <TabbedPanel>
      |
      +-- <SignatureInteraction>
      |   +-- <ExtrudingLattice>           (R3F, dynamic import)
      |
      +-- <Footer>
```

---

## Performance Considerations

| Technique | Where | Benefit |
|-----------|-------|---------|
| Dynamic imports with `ssr: false` | `ParticleField`, `ExtrudingLattice` | Removes Three.js from initial bundle (saves ~200 kB) |
| Float32Array instead of arrays | Particle positions, line vertices | Better cache locality, no GC pressure per frame |
| `useMemo` for geometry | DataMorph particles, line pairs | Prevents recomputation on every render |
| `prefers-reduced-motion` | `globals.css`, both R3F scenes | Disables all animation at both CSS and JS level |
| `dpr={[1, 1.5]}` | Both `<Canvas>` elements | Caps pixel ratio on retina devices to save GPU |
| Passive scroll listeners | All scroll hooks | Never blocks the compositor thread |

---

## Key Files

| Path | Role |
|------|------|
| `app/page.tsx` | Composes the four sections |
| `app/layout.tsx` | Root layout, font loading |
| `lib/animation/useScrollProgress.ts` | Shared scroll hook (0 -> 1) |
| `lib/animation/easings.ts` | Named curves + durations |
| `lib/constants.ts` | Colour palette, spacing, `GRID_UNIT` |
| `lib/useReducedMotion.ts` | `prefers-reduced-motion` hook |
| `components/ui/grid-background.tsx` | SVG lattice (the unifying device) |
