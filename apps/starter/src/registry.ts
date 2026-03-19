import { createSectionRegistry, registerSections } from '@spektra/runtime'
import { platformSections } from '@spektra/sections'

/**
 * Section registry — maps section types to components.
 * Initialized once, passed to LandingTemplate.
 */
export const registry = createSectionRegistry()
registerSections(registry, platformSections)
