import type { Config } from 'tailwindcss'

/**
 * Base color palette — platform foundation.
 * Primary: blue, Secondary: purple.
 * Full tint scale: 50–950 for both.
 */
export const baseColors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },
  secondary: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
    950: '#3b0764',
  },
} satisfies Record<string, Record<string, string>>

/**
 * Base typography — Inter for body, Lexend for display/headings.
 */
export const baseTypography = {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  display: ['Lexend', 'system-ui', 'sans-serif'],
} satisfies Record<string, string[]>

/**
 * Base Tailwind preset — shared foundation for all themes.
 *
 * Usage in downstream preset or client tailwind.config.ts:
 *   presets: [basePreset]
 */
export const basePreset = {
  content: [],
  theme: {
    extend: {
      colors: baseColors,
      fontFamily: baseTypography,
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
} satisfies Config
