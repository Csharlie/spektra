import type { SectionDefinition } from '@spektra/runtime'
import type { AboutBlockProps } from '@spektra/components'
import { AboutBlock } from '@spektra/components'

export const aboutDefinition: SectionDefinition<AboutBlockProps> = {
  type: 'about',
  component: AboutBlock,
  metadata: {
    label: 'About',
    category: 'content',
    description: 'About section with image, stats, and CTA',
  },
}
