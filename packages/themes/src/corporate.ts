import type { Config } from 'tailwindcss'
import { basePreset } from './base'

/**
 * Corporate color palette — professional blue-gray + teal accent.
 */
const corporateColors = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },
  secondary: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
    950: '#042f2e',
  },
} satisfies Record<string, Record<string, string>>

/**
 * Corporate typography — Poppins for headings, Inter for body.
 */
const corporateTypography = {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  display: ['Poppins', 'system-ui', 'sans-serif'],
} satisfies Record<string, string[]>

/**
 * Corporate Tailwind preset — extends base with professional palette.
 *
 * Usage:
 *   import { corporatePreset } from '@spektra/themes'
 *   export default { presets: [corporatePreset] } satisfies Config
 */
export const corporatePreset = {
  presets: [basePreset],
  theme: {
    extend: {
      colors: corporateColors,
      fontFamily: corporateTypography,
    },
  },
  plugins: [],
} satisfies Partial<Config>
