import type { SiteData } from '../types';
import { siteManifest } from '../site';

export async function loadSiteData(): Promise<SiteData> {
  return siteManifest;
}
