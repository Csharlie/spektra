/**
 * Serializable call-to-action descriptor.
 * Used by section blocks that receive CTA data from CMS / JSON payloads.
 * Components render this as an <a> element — both text and href are required
 * to produce a valid navigational anchor. Boundary layers (normalizers) must
 * drop CTA objects that lack either field before they reach components.
 */
export interface CallToAction {
  text: string
  href: string
}
