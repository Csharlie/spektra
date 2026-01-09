import type { SiteData } from './types';

/**
 * Site manifest for Autozeno project
 */
export const siteManifest: SiteData = {
  site: {
    name: 'Autozeno',
    description: 'Autozeno Project',
    url: 'https://autozeno.example.com',
  },
  theme: {
    name: 'base',
    colors: {
      primary: '#2563eb',
      secondary: '#3b82f6',
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
            title: 'Welcome to Autozeno',
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
