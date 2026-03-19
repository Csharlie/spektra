import type { Section } from './section'
import type { Media } from './media'

export interface PageMeta {
  title?: string
  description?: string
  ogImage?: Media
  canonical?: string
}

export interface Page {
  slug: string
  title?: string
  meta?: PageMeta
  sections: Section[]
}
