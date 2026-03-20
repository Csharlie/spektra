import type { ReactNode } from 'react'
import type { Section } from '@spektra/types'
import type { SectionRegistry } from './section-registry'

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface SectionRendererProps {
  sections: Section[]
  registry: SectionRegistry
  /** Rendered when a section type is not found in the registry */
  fallback?: (type: string) => ReactNode
}

/**
 * SectionRenderer — sections tömböt renderel a registry alapján.
 *
 * Ez a runtime típustörlési határ másik oldala:
 * a registry.resolve() ComponentType<any>-t ad, a section.data-t
 * spread-eljük propsként. A típusbiztonsági garancia: a SectionDefinition<T>
 * regisztrációnál a compiler ellenőrzi, hogy T és a component props egyeznek.
 */
export function SectionRenderer({
  sections,
  registry,
  fallback,
}: SectionRendererProps) {
  return (
    <>
      {sections.map((section) => {
        const Component = registry.resolve(section.type)

        if (!Component) {
          if (fallback) return <span key={section.id}>{fallback(section.type)}</span>
          return null
        }

        return <Component key={section.id} {...section.data as Record<string, unknown>} />
      })}
    </>
  )
}
