import { starterPreset } from '@spektra/themes'
import type { Config } from 'tailwindcss'

export default {
  presets: [starterPreset],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
} satisfies Config
