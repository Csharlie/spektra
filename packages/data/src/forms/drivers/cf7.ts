import type { FormFieldData, FormHandler, FormSubmitResult } from '../types'

/**
 * CF7 driver — production driver for the Contact Form 7 WordPress plugin's
 * REST endpoint.
 *
 * Endpoint:
 *   POST {apiBase}/wp-json/contact-form-7/v1/contact-forms/{formId}/feedback
 *
 * The body is `multipart/form-data` (CF7 accepts FormData). Response status
 * values are documented at:
 *   https://contactform7.com/2015/03/28/custom-validation/
 *   https://contactform7.com/2016/02/24/using-recaptcha/
 *
 * Response mapping (CRITICAL — see p14-6 plan §1):
 *   mail_sent           → { status: 'ok' }
 *   validation_failed   → { status: 'error', field, message } (field-level)
 *   acceptance_missing  → { status: 'error', field: 'gdpr-accept', message }
 *                         (GDPR pipa hiánya = field validation, NOT spam)
 *   spam                → { status: 'rate_limited' }
 *   mail_failed         → { status: 'error', message }
 *   network / fetch     → { status: 'error', message: 'Hálózati hiba' }
 */
export interface Cf7FormHandlerConfig {
  /**
   * Base URL of the WordPress installation that hosts CF7 (no trailing slash).
   * Example: `'https://wp.benettcar.hu'`.
   */
  apiBase: string

  /**
   * The CF7 form's numeric WordPress post ID, as configured at build time.
   * Visible in the CF7 admin URL (`post=<id>`) or shortcode (`[contact-form-7 id="<id>" ...]`).
   *
   * Note: the `submit(formId, ...)` argument is treated as a *logical* form
   * name (e.g. `'contact'`) and ignored when this `formId` is set — CF7
   * routes by numeric ID, not by name. If `formId` is omitted from config,
   * the submit-time argument is used directly (must then be the numeric ID
   * as a string).
   */
  formId?: string

  /**
   * Optional override for the GDPR/acceptance field name. CF7 reports
   * `acceptance_missing` without a `field` hint, so this driver maps it to
   * this field name in the result. Default: `'gdpr-accept'` (matches our
   * Benettcar CF7 form definition — see p14-6 plan §3).
   */
  acceptanceField?: string

  /**
   * Optional override for the error message shown when the user forgets to
   * tick the GDPR checkbox. Default: Hungarian.
   */
  acceptanceMissingMessage?: string

  /**
   * Optional override for the generic "mail send failed" error message.
   * Default: Hungarian.
   */
  mailFailedMessage?: string

  /**
   * Optional override for the network/fetch error message. Default: Hungarian.
   */
  networkErrorMessage?: string
}

interface Cf7ApiResponse {
  status?: string
  message?: string
  posted_data_hash?: string
  invalid_fields?: Array<{
    field?: string
    message?: string
    idref?: string | null
    error_id?: string
  }>
  // Other fields exist but we don't depend on them.
}

export function createCf7FormHandler(
  config: Cf7FormHandlerConfig,
): FormHandler {
  if (!config.apiBase) {
    throw new Error('Cf7FormHandler: `apiBase` is required')
  }
  const apiBase = config.apiBase.replace(/\/$/, '')
  const configuredFormId = config.formId
  const acceptanceField = config.acceptanceField ?? 'gdpr-accept'
  const acceptanceMissingMessage =
    config.acceptanceMissingMessage ??
    'Az adatvédelmi tájékoztató elfogadása kötelező'
  const mailFailedMessage =
    config.mailFailedMessage ??
    'Az üzenet küldése sikertelen, kérjük próbálja újra később'
  const networkErrorMessage =
    config.networkErrorMessage ?? 'Hálózati hiba, kérjük próbálja újra'

  return {
    id: 'cf7',
    async submit(
      submitFormId: string,
      fields: FormFieldData,
    ): Promise<FormSubmitResult> {
      const effectiveFormId = configuredFormId ?? submitFormId
      const endpoint = `${apiBase}/wp-json/contact-form-7/v1/contact-forms/${encodeURIComponent(
        effectiveFormId,
      )}/feedback`

      const body = new FormData()
      for (const [key, value] of Object.entries(fields)) {
        if (Array.isArray(value)) {
          for (const v of value) body.append(key, v)
        } else {
          body.append(key, value)
        }
      }

      let response: Response
      try {
        response = await fetch(endpoint, {
          method: 'POST',
          body,
        })
      } catch {
        return { status: 'error', message: networkErrorMessage }
      }

      let payload: Cf7ApiResponse
      try {
        payload = (await response.json()) as Cf7ApiResponse
      } catch {
        return { status: 'error', message: networkErrorMessage }
      }

      switch (payload.status) {
        case 'mail_sent':
          return { status: 'ok', message: payload.message }

        case 'validation_failed': {
          const first = payload.invalid_fields?.[0]
          return {
            status: 'error',
            message: first?.message ?? payload.message ?? mailFailedMessage,
            field: first?.field,
          }
        }

        case 'acceptance_missing':
          // GDPR/acceptance is a field-level validation error, NOT spam.
          return {
            status: 'error',
            field: acceptanceField,
            message: payload.message ?? acceptanceMissingMessage,
          }

        case 'spam':
          return { status: 'rate_limited' }

        case 'mail_failed':
          return {
            status: 'error',
            message: payload.message ?? mailFailedMessage,
          }

        default:
          return {
            status: 'error',
            message: payload.message ?? mailFailedMessage,
          }
      }
    },
  }
}
