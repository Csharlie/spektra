/**
 * Serializable call-to-action descriptor.
 * Used by section blocks that receive CTA data from CMS / JSON payloads.
 * Components render this as an <a> element (anchor link, internal route, or external URL).
 */
export interface CallToAction {
  text: string
  href?: string
}
