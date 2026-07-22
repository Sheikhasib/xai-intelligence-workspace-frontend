import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
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
      },
      spacing: {
        '8': '8px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '48': '48px',
        '64': '64px',
        '96': '96px',
        '128': '128px',
      },
      fontFamily: {
        display: ['var(--font-geist)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      fontSize: {
        h1: ['64px', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '500' }],
        h2: ['40px', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '500' }],
        h3: ['24px', { lineHeight: '1.2', fontWeight: '500' }],
        body: ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.6', fontWeight: '400' }],
        label: ['11px', { lineHeight: '1.4', letterSpacing: '0.08em', fontWeight: '500' }],
        caption: ['12px', { lineHeight: '1.5', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
}
export default config
