import type { SectionDefinition } from '@spektra/runtime'
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
 */
// Individual definitions are typed (e.g., SectionDefinition<HeroBlockProps>) for
// consumer type safety. The barrel array uses `any` because a mixed collection of
// different section data types cannot satisfy ComponentType contravariance.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const platformSections: SectionDefinition<any>[] = [
  heroDefinition,
  featuresDefinition,
  aboutDefinition,
  contactDefinition,
  galleryDefinition,
]
