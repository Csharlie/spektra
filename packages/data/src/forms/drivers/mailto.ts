import type { FormFieldData, FormHandler, FormSubmitResult } from '../types'

/**
 * Mailto driver — env-selectable fallback that opens the user's email client
 * with a pre-filled message body. No backend, no SMTP, no infra needed.
 *
 * IMPORTANT: this is NOT an automatic runtime fallback when the production
 * driver (e.g. CF7) fails. It is only activated when explicitly selected via
 * `VITE_FORM_HANDLER=mailto`. To switch in an emergency, modify
 * `.env.production` and redeploy.
 *
 * Behaviour: `submit()` constructs a `mailto:` URL with subject and body
 * derived from the field map, then assigns `window.location.href` to it. The
 * browser opens the user's email client. We resolve `{ status: 'ok' }`
 * optimistically — there is no way to confirm whether the user actually sent
 * the message.
 */
export interface MailtoFormHandlerConfig {
  /** Target email address (the `to:` part of the mailto: URL) */
  target: string

  /**
   * Subject line template. `{formId}` is replaced with the form identifier.
   * Default: `'New submission from {formId}'`.
   */
  subjectTemplate?: string

  /**
   * Which field key holds the freeform message body. The other fields are
   * appended as labeled lines. Default: `'your-message'` (CF7 convention).
   */
  bodyField?: string
}

export function createMailtoFormHandler(
  config: MailtoFormHandlerConfig,
): FormHandler {
  if (!config.target) {
    throw new Error('MailtoFormHandler: `target` email address is required')
  }
  const target = config.target
  const subjectTemplate =
    config.subjectTemplate ?? 'New submission from {formId}'
  const bodyField = config.bodyField ?? 'your-message'

  return {
    id: 'mailto',
    async submit(
      formId: string,
      fields: FormFieldData,
    ): Promise<FormSubmitResult> {
      const subject = subjectTemplate.replace('{formId}', formId)
      const bodyParts: string[] = []

      const bodyValue = fields[bodyField]
      if (typeof bodyValue === 'string' && bodyValue.length > 0) {
        bodyParts.push(bodyValue, '', '---')
      }

      for (const [key, value] of Object.entries(fields)) {
        if (key === bodyField) continue
        if (value instanceof Blob) continue // file uploads can't go in a mailto link
        const display = Array.isArray(value) ? value.join(', ') : value
        if (typeof display === 'string' && display.length > 0) {
          bodyParts.push(`${key}: ${display}`)
        }
      }

      const url =
        `mailto:${encodeURIComponent(target)}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(bodyParts.join('\n'))}`

      if (typeof window !== 'undefined' && window.location) {
        window.location.href = url
      }

      return { status: 'ok' }
    },
  }
}
