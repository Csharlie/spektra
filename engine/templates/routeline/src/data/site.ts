/**
 * Site configuration and brand identity
 * 
 * Placeholder for routeline template.
 * Replace with project-specific data when creating a new project.
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
}

/**
 * Default site configuration stub
 */
export const siteConfig: SiteConfig = {
  name: 'Routeline Project',
  url: 'https://example.com',
  description: 'A Spektra routeline project',
  contact: {
    email: 'contact@example.com',
    phone: '+1 234 567 8900',
    address: '123 Main St, City, Country',
  },
  social: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
  },
};
