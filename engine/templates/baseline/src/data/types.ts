/**
 * Type definitions for Baseline site data
 * These types align with @spektra/core expectations
 */

export interface SiteData {
  site: SiteInfo;
  theme: ThemeConfig;
  pages: Page[];
  navigation: NavigationItem[];
}

export interface SiteInfo {
  name: string;
  description: string;
  url: string;
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

export interface ThemeConfig {
  name: string;
  colors: {
    primary: string;
    secondary: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
}

export interface Page {
  slug: string;
  title: string;
  sections: Section[];
  meta?: PageMeta;
}

export interface Section {
  type: string;
  id: string;
  data: Record<string, any>;
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface PageMeta {
  title: string;
  description: string;
}
