// Single source of truth for motion timing across the whole product.
// GSAP and Framer Motion take slightly different formats, so we define
// both from the same named curve to keep every section feeling consistent.

export const easings = {
  // Confident, calm settle — used for section-level reveals
  confident: {
    gsap: 'power3.out',
    framer: [0.16, 1, 0.3, 1] as const,
  },
  // Snappy, precise — used for micro-interactions (hover, tab switch)
  precise: {
    gsap: 'power2.out',
    framer: [0.25, 0.46, 0.45, 0.94] as const,
  },
  // Grid "snapping into structure" — slight overshoot, deliberate
  snap: {
    gsap: 'back.out(1.4)',
    framer: [0.34, 1.56, 0.64, 1] as const,
  },
} as const

export const durations = {
  instant: 0.15,
  fast: 0.3,
  base: 0.6,
  slow: 1.0,
  sceneTransition: 1.4,
} as const
