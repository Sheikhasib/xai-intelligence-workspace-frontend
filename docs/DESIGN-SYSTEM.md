# Design System

## Colour

The palette is dark and restrained — it whispers before it speaks. Three layers of depth define every surface:

**Backgrounds** step down through three greys. Think of it like stepping into a dimly lit room: the page itself is the deepest shadow (`#0D1117`), surfaces like cards and the navbar are a half-step brighter (`#161B22`), and when you hover over something interactive, it glows one more shade lighter (`#1C2129`). No flatness, just subtle elevation.

**Text** follows the same logic. Primary copy (`#E6E8EB`) reads crisp against the dark — almost white, but softer on the eyes. Secondary text (`#8B949E`) pulls back into the background for labels and timestamps — present but not demanding attention.

**Two accent colours** do all the heavy lifting. Amber (`#FFB454`) is the star — it highlights the active nav item, fills bar charts, lights up grid nodes, and signals anything interactive. Green (`#3FB950`) plays support — it appears for completion states in the Insight Flow and as a secondary glow in the 3D scene. They never fight; amber leads, green follows.

**Borders** (`#21262D`) are just barely visible — a hairline of light against the dark that defines cards, separators, and dividers without shouting.

All raw colour values are duplicated in `lib/constants.ts` for Three.js, which can't read Tailwind classes.

---

## Typography

**Geist** handles everything the user reads — headlines, body copy, buttons, card text. It is crisp and modern without drawing attention to itself.

**JetBrains Mono** steps in for anything that feels like data — labels, stats, code snippets, the navbar brand. The switch between Geist and Mono creates a quiet signal: "this is a number, not a word." It gives the interface an engineering-tool feel without looking technical.

The type scale is deliberately shallow — seven sizes, each with a clear job:

- **64 px** is reserved for the hero headline — the only text that needs to command the full viewport.
- **40 px** anchors section titles. Big enough to lead, not so big they compete with the hero.
- **24 px** heads cards and panels — the workhorse heading.
- **16 px** is the default body size. Most text lives here.
- **14 px** pulls back slightly for supporting text (descriptions, metadata).
- **12 px** lives inside data tables — small but readable.
- **11 px** is for uppercase labels only. Tight letter-spacing at this size creates a subtle "instrument panel" look.

Within a single card, never use more than two of these sizes. The hierarchy should be obvious at a glance.

---

## Spacing

The grid is built on multiples of 8 — a rhythm that feels generous but never loose.

- **128 px** at the top and bottom of each section gives the content room to breathe against the viewport edges.
- Side padding starts at **24 px** on mobile and expands to **64 px** on desktop — a natural widening as screen space allows.
- Inside cards, **32 px** padding creates comfortable internal margins.
- Between cards in a grid, **16 px** gaps keep them close but distinct.
- Below a heading, **16 px** separates it from the next element. Above a label, **8 px** keeps it tight to its heading.

This spacing rhythm is the same whether you're writing Tailwind classes or setting Three.js positions — both read from `lib/constants.ts` and the `GRID_UNIT = 24` constant, ensuring the SVG background, particles, and 3D lattice all snap to the same invisible grid.

---

## Layout

Content widths narrow or widen depending on what the user needs to focus on:

- **Hero** stays contained at 768 px (`max-w-3xl`) — the headline and description are meant to be absorbed, not spread across the screen.
- **Insight Flow**, **Dashboard**, **Navbar**, and **Footer** all expand to 1152 px (`max-w-6xl`), giving multi-column layouts room to work.

The single breakpoint at 768 px (`md:`) toggles between stacked and side-by-side layouts. Below it, everything flows as a single column. Above it, the dashboard grid fans out into three columns — stats, chart, and table side by side — with the tabbed panel spanning the full width beneath.

---

## Borders & Depth

There are no shadows. Every surface is defined by a hairline border (`border-subtle`) — cards, panels, the navbar, tab underlines, sidebar dividers. This keeps the interface flat and honest: nothing pretends to float.

The one exception is the navbar, which adds `backdrop-blur-md` and a semi-transparent background (`bg-bg-surface/80`) so content slides smoothly beneath it. Even then, the border does the work of defining its edge.

When a card or panel is hovered, the background lifts by one shade to `bg-hover`. The transition is quick (300 ms) and subtle — a nudge, not a leap.

---

## Interactive States

**Buttons** come in two flavours:
- **Primary:** Outlined in amber, amber text. On hover, the amber fills in — background turns amber, text turns dark. It feels like pressing a physical switch.
- **Ghost:** Barely there — secondary text. On hover, it brightens to primary text. No background, no border. For dismissible or secondary actions.

**Navigation** in the navbar tracks which section is visible. Inactive links are secondary text. The active link glows amber and adds a small amber dot below. Hovering any link brightens it to primary text.

**Dashboard sidebar links** follow a similar pattern but with a background fill — inactive has none, active gets an amber tint (`bg-accent-signal/5`), hover gets the standard surface lift (`bg-hover`).

**Dashboard panels** sit at `bg-surface` by default and lift to `bg-hover` on hover — the same two-step surface elevation used everywhere.

---

## Accessibility

- All text maintains at least 4.5:1 contrast against its background (AA pass).
- Every interactive element has a visible browser-default focus ring.
- `prefers-reduced-motion` is respected at both the CSS and JavaScript level — animations reduce or stop entirely.
- Decorative elements like `GridBackground` carry `aria-hidden="true"` so screen readers ignore them.
- Every interactive element is a native `<button>` — keyboard navigation works without extra effort.