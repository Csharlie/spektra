import type { SiteData } from '../types';
import { siteManifest } from '../site';

/**
 * Load site data for Bellator project
 * This function loads and combines data from all sources
 */
export async function loadSiteData(): Promise<SiteData> {
  // In a real implementation, this would:
  // 1. Load data from CMS (if configured)
  // 2. Load static data
  // 3. Merge them together
  // 4. Return the final SiteData

  return siteManifest;
}
