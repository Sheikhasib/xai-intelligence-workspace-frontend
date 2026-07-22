# Xai — Intelligence Workspace

A single-page interactive product experience visualizing how Xai turns raw
data into structured intelligence and actionable insight.

## Project Overview

The core narrative — *raw data → structured intelligence → actionable
insight → automation* — is expressed through one continuous visual device:
a coordinate lattice that starts scattered (Hero) and progressively snaps
into structure across the page, culminating in a 3D extrusion in the
Signature Interaction. Rather than four disconnected animations, every
section reads the same `structure` / scroll-progress value, so the
transformation feels like one system.

## Tech Stack

- **Next.js 15** (App Router)
- **Tailwind CSS** — design tokens (color, type, spacing) generated directly
  from the accompanying Figma file, so code and design stay in sync
- **Framer Motion** — component-level choreography (entrances, hover states,
  tab transitions)
- **GSAP** — reserved for advanced scroll timelines as the interaction
  design is extended (see `lib/animation`)
- **Three.js / React Three Fiber** — the Hero particle field and the
  Signature Interaction's extruding lattice

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Animation & Interaction Decisions

- **Grid as narrative device, not decoration**: `components/ui/GridBackground.tsx`
  takes a single `structure` prop (0–1) that every section derives from
  scroll position. This is the one idea the whole page is built around —
  nodes drift loosely in the Hero and snap into an exact lattice by the
  Dashboard section.
- **Clean animation boundary**: GSAP/scroll-driven logic owns page-level
  narrative (the transformation itself); Framer Motion owns component-level
  interactions (hover, tab switches, card entrances). See
  `lib/animation/useScrollProgress.ts` and `lib/animation/easings.ts` for
  the shared primitives every section pulls from — this is what keeps four
  sections feeling like one product instead of four demos.
- **Signature Interaction**: an extruding 3D lattice (React Three Fiber)
  paired with a live mono-font coordinate readout (`NODES / CLUSTERS`) —
  ties the 3D moment back to the data narrative rather than being a
  generic "3D thing that reacts to scroll."
- **Accessibility**: `prefers-reduced-motion` is respected globally
  (`app/globals.css`); all interactive elements retain visible focus states
  via default Tailwind/browser behavior.

*A short video walkthrough of these decisions: [link to be added].*

## Live Deployment

*[Vercel/Netlify link to be added]*

## Figma

*[Public Figma file link to be added]*
