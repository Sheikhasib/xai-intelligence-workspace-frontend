# Design System

## Colour

The palette is dark, restrained, and technically confident. Four colour
roles are used throughout:

```
Base    bg-base    #0D1117   ########  Page background
Surface bg-surface #161B22   ########  Cards, panels, navbar
Hover   bg-hover   #1C2129   ########  Hover states for interactive elements

Primary  text-primary   #E6E8EB  ########  Headlines, body copy
Secondary text-secondary #8B949E ########  Labels, supporting text

Signal   accent-signal #FFB454  ########  Amber - primary accent, interactive states
Success  accent-success #3FB950  ########  Green - completion, positive states

Subtle  border-subtle #21262D  ########  Borders, dividers, separators
```

### Usage rules

- **Signal amber** is the primary accent. It is used for the active
  navigation item, the grid node highlights, the bar chart fill, the
  extruding lattice colour, and all interactive hover states.
- **Success green** is secondary. It is used for "complete" states in the
  Insight Flow and as a secondary light source in the Signature
  Interaction. It never competes with amber.
- **Text secondary** on `bg-base` has a contrast ratio of 5.4:1 (passes
  AA at all sizes). Text primary on `bg-base` is 12.8:1.
- The raw colour values are exported from `lib/constants.ts` and imported
  directly by Three.js code - Tailwind classes cannot be used in WebGL
  contexts.

---

## Typography

### Fonts

| Role | Font | Weight | Source |
|------|------|--------|--------|
| UI / Display | **Geist** | 400, 500 | `geist` npm package (self-hosted) |
| Code / Labels | **JetBrains Mono** | 400, 500 | Google Fonts |

### Type Scale

| Token | Size | Line Height | Letter Spacing | Weight | Used for |
|-------|------|-------------|----------------|--------|----------|
| `text-h1` | 64 px | 1.05 | -0.02 em | 500 | Hero headline |
| `text-h2` | 40 px | 1.1 | -0.01 em | 500 | Section titles |
| `text-h3` | 24 px | 1.2 | - | 500 | Card headings |
| `text-body` | 16 px | 1.6 | - | 400 | Body copy |
| `text-body-sm` | 14 px | 1.6 | - | 400 | Supporting text |
| `text-label` | 11 px | 1.4 | 0.08 em | 500 | Uppercase labels |
| `text-caption` | 12 px | 1.5 | - | 400 | Data table cells |

### Usage rules

- **Display** (Geist) is used for all UI text - headlines, body copy,
  buttons, cards.
- **Mono** (JetBrains Mono) is used for labels, data values, stat
  readouts, and the navbar brand. This creates a subtle "engineering
  tool" register.
- Never mix more than two font sizes within a single card or panel.

---

## Spacing

All spacing values are defined in pixels and exposed as both Tailwind
utilities and raw values in `lib/constants.ts`.

| Token | Value |
|-------|-------|
| `spacing-8` | 8 px |
| `spacing-16` | 16 px |
| `spacing-24` | 24 px |
| `spacing-32` | 32 px |
| `spacing-48` | 48 px |
| `spacing-64` | 64 px |
| `spacing-96` | 96 px |
| `spacing-128` | 128 px |

### Spacing rhythm

```
Section padding top/bottom: 128 px (py-128)
Section padding sides:       24 px on mobile -> 64 px on desktop (px-24 md:px-64)
Card padding:                32 px (p-32)
Card gap (dashboard grid):   16 px (gap-16)
Text-to-next-element gap:    16 px (mt-16)
Label-to-heading gap:        8 px (mt-8)
```

---

## Grid Unit

A shared constant `GRID_UNIT = 24` is used by both the SVG
`GridBackground` and the particle field to ensure they snap to the same
underlying lattice. The SVG grid lines are spaced at `GRID_UNIT * 2 = 48`
pixel intervals.

---

## Layout

### Max widths

| Context | Value |
|---------|-------|
| Hero content | `max-w-3xl` (768 px) |
| Insight Flow content | `max-w-6xl` (1152 px) |
| Dashboard content | `max-w-6xl` (1152 px) |
| Navbar | `max-w-6xl` (centred) |
| Footer | `max-w-6xl` (centred) |

### Breakpoints

| Prefix | Width | Behaviour |
|--------|-------|-----------|
| _(default)_ | < 768 px | Single column, stacked layout |
| `md:` | >= 768 px | Multi-column, side-by-side |

### Dashboard grid

```
Mobile:  1 column --> 3 stacked panels + tabbed panel below
Desktop: 3 columns --> grid-cols-3  (stat | chart | table)
                           tabbed panel spans all 3
```

---

## Shadows & Borders

The design uses borders rather than box-shadows. This is intentional:

| Use | Style |
|-----|-------|
| Cards & panels | `border border-border-subtle` |
| Navbar | `border border-border-subtle` with `bg-bg-surface/80` + `backdrop-blur-md` |
| Dashboard separator | `border-r border-border-subtle` (sidebar divider) |
| Tab underline | `border-b border-border-subtle` |
| Hover state (cards) | `hover:bg-bg-hover` + `transition-colors duration-300` |

---

## Interactive States

### Buttons

| Variant | Default | Hover |
|---------|---------|-------|
| `primary` | Amber border, amber text | Amber fill, dark text |
| `ghost` | Secondary text | Primary text |

### Navigation

| State | Style |
|-------|-------|
| Inactive | `text-text-secondary` |
| Active | `text-text-primary` + amber underline dot |
| Hover | `text-text-primary` |

### Dashboard sidebar links

| State | Style |
|-------|-------|
| Inactive | `text-text-secondary`, no background |
| Active | `text-accent-signal`, `bg-accent-signal/5` background |
| Hover | `text-text-primary`, `bg-bg-hover` background |

### Dashboard panels

| State | Style |
|-------|-------|
| Default | `bg-bg-surface`, `border-border-subtle` |
| Hover | `bg-bg-hover` |

---

## Icons

The project uses **Lucide React** for all icons. SVG icons from a single
set ensure consistent stroke widths, viewBox dimensions, and visual
weight. Emojis are never used as UI icons.

The sidebar uses geometric Unicode characters for secondary
navigation markers - these are decorative indicators, not primary icons.

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Colour contrast | Minimum 4.5:1 for normal text (verified) |
| Focus states | Browser default (visible on all interactive elements) |
| Reduced motion | `prefers-reduced-motion` respected at CSS + JS level |
| Decorative graphics | `aria-hidden="true"` on `GridBackground` |
| Alt text | _(added as images are introduced)_ |
| Keyboard navigation | Native `<button>` elements throughout |
