import {
  createContext,
  useContext,
  type ReactNode,
} from 'react'
import type { FormHandler } from '@spektra/data'

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

/**
 * The default context value is `null`. Consumers (via `useFormHandler`) must
 * either be wrapped in a `<FormHandlerProvider>` or handle the `null` case
 * explicitly. Throwing inside `useFormHandler` when missing keeps the
 * boundary loud — easier to catch in dev than a silent no-op.
 */
const FormHandlerContext = createContext<FormHandler | null>(null)

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export interface FormHandlerProviderProps {
  /**
   * The handler that `useFormHandler()` will return. Construct it once
   * (e.g. in `App.tsx`) via `createFormHandler({ driver: ... })` from
   * `@spektra/data`, then pass it in.
   */
  handler: FormHandler
  children: ReactNode
}

/**
 * `FormHandlerProvider` — exposes a `FormHandler` to the component tree
 * through React Context. Mirror of the read-side `SiteDataProvider`
 * (see `./context.tsx`).
 *
 * Usage:
 *
 * ```tsx
 * import { createFormHandler } from '@spektra/data'
 * import { FormHandlerProvider } from '@spektra/runtime'
 *
 * const handler = createFormHandler({
 *   driver: import.meta.env.VITE_FORM_HANDLER,
 *   apiBase: import.meta.env.VITE_FORM_CF7_API_BASE,
 *   formId: import.meta.env.VITE_FORM_CF7_FORM_ID,
 * })
 *
 * <FormHandlerProvider handler={handler}>
 *   <App />
 * </FormHandlerProvider>
 * ```
 */
export function FormHandlerProvider({
  handler,
  children,
}: FormHandlerProviderProps) {
  return (
    <FormHandlerContext.Provider value={handler}>
      {children}
    </FormHandlerContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * `useFormHandler` — read the active `FormHandler` from a surrounding
 * `<FormHandlerProvider>`. Throws if no provider is present (dev guard).
 *
 * Usage:
 *
 * ```tsx
 * const handler = useFormHandler()
 * const result = await handler.submit('contact', { 'your-name': name })
 * ```
 */
export function useFormHandler(): FormHandler {
  const handler = useContext(FormHandlerContext)
  if (handler === null) {
    throw new Error(
      'useFormHandler: no FormHandlerProvider found in the component tree. ' +
        'Wrap your app in <FormHandlerProvider handler={...}> (see @spektra/runtime).',
    )
  }
  return handler
}
