// Mirrors tailwind.config.ts color tokens. Three.js/canvas contexts need raw
// values (can't apply Tailwind classes to WebGL materials), so this is the
// single place both worlds pull from — keeps the palette from drifting.

export const colors = {
  bg: {
    base: '#0D1117',
    surface: '#161B22',
    hover: '#1C2129',
  },
  text: {
    primary: '#E6E8EB',
    secondary: '#8B949E',
  },
  accent: {
    signal: '#FFB454',
    success: '#3FB950',
  },
  border: {
    subtle: '#21262D',
  },
} as const

export const spacing = {
  8: 8, 16: 16, 24: 24, 32: 32, 48: 48, 64: 64, 96: 96, 128: 128,
} as const

// Shared grid unit for the lattice background — referenced by GridBackground,
// the Hero particle field, and the Signature Interaction so they all snap
// to the same underlying structure.
export const GRID_UNIT = 24
