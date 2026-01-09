/**
 * Site configuration and brand identity for Baseline
 * This file contains all visual and brand-related data
 */

export interface SiteConfig {
  name: string;
  url: string;
  description: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  social: {
    facebook: string;
    instagram: string;
    linkedin: string;
  };
  theme: {
    colors: {
      primary: string;
      secondary: string;
    };
    fonts: {
      heading: string;
      body: string;
    };
  };
}

/**
 * Baseline site configuration
 */
export const siteConfig: SiteConfig = {
  name: import.meta.env.VITE_SITE_NAME || 'Baseline',
  url: import.meta.env.VITE_SITE_URL || 'http://localhost:3003',
  description: 'Professzionális megoldások vállalkozásoknak',
  
  contact: {
    email: 'info@baseline.example',
    phone: '+36 20 123 4567',
    address: '1234 Budapest, Példa utca 12.',
  },
  
  social: {
    facebook: 'https://facebook.com/baseline',
    instagram: 'https://instagram.com/baseline',
    linkedin: 'https://linkedin.com/company/baseline',
  },
  
  theme: {
    colors: {
      primary: '#3b82f6',
      secondary: '#a855f7',
    },
    fonts: {
      heading: 'Lexend',
      body: 'Inter',
    },
  },
};
