import type { FormFieldData, FormHandler, FormSubmitResult } from '../types'

/**
 * NoOp driver — fake successful submission for development / Storybook /
 * preview environments. Logs the payload and resolves with `{ status: 'ok' }`
 * after a short delay (to simulate network latency, allowing loading-state UI
 * to render naturally).
 *
 * Never use in production: `VITE_FORM_HANDLER=noop` in dev/`.env`,
 * `VITE_FORM_HANDLER=cf7` in `.env.production`.
 */
export interface NoOpFormHandlerConfig {
  /**
   * Artificial delay in milliseconds before resolving. Default: 800ms — long
   * enough for the loading-state UI to be visible but short enough not to
   * frustrate developers.
   */
  delayMs?: number

  /**
   * If true, log payloads to the console with a `[NoOpFormHandler]` prefix.
   * Default: true.
   */
  logToConsole?: boolean
}

export function createNoOpFormHandler(
  config: NoOpFormHandlerConfig = {},
): FormHandler {
  const delayMs = config.delayMs ?? 800
  const logToConsole = config.logToConsole ?? true

  return {
    id: 'noop',
    async submit(
      formId: string,
      fields: FormFieldData,
    ): Promise<FormSubmitResult> {
      if (logToConsole) {
         
        console.log(
          `[NoOpFormHandler] submit('${formId}', ...)`,
          fields,
        )
      }
      if (delayMs > 0) {
        await new Promise((resolve) => setTimeout(resolve, delayMs))
      }
      return { status: 'ok' }
    },
  }
}
