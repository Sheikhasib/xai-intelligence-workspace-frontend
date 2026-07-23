# Component Reference

## Directory Structure

```
components/
+-- sections/
|   +-- hero/
|   |   +-- hero.tsx              Section wrapper + layout
|   |   +-- particle-field.tsx    R3F 800-particle system
|   |   +-- scroll-indicator.tsx  Pulsing "Scroll to structure" label
|   |
|   +-- insight-flow/
|   |   +-- insight-flow.tsx      GSAP-pinned section with 3 stages
|   |   +-- data-morph.tsx        SVG particles that interpolate across 3 states
|   |   +-- stage-content.tsx     Stage card with index badge + description
|   |   +-- useInsightProgress.ts Hook returning progress + active stage
|   |
|   +-- dashboard-preview/
|   |   +-- dashboard-preview.tsx Section wrapper with tab state
|   |   +-- sidebar.tsx           Navigation sidebar with 5 items
|   |   +-- panel.tsx             Panel shell + TabbedPanel component
|   |   +-- bar-chart.tsx         SVG bar chart with hover values
|   |   +-- data-table.tsx        Stagger-animated cluster data table
|   |   +-- animated-stat.tsx     Count-up number with entrance animation
|   |
|   +-- signature-interaction/
|       +-- signature-interaction.tsx  Section wrapper + R3F Canvas
|       +-- extruding-lattice.tsx      14x14 node grid with glow rings
|
+-- ui/
    +-- navbar.tsx              Floating glassmorphism navigation
    +-- footer.tsx              Minimal footer
    +-- grid-background.tsx     SVG lattice with structure prop
    +-- button.tsx              Primary + ghost button variants
```

---

## Section Components

### Hero

```tsx
<Hero />
```

Wraps `ParticleField` (dynamically imported, `ssr: false`) and text
content within a 150 vh sticky container. Scroll progress is tracked
by `useScrollProgress`.

**State management:** None (stateless). The `progress` value from
`useScrollProgress` is passed to `ParticleField` every render.

---

### InsightFlow

```tsx
<InsightFlow />
```

Registers a GSAP `ScrollTrigger` that pins the section for 300 % of the
viewport height. The `useInsightProgress` hook derives both a continuous
`progress` (0 -> 1) and a discrete `activeStage` from scroll position.

**State:** `activeStage` - one of `'ingest' | 'analyze' | 'generate'`.

The `DataMorph` SVG receives the continuous `progress` value and
interpolates its 48 particles through three state configurations.

---

### DashboardPreview

```tsx
<DashboardPreview />
```

Contains `Sidebar` and a 3-column grid of panels. Tab state is managed
locally via `useState('overview')`.

**State:** `activeTab` - string matching one of the tab definitions.

| Tab | Panel type | Description |
|-----|-----------|-------------|
| `overview` | `chart` | Bar chart |
| `clusters` | `table` | Data table |
| `metrics` | `stats-group` | 4 animated stat cards |

---

### SignatureInteraction

```tsx
<SignatureInteraction />
```

Wraps `ExtrudingLattice` (dynamically imported, `ssr: false`) within a
130 vh sticky container. A `useScrollProgress` hook drives the extrusion
amount and the live cluster count readout.

**State:** None (stateless beyond the derived `clusters` value).

---

## UI Components

### Navbar

```tsx
<Navbar />
```

Floating glassmorphism navigation bar. Uses `useActiveSection` (an
`IntersectionObserver`-based hook) to determine which section is currently
in view and highlights the corresponding link. Fixed at `top-8 left-8
right-8` with `max-w-6xl` centering.

| Link | Target section |
|------|---------------|
| Data | `#hero` |
| Insight | `#insight-flow` |
| Dashboard | `#dashboard` |
| Intelligence | `#signature` |

### GridBackground

```tsx
<GridBackground structure={0.5} className="..." />
```

Decorative full-viewport SVG lattice. The `structure` prop (0 -> 1)
controls:

- Grid line opacity: `0.08 + structure * 0.12`
- Node position jitter: jitter amount x `(1 - structure)`
- Node radius: `1.5` -> `2.0` at structure > 0.7
- Node colour: `text-secondary` -> `accent-signal` at structure > 0.7
- Node opacity: `0.15 + structure * 0.25`

### Button

```tsx
<Button variant="primary" onClick={...}>Label</Button>
<Button variant="ghost">Ghost</Button>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' | 'ghost'` | `'primary'` | Visual style |
| `className` | `string` | - | Additional classes |
| All native `<button>` props | - | - | Passed through |

| Variant | Default | Hover |
|---------|---------|-------|
| `primary` | Amber border, amber text | Amber fill, dark text |
| `ghost` | Secondary text | Primary text |

### Footer

```tsx
<Footer />
```

Minimal footer with brand name and tagline. Responsive: stacks vertically
on mobile, side-by-side on desktop.

---

## Shared Hooks

### useScrollProgress

```ts
const { ref, progress } = useScrollProgress<HTMLElement>()
```

Attach `ref` to an element. `progress` returns 0 when the element's top
enters the viewport bottom, and 1 when its bottom exits the viewport top.

Used by: `Hero`, `DashboardPreview`, `SignatureInteraction`.

### useInsightProgress

```ts
const { progress, activeStage } = useInsightProgress(sectionRef)
```

A specialised version of `useScrollProgress` for the Insight Flow section.
Accounts for the 300 % pinned scroll distance. Returns both a continuous
`progress` (0 -> 1) and the current `activeStage` string.

Used by: `InsightFlow`.

### useActiveSection

```ts
const active = useActiveSection()
```

Uses `IntersectionObserver` with `threshold: 0.3` and
`rootMargin: '-80px 0px 0px 0px'` (accounting for the navbar height) to
determine which section is currently in view.

Used by: `Navbar`.

### useReducedMotion

```ts
const reduced = useReducedMotion()
```

Returns `true` if the user has requested reduced motion via their OS or
browser settings. Uses `matchMedia('(prefers-reduced-motion: reduce)')`.

Used by: `ParticleField`, `ExtrudingLattice`.

---

## Data Flow Between Hooks and Components

```
useActiveSection ----> Navbar (highlights active link)

useScrollProgress ----> Hero (drives particle morph)
                  ----> DashboardPreview (drives grid structure)
                  ----> SignatureInteraction (drives extrusion)

useInsightProgress ----> DataMorph (drives SVG particle positions)
                    ----> StageContent x 3 (drives visibility)

useReducedMotion ----> ParticleField (bails out of animate loop)
                 ----> ExtrudingLattice (bails out of animate loop)
```
