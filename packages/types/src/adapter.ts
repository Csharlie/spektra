import type { SiteData } from './site'

/**
 * Adapter interface — CMS → SiteData konverzió.
 * Az sp-engine-ben ugyanez volt, változatlanul átvesszük.
 * Implementáció a @spektra/data package-ben lesz.
 */
export interface SiteDataAdapter {
  load(): Promise<SiteData>
  init?(): Promise<void>
  revalidate?(): Promise<SiteData>
  onError?(error: unknown): void
}
