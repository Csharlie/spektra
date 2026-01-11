/**
 * Type definitions for Routeline template data
 * 
 * Mirrors baseline data types structure.
 * Extend these types based on project needs.
 */

export interface SiteData {
  site: SiteInfo;
  content: ContentData;
}

export interface SiteInfo {
  name: string;
  url: string;
  description: string;
  contact: ContactInfo;
  social: SocialLinks;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  linkedin: string;
}

export interface ContentData {
  navigation: NavigationContent;
  landing: PageContent;
  products: PageContent;
}

export interface NavigationContent {
  home: string;
  products: string;
}

export interface PageContent {
  title: string;
  description: string;
}
