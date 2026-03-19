import type { SectionDefinition } from '@spektra/runtime'
import type { HeroBlockProps } from '@spektra/components'
import { HeroBlock } from '@spektra/components'

export const heroDefinition: SectionDefinition<HeroBlockProps> = {
  type: 'hero',
  component: HeroBlock,
  metadata: {
    label: 'Hero',
    category: 'marketing',
    description: 'Full-width hero section with CTA buttons and optional background image',
  },
}
