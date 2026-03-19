import { useSiteData, SectionRenderer } from '@spektra/runtime'
import type { LandingTemplateProps } from './types'

/**
 * LandingTemplate — single-page marketing layout.
 *
 * Must be rendered inside a SiteDataProvider.
 * Renders: optional header → page sections → optional footer.
 *
 * Header/footer are injected as ComponentType<TemplateShellProps>.
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

  if (isLoading) {
    return <>{loading ?? 'Loading…'}</>
  }

  if (error) {
    if (renderError) return <>{renderError(error)}</>
    return <div role="alert">{error.message}</div>
  }

  if (!data) return null

  const page = pageSlug
    ? data.pages.find(p => p.slug === pageSlug) ?? data.pages[0]
    : data.pages[0]

  if (!page) return null

  return (
    <div className={className ?? 'min-h-screen flex flex-col'}>
      {Header && <Header siteData={data} />}
      <main className="flex-1">
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
