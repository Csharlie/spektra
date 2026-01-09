/**
 * Temporary type definitions until dependencies are installed
 * These will be replaced by @spektra/core types after pnpm install
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
