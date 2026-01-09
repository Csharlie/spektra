/**
 * Data loader for Baseline
 * Single entry point for all site data
 * 
 * ARCHITECTURE:
 * - This is the data boundary between project and engine
 * - ALL data must flow through this loader
 * - UI components receive data ONLY via props
 * - Engine components are pure and client-agnostic
 * 
 * Data sources:
 * 1. Static content from content.ts, gallery.ts, site.ts
 * 2. CMS data (TODO: when VITE_WP_API_URL is configured)
 * 3. Dynamic data (TODO: API calls, etc.)
 */

import type { SiteData } from '../types';
import { siteConfig } from '../site';
import { baselineContent } from '../content';
import { galleryConfig } from '../gallery';

/**
 * Load all site data for Baseline
 * Returns a SiteData object compatible with engine expectations
 */
export async function loadSiteData(): Promise<SiteData> {
  // TODO: Add CMS integration when configured
  // const cmsUrl = import.meta.env.VITE_WP_API_URL;
  // if (cmsUrl) {
  //   const cmsData = await fetchFromCMS(cmsUrl);
  //   return mergeCMSWithStatic(cmsData);
  // }
  
  const siteData: SiteData = {
    site: {
      name: siteConfig.name,
      description: siteConfig.description,
      url: siteConfig.url,
      contact: siteConfig.contact,
      social: siteConfig.social,
    },
    
    theme: {
      name: 'base',
      colors: siteConfig.theme.colors,
      fonts: siteConfig.theme.fonts,
    },
    
    navigation: baselineContent.navigation.links,
    
    pages: [
      {
        slug: 'home',
        title: `${siteConfig.name} - ${siteConfig.description}`,
        meta: {
          title: `${siteConfig.name} - ${siteConfig.description}`,
          description: siteConfig.description,
        },
        sections: [
          {
            type: 'hero',
            id: 'hero-section',
            data: baselineContent.hero,
          },
          {
            type: 'features',
            id: 'features-section',
            data: baselineContent.features,
          },
          {
            type: 'about',
            id: 'about-section',
            data: baselineContent.about,
          },
          {
            type: 'gallery',
            id: 'gallery-section',
            data: {
              ...baselineContent.gallery,
              images: galleryConfig.images,
            },
          },
          {
            type: 'contact',
            id: 'contact-section',
            data: {
              ...baselineContent.contact,
              contactInfo: siteConfig.contact,
            },
          },
        ],
      },
    ],
  };
  
  return siteData;
}

/**
 * Get Baseline specific data
 * For project-specific needs that don't fit into SiteData
 */
export function getBaselineData() {
  return {
    site: siteConfig,
    content: baselineContent,
    gallery: galleryConfig,
  };
}
