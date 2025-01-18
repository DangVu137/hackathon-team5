import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'
import borderRadiusConfig from './base/borderRadius'
import colorConfig from './base/color'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
    '../../packages/screens/src/**/*.{ts,tsx}',
    '../../packages/plugins/**/*.{ts,tsx}',
    '../../packages/plugin-sdk/src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    fontFamily: {},
    extend: {
      borderRadius: {
        ...borderRadiusConfig,
      },
      colors: {
        ...colorConfig,
      },
      gridTemplateColumns: {
        autoFill: 'repeat(auto-fill, minmax(300px, 1fr))',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-15deg)' },
          '50%': { transform: 'rotate(15deg)' },
        },
        heartBeat: {
          '0%': { transform: 'scale(1);' },
          '14%': { transform: 'scale(1.01);' },
          '28%': { transform: 'scale(1);' },
          '42%': { transform: 'scale(1.01);' },
          '70%': { transform: 'scale(1);' },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        heartBeat: 'heartBeat 1s infinite',
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config

export default config
