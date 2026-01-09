import type { SiteData } from '../types';
import { bellatorContent } from '../content';

/**
 * Load site data for Bellator project
 * This is the SINGLE entry point for assembling all site data
 * 
 * ARCHITECTURE:
 * - This file is the data boundary between project and engine
 * - ALL data must flow through this function
 * - UI components receive data ONLY via props (never import directly)
 * - Engine components are pure and client-agnostic
 * 
 * Data sources (in priority order):
 * 1. CMS data (if configured via VITE_WP_API_URL env var)
 * 2. Static content from content.ts
 * 3. Default fallbacks from types.ts
 * 
 * TODO: Add CMS integration when WordPress is configured
 * TODO: Add data caching/memoization if needed
 * TODO: Add error handling and fallback logic
 */
export async function loadSiteData(): Promise<SiteData> {
  // TODO: Check for CMS configuration
  // const cmsUrl = import.meta.env.VITE_WP_API_URL;
  // if (cmsUrl) {
  //   try {
  //     const cmsData = await fetchFromCMS(cmsUrl);
  //     return mergeCMSWithStatic(cmsData, bellatorContent);
  //   } catch (error) {
  //     console.error('CMS fetch failed, falling back to static content', error);
  //   }
  // }
  
  const content = bellatorContent;
  
  // Transform Bellator content to SiteData format
  // TODO: Review this mapping when SiteData interface is finalized in @spektra/core
  const siteData: SiteData = {
    site: {
      name: content.site.name,
      description: content.site.description,
      url: content.site.url,
      // TODO: Add logo field if SiteInfo interface is extended
    },
    theme: {
      name: 'base', // Using base theme from engine
      colors: {
        primary: '#FFB100', // Bellator yellow
        secondary: '#000000', // Bellator black
      },
      // TODO: Add font configuration if ThemeConfig is extended
    },
    pages: [
      {
        slug: 'home',
        title: content.pages.home.meta.title,
        meta: {
          title: content.pages.home.meta.title,
          description: content.pages.home.meta.description,
        },
        sections: [
          {
            type: 'hero',
            id: 'hero-section',
            data: content.pages.home.hero,
          },
          {
            type: 'programs',
            id: 'programs-section',
            data: content.pages.home.programs,
          },
          {
            type: 'coaches',
            id: 'coaches-section',
            data: content.pages.home.coaches,
          },
          {
            type: 'gallery',
            id: 'gallery-section',
            data: content.pages.home.gallery,
          },
          {
            type: 'membership',
            id: 'membership-section',
            data: content.pages.home.membership,
          },
          {
            type: 'testimonials',
            id: 'testimonials-section',
            data: content.pages.home.testimonials,
          },
          {
            type: 'contact',
            id: 'contact-section',
            data: {
              ...content.pages.home.contact,
              contactInfo: content.site.contact,
            },
          },
        ],
      },
    ],
    navigation: content.navigation.links.map(link => ({
      label: link.label,
      href: link.href,
    })),
  };

  return siteData;
}

/**
 * Get Bellator-specific content directly
 * Use this for project-specific needs that don't fit into SiteData
 * 
 * NOTE: This is a transitional function during migration
 * Eventually all data should flow through loadSiteData() -> SiteData
 */
export function getBellatorContent() {
  return bellatorContent;
}
