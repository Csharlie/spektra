/**
 * @spektra/data — FormHandler types
 *
 * Pure async, NO React. The platform-level abstraction for form submission,
 * mirroring the read-side `SiteDataAdapter` pattern (`createJsonAdapter`,
 * `createWordPressAdapter`). React Context/Provider/hook live in
 * `@spektra/runtime`.
 */

/**
 * The data shape passed into `FormHandler.submit()`.
 *
 * Keys map directly to backend form field names (e.g. for CF7: `'your-name'`,
 * `'your-email'`, `'your-message'`, `'gdpr-accept'`, `'honeypot-field'`).
 * Values are strings, Blobs (file uploads), or string arrays (multi-select).
 */
export type FormFieldData = Record<string, string | Blob | string[]>

/**
 * Discriminated union for submission outcome. Consumers (React components)
 * branch on `status` to drive UI state.
 *
 * - `ok` — submission succeeded
 * - `error` — submission failed; `field` (optional) localizes the error to a
 *   specific input for field-level error display
 * - `rate_limited` — spam-detect or rate limit triggered; show a generic
 *   "please try again later" message
 */
export type FormSubmitResult =
  | { status: 'ok'; message?: string }
  | { status: 'error'; message: string; field?: string }
  | { status: 'rate_limited'; retryAfter?: number }

/**
 * The contract every form-submission driver must implement.
 *
 * Drivers live in `./drivers/` and are constructed via `createFormHandler()`.
 * Implementations: `cf7` (production), `noop` (dev), `mailto` (env-selectable
 * fallback). The `wp-spektra` and `web3forms` drivers are documented in
 * future-roadmap but NOT implemented (no placeholder files, no factory case).
 */
export interface FormHandler {
  /**
   * Diagnostic identifier (e.g. `'cf7'`, `'noop'`, `'mailto'`).
   * Useful for logging and debugging — should not drive runtime behavior.
   */
  readonly id: string

  /**
   * Submit the given form fields. Returns a `FormSubmitResult` — never throws
   * for expected error paths (network, validation, server). Unexpected runtime
   * errors may still bubble up.
   *
   * @param formId  Logical form identifier (driver-specific meaning — for CF7
   *                this maps to the WP form's numeric ID at config time, not
   *                at submit time)
   * @param fields  Field-name → value map (see {@link FormFieldData})
   */
  submit(formId: string, fields: FormFieldData): Promise<FormSubmitResult>
}
