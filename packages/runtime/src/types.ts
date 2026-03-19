import type { ComponentType } from 'react'
import type { SectionMeta } from '@spektra/types'

/**
 * SectionDefinition — section plugin contract.
 *
 * Egy section regisztrálásakor a kliens/platform ezzel definiálja:
 *  - type: a section típusa (string, egyezik a CMS-ből jövő Section.type-pal)
 *  - component: a React component, ami a section-t rendereli
 *  - metadata: opcionális label/category (admin UI-hoz vagy debug-hoz)
 *
 * A generic T a section data típusa — a component props-ként kapja.
 */
export interface SectionDefinition<T = Record<string, unknown>> {
  type: string
  component: ComponentType<T>
  metadata?: SectionMeta
}
