import { starterPreset } from '@spektra/themes'
import type { Config } from 'tailwindcss'

export default {
  presets: [starterPreset],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    '../../packages/components/src/**/*.{ts,tsx}',
    '../../packages/templates/src/**/*.{ts,tsx}',
  ],
} satisfies Config
