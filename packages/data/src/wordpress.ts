import type { SiteData, SiteDataAdapter } from '@spektra/types'

/**
 * WordPress REST adapter konfiguráció.
 *
 * A mapResponse a projekt-specifikus rész: a nyers WP válaszból
 * SiteData-t csinál. Minden más (fetch, error handling, lifecycle)
 * a platform adja.
 */
export interface WordPressAdapterConfig {
  /** WP site base URL (pl. 'https://example.com') */
  apiBase: string
  /** WP REST endpoint path. Default: '/wp-json/spektra/v1/site' */
  endpoint?: string
  /** Map raw WP REST response → SiteData */
  mapResponse: (response: unknown) => SiteData
  /** Optional Bearer token */
  auth?: { token: string }
}

export function createWordPressAdapter(
  config: WordPressAdapterConfig,
): SiteDataAdapter {
  const {
    apiBase,
    mapResponse,
    endpoint = '/wp-json/spektra/v1/site',
    auth,
  } = config

  async function fetchSiteData(): Promise<SiteData> {
    const base = apiBase.replace(/\/+$/, '')
    const path = endpoint.replace(/^\/+/, '/')
    const url = `${base}${path}`

    const headers: Record<string, string> = {
      'Accept': 'application/json',
    }
    if (auth?.token) {
      headers['Authorization'] = `Bearer ${auth.token}`
    }

    const response = await fetch(url, { headers })
    if (!response.ok) {
      throw new Error(
        `WordPress API error: ${response.status} ${response.statusText}`,
      )
    }

    const data: unknown = await response.json()
    return mapResponse(data)
  }

  return {
    load: () => fetchSiteData(),
    revalidate: () => fetchSiteData(),
  }
}
