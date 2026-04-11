import { useSiteData, SectionRenderer, useDocumentHead } from '@spektra/runtime'
import type { LandingTemplateProps } from './types'

/**
 * LandingTemplate — single-page marketing layout.
 *
 * Must be rendered inside a SiteDataProvider.
 * Renders: optional header → page sections → optional footer.
 *
 * Header/footer are injected as ComponentType<LayoutShellProps>.
 * The consuming app wraps NavigationBar/FooterBlock and maps
 * SiteData fields to component props.
 *
 * @example
 * ```tsx
 * <SiteDataProvider adapter={adapter}>
 *   <LandingTemplate
 *     registry={registry}
 *     header={AppHeader}
 *     footer={AppFooter}
 *   />
 * </SiteDataProvider>
 * ```
 */
export function LandingTemplate({
  registry,
  header: Header,
  footer: Footer,
  fallback,
  loading,
  error: renderError,
  pageSlug,
  className,
}: LandingTemplateProps) {
  const { data, loading: isLoading, error } = useSiteData()

  const page = data
    ? (pageSlug
        ? data.pages.find(p => p.slug === pageSlug) ?? data.pages[0]
        : data.pages[0])
    : undefined

  useDocumentHead({
    siteMeta: data?.site ?? { name: '' },
    pageMeta: page?.meta,
  })

  if (isLoading) {
    return <>{loading ?? 'Loading…'}</>
  }

  if (error) {
    if (renderError) return <>{renderError(error)}</>
    return <div role="alert">{error.message}</div>
  }

  if (!data || !page) return null

  return (
    <div className={className ?? 'min-h-screen flex flex-col'}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-background focus:text-foreground">
        Skip to main content
      </a>
      {Header && <Header siteData={data} />}
      <main id="main" className="flex-1">
        <SectionRenderer
          sections={page.sections}
          registry={registry}
          fallback={fallback}
        />
      </main>
      {Footer && <Footer siteData={data} />}
    </div>
  )
}
