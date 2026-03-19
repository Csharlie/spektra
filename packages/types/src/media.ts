/**
 * Media típus — a platform egységes képkezelése.
 * Az sp-engine-ben HIÁNYZOTT — a benettcar `backgroundImage?: string`-et használt.
 * Most ez a kanonikus média reprezentáció.
 */

export interface MediaSource {
  url: string
  width?: number
  height?: number
  format?: string
}

/**
 * Egy kép/videó variáns — pl. thumbnail, medium, full.
 */
export interface MediaVariant {
  name: string
  source: MediaSource
}

/**
 * A fő Media interface.
 * Egyetlen kép/videó/média elem a rendszerben.
 *
 * Használat:
 *   - Section data-ban: `image: Media`
 *   - Galériákban: `images: Media[]`
 *   - OG image: `ogImage: Media`
 */
export interface Media {
  src: string
  alt: string
  width?: number
  height?: number
  variants?: MediaVariant[]
  mimeType?: string
}
