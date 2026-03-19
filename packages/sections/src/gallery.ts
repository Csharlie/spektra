import type { SectionDefinition } from '@spektra/runtime'
import type { GalleryBlockProps } from '@spektra/components'
import { GalleryBlock } from '@spektra/components'

export const galleryDefinition: SectionDefinition<GalleryBlockProps> = {
  type: 'gallery',
  component: GalleryBlock,
  metadata: {
    label: 'Gallery',
    category: 'content',
    description: 'Image gallery with category filter and lightbox',
  },
}
