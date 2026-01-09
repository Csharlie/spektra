/**
 * SiteData - Engine Contract
 * This is the abstract data contract that the engine expects.
 * NO CLIENT-SPECIFIC DATA should be defined here.
 */

export interface SiteData {
  site: SiteInfo;
  theme: ThemeConfig;
  pages: Page[];
  navigation: NavigationItem[];
}

export interface SiteInfo {
  name: string;
  description?: string;
  url?: string;
  logo?: string;
}

export interface ThemeConfig {
  name: string;
  colors?: Record<string, string>;
  fonts?: Record<string, string>;
  [key: string]: any;
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
  children?: NavigationItem[];
}

export interface PageMeta {
  title?: string;
  description?: string;
  keywords?: string[];
}
