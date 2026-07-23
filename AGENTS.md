# Agents.md — Xai Intelligence Workspace

## Commands

```bash
npm run dev      # next dev
npm run build    # next build (build before commit)
npm run lint     # eslint (no typecheck or test scripts configured)
```

No typecheck, test, or formatter scripts exist. Run `npx tsc --noEmit` manually for type-checking.

## Architecture

- **Next.js 15 App Router**, single page at `app/page.tsx`.
- **4 sections** (rendered sequentially): `Hero`, `InsightFlow`, `DashboardPreview`, `SignatureInteraction`.
- **Central narrative**: `GridBackground` (`components/ui/grid-background.tsx`) receives a `structure` prop (0–1) from scroll progress — every section derives this from `lib/animation/useScrollProgress.ts`. This is the unifying device.
- **Animation boundary**: GSAP/scroll owns page-level narrative (the transformation); Framer Motion owns component-level interactions (hover, tabs, entrances). See `lib/animation/easings.ts` for shared curves.
- **`@/`** path alias maps to root (tsconfig.json).

## Design system

Custom Tailwind color/typography tokens in `tailwind.config.ts`:

- Background: `bg-base` (#0D1117), `bg-surface`, `bg-hover`
- Text: `text-primary`, `text-secondary`
- Accent: `accent-signal` (amber), `accent-success` (green)
- Border: `border-subtle`
- Type: `display` (Geist), `mono` (JetBrains Mono), custom sizes `h1`–`caption`, `label` (11px uppercase)
- Spacing: `8`–`128` in px

Raw color/spacing values re-exported in `lib/constants.ts` for Three.js/canvas contexts (cannot use Tailwind classes in WebGL).

## Key files

| Path                                 | Purpose                                                               |
| ------------------------------------ | --------------------------------------------------------------------- |
| `lib/animation/useScrollProgress.ts` | Shared scroll hook (0→1) for all sections                             |
| `lib/animation/easings.ts`           | Named easings (`confident`, `precise`, `snap`) for both GSAP + Framer |
| `lib/constants.ts`                   | Color palette, spacing, `GRID_UNIT` (24px)                            |
| `lib/utils.ts`                       | `cn()` utility (clsx + tailwind-merge)                                |
| `components/ui/grid-background.tsx`  | SVG lattice with `structure` prop                                     |
| `components/ui/button.tsx`           | Two variants: `primary` (outlined amber) and `ghost`                  |
| `app/globals.css`                    | Tailwind directives, prefers-reduced-motion reset                     |

## Project conventions

- Dark theme. All interactive elements get visible focus states (browser default, no custom focus ring).
- `prefers-reduced-motion` respected globally (`globals.css`).
- `reactStrictMode: true` in `next.config.ts`.
- No tests, no test framework, no CI workflow configured.
- `.opencode/` directory holds OpenCode agents, skills, commands, and specs.
