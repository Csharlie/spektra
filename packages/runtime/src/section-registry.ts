import type { ComponentType } from 'react'
import type { SectionDefinition } from './types'

/**
 * SectionRegistry — section type → React component mapping.
 *
 * Az sp-engine-ben ugyanez volt, de Map<string, ComponentType<any>>-ként.
 * Most SectionDefinition-ökkel dolgozik, és a resolve a component-et adja.
 */
export interface SectionRegistry {
  register(def: SectionDefinition): void
  resolve(type: string): ComponentType<Record<string, unknown>> | undefined
  has(type: string): boolean
  types(): string[]
}

export function createSectionRegistry(): SectionRegistry {
  const map = new Map<string, SectionDefinition>()

  return {
    register(def) {
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

export function registerSections(
  registry: SectionRegistry,
  sections: SectionDefinition[],
): void {
  for (const section of sections) {
    registry.register(section)
  }
}
