import type { Config } from 'tailwindcss'
import { basePreset } from './base'

/**
 * Starter Tailwind preset — base colors, zero customization.
 * Identical to base but explicitly named for clarity.
 *
 * Acts as the "just works" default for new projects.
 *
 * Usage:
 *   import { starterPreset } from '@spektra/themes'
 *   export default { presets: [starterPreset] } satisfies Config
 */
export const starterPreset = {
  presets: [basePreset],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Partial<Config>
