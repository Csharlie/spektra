import type { SectionDefinition } from '@spektra/runtime'
import type { FeaturesBlockProps } from '@spektra/components'
import { FeaturesBlock } from '@spektra/components'

export const featuresDefinition: SectionDefinition<FeaturesBlockProps> = {
  type: 'features',
  component: FeaturesBlock,
  metadata: {
    label: 'Features',
    category: 'marketing',
    description: 'Feature cards grid with configurable columns',
  },
}
