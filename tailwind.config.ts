import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        text: 'var(--color-text)',
        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',
        gold: 'var(--color-gold)',
        secondary: 'var(--color-secondary)',
        muted: 'var(--color-muted)',
        surface: 'var(--color-surface)',
        bg: 'var(--color-bg)',
        yellow: 'var(--color-yellow)'
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '3rem',
          xl: '4rem'
        }
      }
    }
  },
  plugins: [
    function({ addUtilities }: {addUtilities: any}) {
      const newUtilities = {
        '.line-clamp-2': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '2',
        },
        '.line-clamp-3': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '3',
        }
      }
      addUtilities(newUtilities)
    }
  ]
};

export default config; 