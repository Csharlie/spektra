import type { SiteData, SiteDataAdapter } from '@spektra/types'

/**
 * JSON adapter konfiguráció.
 *
 * Két mód:
 *  - url: SiteData JSON-t tölt be URL-ről (fetch)
 *  - data: inline SiteData objektum (dev/mock)
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

  async function fetchSiteData(): Promise<SiteData> {
    if (config.data) {
      return config.data
    }

    // config.url is guaranteed by the constructor guard above
    const response = await fetch(config.url!)
    if (!response.ok) {
      throw new Error(
        `JSON fetch error: ${response.status} ${response.statusText}`,
      )
    }

    return response.json() as Promise<SiteData>
  }

  return {
    load: () => fetchSiteData(),
    revalidate: config.url ? () => fetchSiteData() : undefined,
  }
}
