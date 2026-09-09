import type { Config } from 'tailwindcss'

/**
 * Gilt — the binding design system. See CLAUDE.md.
 * Tokens only. A value that is not here does not belong on the page.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    // Default palette deleted on purpose: a stray `bg-slate-200` must fail loudly.
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      ground: '#0A0908',
      surface: '#131110',
      sunken: '#060505',
      line: { DEFAULT: '#2A2521', soft: '#1F1B18', gold: 'rgba(201,162,39,.35)' },
      ink: '#F6F1E8',
      body: '#B0A79A',
      muted: '#877D71',
      accent: {
        DEFAULT: '#C9A227',
        hover: '#D8B43F',
        wash: 'rgba(201,162,39,.12)',
        on: '#14110B',
      },
    },
    fontSize: {
      micro: ['10px', { lineHeight: '1.2', letterSpacing: '0.26em' }],
      label: ['11px', { lineHeight: '1.2', letterSpacing: '0.22em' }],
      caption: ['13px', { lineHeight: '1.5' }],
      s: ['14.5px', { lineHeight: '1.6' }],
      base: ['16.5px', { lineHeight: '1.65' }],
      l: ['18px', { lineHeight: '1.65' }],
      h4: ['19px', { lineHeight: '1.4' }],
      h3: ['24px', { lineHeight: '1.3' }],
      h2: ['40px', { lineHeight: '1.12', letterSpacing: '-0.008em' }],
      'display-l': ['52px', { lineHeight: '1.06', letterSpacing: '-0.010em' }],
      'display-xl': ['72px', { lineHeight: '1.04', letterSpacing: '-0.012em' }],
      // mobile steps of the display scale
      'h2-m': ['30px', { lineHeight: '1.12', letterSpacing: '-0.008em' }],
      'h3-m': ['21px', { lineHeight: '1.3' }],
      'display-l-m': ['38px', { lineHeight: '1.06', letterSpacing: '-0.010em' }],
      'display-xl-m': ['44px', { lineHeight: '1.04', letterSpacing: '-0.012em' }],
    },
    screens: { sm: '480px', md: '768px', lg: '1024px', xl: '1280px' },
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', '"Times New Roman"', 'serif'],
        sans: [
          'var(--font-sans)',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      spacing: {
        tight: '12px',
        flow: '24px',
        'flow-m': '20px',
        card: '28px',
        'card-m': '22px',
        block: '56px',
        'block-m': '36px',
        section: '128px',
        'section-m': '80px',
        gutter: '24px',
        'gutter-m': '16px',
      },
      maxWidth: { page: '1120px', structure: '1040px', text: '720px', narrow: '520px' },
      borderRadius: { DEFAULT: '4px', badge: '2px', panel: '6px', none: '0' },
      boxShadow: {
        card: 'inset 0 1px 0 rgba(246,241,232,.05)',
        panel: '0 24px 60px -30px #000',
      },
      transitionTimingFunction: { ui: 'cubic-bezier(.2,.6,.2,1)' },
      transitionDuration: { ui: '160ms', 'ui-slow': '240ms' },
    },
  },
  plugins: [],
}
export default config
