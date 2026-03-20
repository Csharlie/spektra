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
 * Típusbiztonság itt él: a definíció helyszínén a compiler érvényesíti,
 * hogy a component props-ai és T megegyeznek.
 */
export interface SectionDefinition<T = Record<string, unknown>> {
  type: string
  component: ComponentType<T>
  metadata?: SectionMeta
}

/**
 * Type-erased SectionDefinition — a registry/barrel tárolási határ.
 *
 * A SectionDefinition<HeroBlockProps> —> AnySectionDefinition konverzió
 * a típustörlési határ: a heterogén collection-ökben (registry Map,
 * platformSections barrel) nem tartható meg az egyedi T.
 *
 * Ez SZANDÉKOS: a típusbiztonság a definíció oldalán él,
 * nem a tárolási/render oldalán.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnySectionDefinition = SectionDefinition<any>
