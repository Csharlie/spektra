/**
 * Site configuration and brand identity
 * This file contains all visual and brand-related data
 * Replace these values with your project-specific data
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
 * Site configuration
 * Replace these values with your project-specific data
 */
export const siteConfig: SiteConfig = {
  name: import.meta.env.VITE_SITE_NAME || 'Spektra Project',
  url: import.meta.env.VITE_SITE_URL || 'http://localhost:5173',
  description: 'Modern web solutions for your business',
  
  contact: {
    email: 'info@example.com',
    phone: '+36 XX XXX XXXX',
    address: 'Your Address Here',
  },
  
  social: {
    facebook: 'https://facebook.com/yourpage',
    instagram: 'https://instagram.com/yourpage',
    linkedin: 'https://linkedin.com/company/yourpage',
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
