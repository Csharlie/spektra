import { useEffect } from 'react'
import type { PageMeta, SiteMeta } from '@spektra/types'

export interface DocumentHeadOptions {
  siteMeta: SiteMeta
  pageMeta?: PageMeta
}

/**
 * useDocumentHead — updates document `<head>` from SiteData metadata.
 *
 * Sets: document.title, meta description, og:title, og:description,
 * og:image, canonical link, and html lang attribute.
 *
 * Call from templates (e.g. LandingTemplate) where SiteData is available.
 */
export function useDocumentHead({ siteMeta, pageMeta }: DocumentHeadOptions): void {
  useEffect(() => {
    // Title
    const title = pageMeta?.title ?? siteMeta.name
    document.title = title

    // Lang
    if (siteMeta.locale) {
      document.documentElement.lang = siteMeta.locale
    }

    // Helper: set or remove a <meta> tag
    const setMeta = (name: string, content: string | undefined, property?: boolean) => {
      const attr = property ? 'property' : 'name'
      const selector = `meta[${attr}="${name}"]`
      let el = document.head.querySelector(selector) as HTMLMetaElement | null

      if (content) {
        if (!el) {
          el = document.createElement('meta')
          el.setAttribute(attr, name)
          document.head.appendChild(el)
        }
        el.content = content
      } else {
        el?.remove()
      }
    }

    // Helper: set or remove a <link> tag
    const setLink = (rel: string, href: string | undefined) => {
      const selector = `link[rel="${rel}"]`
      let el = document.head.querySelector(selector) as HTMLLinkElement | null

      if (href) {
        if (!el) {
          el = document.createElement('link')
          el.rel = rel
          document.head.appendChild(el)
        }
        el.href = href
      } else {
        el?.remove()
      }
    }

    // Meta description
    setMeta('description', pageMeta?.description)

    // Open Graph
    setMeta('og:title', title, true)
    setMeta('og:description', pageMeta?.description, true)
    setMeta('og:image', pageMeta?.ogImage?.src, true)
    if (siteMeta.url) {
      setMeta('og:url', siteMeta.url, true)
    }

    // Canonical
    setLink('canonical', pageMeta?.canonical)
  }, [siteMeta, pageMeta])
}
