import type { SectionDefinition } from '@spektra/runtime'
import type { ContactBlockProps } from '@spektra/components'
import { ContactBlock } from '@spektra/components'

export const contactDefinition: SectionDefinition<ContactBlockProps> = {
  type: 'contact',
  component: ContactBlock,
  metadata: {
    label: 'Contact',
    category: 'conversion',
    description: 'Contact form with validation and contact info sidebar',
  },
}
