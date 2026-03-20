import type { SiteData, SiteDataAdapter } from '@spektra/types'
import { validateSiteData } from './validate'

/**
 * JSON adapter konfiguráció.
 *
 * Három mód:
 *  - url only: load() és revalidate() is fetch-el
 *  - data only: load() inline-t ad, revalidate nincs
 *  - url + data: load() inline-t ad (instant), revalidate() fetch-el (frissítés)
 *
 * Legalább az egyiket meg kell adni.
 */
export interface JsonAdapterConfig {
  /** Fetch SiteData JSON from this URL */
  url?: string
  /** Inline SiteData — dev/mock/static site-okhoz */
  data?: SiteData
}

export function createJsonAdapter(
  config: JsonAdapterConfig,
): SiteDataAdapter {
  if (!config.url && !config.data) {
    throw new Error('JsonAdapter: either url or data must be provided')
  }

  async function fetchFromUrl(): Promise<SiteData> {
    const response = await fetch(config.url!)
    if (!response.ok) {
      throw new Error(
        `JSON fetch error: ${response.status} ${response.statusText}`,
      )
    }
    const json: unknown = await response.json()
    const result = validateSiteData(json)
    if (!result.valid) {
      throw new Error(
        `Invalid SiteData from JSON source: ${result.errors.join('; ')}`,
      )
    }
    return result.data
  }

  return {
    load: () => config.data ? Promise.resolve(config.data) : fetchFromUrl(),
    revalidate: config.url ? () => fetchFromUrl() : undefined,
  }
}
