import type { SiteData } from './types';

/**
 * Site manifest for Bellator project
 * This is the single source of truth for site configuration
 */
export const siteManifest: SiteData = {
  site: {
    name: 'Bellator',
    description: 'Bellator Project',
    url: 'https://bellator.example.com',
  },
  theme: {
    name: 'base',
    colors: {
      primary: '#1a202c',
      secondary: '#2d3748',
    },
  },
  pages: [
    {
      slug: 'home',
      title: 'Home',
      sections: [
        {
          type: 'hero',
          id: 'hero-1',
          data: {
            title: 'Welcome to Bellator',
            subtitle: 'Your tagline here',
          },
        },
      ],
    },
  ],
  navigation: [
    {
      label: 'Home',
      href: '/',
    },
  ],
};
