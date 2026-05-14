/**
 * `@spektra/data` — forms module
 *
 * Pure async, NO React. The platform-level form-submission abstraction.
 * React Context/Provider/hook live in `@spektra/runtime`.
 *
 * Public surface:
 *
 *   import {
 *     createFormHandler,
 *     type FormHandler,
 *     type FormFieldData,
 *     type FormSubmitResult,
 *   } from '@spektra/data'
 */
export type { FormFieldData, FormHandler, FormSubmitResult } from './types'

export {
  createFormHandler,
  type CreateFormHandlerConfig,
  type FormHandlerDriver,
} from './factory'

export {
  createCf7FormHandler,
  type Cf7FormHandlerConfig,
} from './drivers/cf7'

export {
  createMailtoFormHandler,
  type MailtoFormHandlerConfig,
} from './drivers/mailto'

export {
  createNoOpFormHandler,
  type NoOpFormHandlerConfig,
} from './drivers/noop'
