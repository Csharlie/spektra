import type { ComponentType, ReactNode } from 'react'
import type { SiteData } from '@spektra/types'
import type { SectionRegistry } from '@spektra/runtime'

/**
 * Props injected into header/footer shell components by the template.
 * The consumer extracts navigation, branding, etc. from SiteData.
 */
export interface TemplateShellProps {
  siteData: SiteData
}

/**
 * LandingTemplate props — single-page marketing layout.
 *
 * The template lives inside SiteDataProvider and consumes data via useSiteData().
 * Header/footer are dependency-injected as ComponentType — the template
 * cannot import from @spektra/components (boundary rule).
 */
export interface LandingTemplateProps {
  /** Section registry with registered section definitions */
  registry: SectionRegistry

  /** Header component — receives full SiteData for navigation/branding */
  header?: ComponentType<TemplateShellProps>

  /** Footer component — receives full SiteData for navigation/branding */
  footer?: ComponentType<TemplateShellProps>

  /** Fallback renderer for unresolved section types */
  fallback?: (type: string) => ReactNode

  /** Custom loading state (default: simple text) */
  loading?: ReactNode

  /** Custom error renderer */
  error?: (error: Error) => ReactNode

  /** Which page to render by slug (default: first page in SiteData) */
  pageSlug?: string

  /** Root container className (default: 'min-h-screen flex flex-col') */
  className?: string
}
