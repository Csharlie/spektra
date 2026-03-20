import type { ComponentType } from 'react'
import type { AnySectionDefinition } from './types'

/**
 * SectionRegistry — section type → React component mapping.
 *
 * Típustörlési határ: a registry AnySectionDefinition-öket tárol.
 * A resolve() ComponentType<any>-t ad vissza — ez őszinte arról,
 * hogy a registry nem tudja, milyen props-okat vár a component.
 * A típusbiztonság a regisztrációs oldalon él (SectionDefinition<T>).
 */
export interface SectionRegistry {
  register(def: AnySectionDefinition): void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolve(type: string): ComponentType<any> | undefined
  has(type: string): boolean
  types(): string[]
}

export function createSectionRegistry(): SectionRegistry {
  const map = new Map<string, AnySectionDefinition>()

  return {
    register(def) {
      if (map.has(def.type)) {
        console.warn(
          `[SectionRegistry] Overriding existing section "${def.type}". ` +
          `This may be intentional (client override), but check for duplicate registrations.`,
        )
      }
      map.set(def.type, def)
    },
    resolve(type) {
      return map.get(type)?.component
    },
    has(type) {
      return map.has(type)
    },
    types() {
      return Array.from(map.keys())
    },
  }
}

/**
 * registerSections — convenience batch registráció.
 *
 * AnySectionDefinition[]-t vár: ez a típustörlési határ,
 * ahol a SectionDefinition<HeroBlockProps> stb. törlődik.
 */
export function registerSections(
  registry: SectionRegistry,
  sections: readonly AnySectionDefinition[],
): void {
  for (const section of sections) {
    registry.register(section)
  }
}
