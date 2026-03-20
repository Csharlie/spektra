import type { AnySectionDefinition } from '@spektra/runtime'
import { heroDefinition } from './hero'
import { featuresDefinition } from './features'
import { aboutDefinition } from './about'
import { contactDefinition } from './contact'
import { galleryDefinition } from './gallery'

export { heroDefinition } from './hero'
export { featuresDefinition } from './features'
export { aboutDefinition } from './about'
export { contactDefinition } from './contact'
export { galleryDefinition } from './gallery'

/**
 * All platform section definitions — convenience barrel for registerSections().
 *
 * Usage:
 *   import { platformSections } from '@spektra/sections'
 *   import { createSectionRegistry, registerSections } from '@spektra/runtime'
 *
 *   const registry = createSectionRegistry()
 *   registerSections(registry, platformSections)
 *
 * Típustörlési határ: az egyedi definíciók (SectionDefinition<HeroBlockProps> stb.)
 * itt AnySectionDefinition-re szűkülnek. A típusbiztonság a definíció fájlokban él
 * (hero.ts, about.ts stb.), ahol a compiler ellenőrzi a component↔props egyezést.
 */
export const platformSections: readonly AnySectionDefinition[] = [
  heroDefinition,
  featuresDefinition,
  aboutDefinition,
  contactDefinition,
  galleryDefinition,
]
