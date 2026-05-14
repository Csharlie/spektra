// Context + hook
export { SiteDataProvider, useSiteData } from './context'
export type { SiteDataProviderProps } from './context'

// Form handler context + hook (mirror of SiteDataProvider/useSiteData)
export {
  FormHandlerProvider,
  useFormHandler,
} from './form-handler-context'
export type { FormHandlerProviderProps } from './form-handler-context'

// Document head
export { useDocumentHead } from './use-document-head'
export type { DocumentHeadOptions } from './use-document-head'

// Section registry
export { createSectionRegistry, registerSections } from './section-registry'
export type { SectionRegistry } from './section-registry'

// Section renderer
export { SectionRenderer } from './section-renderer'
export type { SectionRendererProps } from './section-renderer'

// Types
export type { SectionDefinition, AnySectionDefinition } from './types'
