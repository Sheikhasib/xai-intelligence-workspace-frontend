# Getting Started

## Prerequisites

- **Node.js 18+** (the project uses Next.js 15, which requires Node 18.17
  or later)
- **npm 9+** (or your preferred package manager - pnpm, yarn)

Verify your versions:

```bash
node --version   # v18.17+
npm --version    # 9+
```

---

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd xai-intelligence-workspace

# Install dependencies
npm install
```

This installs:

| Dependency | Version | Purpose |
|-----------|---------|---------|
| `next` | ^15.0.3 | Framework |
| `react` / `react-dom` | ^19.0.0 | UI library |
| `framer-motion` | ^11.11.17 | Component animations |
| `gsap` | ^3.12.5 | Scroll-driven animations |
| `three` / `@react-three/fiber` / `@react-three/drei` | ^0.170.0 / ^9.1.0 / ^10.0.0 | 3D rendering |
| `geist` | ^1.3.1 | Typeface (self-hosted) |
| `tailwindcss` | ^3.4.14 | Utility CSS |
| `typescript` | ^5.6.3 | Type checking |

---

## Development

```bash
npm run dev
```

Opens [http://localhost:3000](http://localhost:3000). The app supports
hot module replacement - edits to `app/`, `components/`, or `lib/` are
reflected instantly.

### What to expect

When you open the page, you will see:

1. **Hero section** - A dark canvas with floating particles that slowly
   transition from a chaotic scatter into an organised grid as you scroll
   down.
2. **Insight Flow** - A pinned section that takes over the scroll for
   three viewport heights. An SVG visualisation morphs through three
   states (scatter -> clusters -> grid) while three stage cards highlight
   in sequence.
3. **Dashboard Preview** - A mock product dashboard with a sidebar, bar
   chart, data table, and tabbed panels - all with staggered entrance
   animations.
4. **Signature Interaction** - A 14x14 3D lattice that extrudes upward in
   a wave pattern. Move your mouse to influence the nodes near the cursor.

---

## Production Build

```bash
npm run build
```

Compiles the application, runs TypeScript type checking, and outputs a
production-optimised build to `.next/`. The build output shows:

```
Route (app)             Size    First Load JS
+ o /                   318 kB         420 kB
+ o /_not-found         127 B         102 kB
```

### Optimisations applied

- **Tree shaking** - Unused Three.js features are removed
- **Dynamic imports** - Both R3F canvases are split into separate chunks
  (~200 kB each) and loaded only when scrolled near
- **Static generation** - The single page is pre-rendered at build time
- **Compression** - Next.js applies gzip/brotli compression to all assets

---

## Deployment

### Deploy to Vercel (recommended)

```bash
npm i -g vercel
vercel
```

Follow the CLI prompts. The project is pre-configured for Vercel with
zero-config deployment.

### Deploy to Netlify

1. Push the repository to GitHub/GitLab
2. In Netlify, import the project
3. Enable the **Next.js on Netlify** plugin (auto-detected)
4. Set build command to `npm run build`
5. Leave publish directory empty (the plugin handles it)

---

## Scripts Reference

| Command | Action |
|---------|--------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server (after build) |
| `npm run lint` | Run ESLint |

---

## Project Tour for New Developers

### If you want to understand the animation system

Start here:

```
lib/animation/easings.ts          <- All curves + durations
lib/animation/useScrollProgress.ts <- Core scroll hook
components/ui/grid-background.tsx  <- The unifying visual device
```

Then read each section's animation in detail:

```
docs/ANIMATION.md
```

### If you want to modify a section

Each section is self-contained in its own directory:

```
components/sections/hero/                <- Three.js particles
components/sections/insight-flow/        <- GSAP pin + SVG morph
components/sections/dashboard-preview/   <- Framer Motion UI
components/sections/signature-interaction/ <- 3D lattice
```

### If you want to change the design system

All design tokens live in two parallel locations:

```
tailwind.config.ts   <- Tailwind classes use these
lib/constants.ts     <- Three.js code imports these
```

Keep them in sync - if you update one, update the other.

### If you want to add a new section

1. Create `components/sections/<name>/<name>.tsx`
2. Use `useScrollProgress` for scroll-driven state
3. Add the section to `app/page.tsx` (with an `id` for the navbar)
4. Add the section `id` to `lib/useActiveSection.ts`

---

## Common Tasks

### Adjusting animation timing

Edit `lib/animation/easings.ts`:

```ts
export const durations = {
  instant: 0.15,
  fast: 0.3,
  base: 0.6,        // <- Change this
  slow: 1.0,
  sceneTransition: 1.4,
}
```

### Changing the colour palette

Edit both `tailwind.config.ts` and `lib/constants.ts`:

```ts
// In tailwind.config.ts:
accent: { signal: '#FFB454', success: '#3FB950' }

// In lib/constants.ts:
export const colors = {
  accent: { signal: '#FFB454', success: '#3FB950' }
}
```

### Adding a new stage to Insight Flow

1. Add the stage definition to the `stages` array in `insight-flow.tsx`
2. The stage cards render automatically from this array
3. Update the `positionSets` in `data-morph.tsx` if the visual needs to
   change

### Adding a new Three.js scene

1. Create a new component in `components/sections/<name>/`
2. Wrap it in a `<Canvas>` from `@react-three/fiber`
3. Use `next/dynamic` with `ssr: false` for lazy loading
4. Add `useReducedMotion()` to respect accessibility settings
