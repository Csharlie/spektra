import type { Navigation } from './navigation'
import type { Page } from './page'

export interface SiteMeta {
  name: string
  description?: string
  url?: string
  locale?: string
}

export interface SiteData {
  site: SiteMeta
  navigation: Navigation
  pages: Page[]
}
