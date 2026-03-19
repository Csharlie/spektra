/**
 * Platform section types — strict union.
 * Kliens section-ök NEM kerülnek ide.
 * Bővítés: ide adj hozzá új platform section type-ot.
 */
export type PlatformSectionType =
  | 'hero'
  | 'about'
  | 'gallery'
  | 'contact'
  | 'faq'
  | 'cta'

/**
 * Union type: platform + opcionális kliens section types.
 * Kliens használat: SectionType<'bc-hero' | 'bc-fleet'>
 * Platform használat: SectionType (= PlatformSectionType)
 */
export type SectionType<ClientSectionType extends string = never> =
  PlatformSectionType | ClientSectionType

/**
 * Runtime helper — ellenőrzi, hogy egy string érvényes platform section type-e.
 */
const platformSectionTypes: ReadonlySet<string> = new Set<PlatformSectionType>([
  'hero', 'about', 'gallery', 'contact', 'faq', 'cta',
])

export function isPlatformSectionType(type: string): type is PlatformSectionType {
  return platformSectionTypes.has(type)
}

/**
 * Egy section metaadatai — opcionális, a section definition-ban használjuk.
 */
export interface SectionMeta {
  label: string
  category: string
  description?: string
}

/**
 * A section core interface.
 * T = a section data típusa (pl. GallerySectionData).
 * Az sp-engine-ben Section.data = unknown volt — most generic.
 */
export interface Section<T = unknown> {
  id: string
  type: string
  data: T
  meta?: SectionMeta
}
