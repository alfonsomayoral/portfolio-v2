import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0A0A0B',
          elevated: '#131316',
          subtle: '#16171a',
        },
        border: {
          DEFAULT: '#27272a',
          strong: '#3f3f46',
        },
        fg: {
          DEFAULT: '#fafafa',
          secondary: '#a1a1aa',
          muted: '#71717a',
        },
        accent: {
          DEFAULT: '#10B981',
          hover: '#34D399',
          muted: '#059669',
          subtle: 'rgba(16, 185, 129, 0.12)',
        },
      },
      fontFamily: {
        sans: ['var(--font-urbanist)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
        hud: ['var(--font-space-mono)', 'var(--font-jetbrains)', 'monospace'],
      },
      maxWidth: {
        content: '72rem',
        narrow: '48rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.33, 1, 0.68, 1)',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
