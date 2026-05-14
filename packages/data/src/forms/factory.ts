import type { FormHandler } from './types'
import {
  createCf7FormHandler,
  type Cf7FormHandlerConfig,
} from './drivers/cf7'
import {
  createMailtoFormHandler,
  type MailtoFormHandlerConfig,
} from './drivers/mailto'
import {
  createNoOpFormHandler,
  type NoOpFormHandlerConfig,
} from './drivers/noop'

/**
 * Driver identifier — discriminator for `CreateFormHandlerConfig`.
 *
 * Future drivers (`wp-spektra`, `web3forms`, `formspree`) are documented in
 * `sp-docs/knowledge/implementation/p14-6-contact-form-formhandler.md` §11
 * but are NOT in this enum — adding one requires a deliberate code change,
 * not a silent fallback.
 */
export type FormHandlerDriver = 'cf7' | 'noop' | 'mailto'

/**
 * Tagged union of all valid factory configs. The discriminator `driver`
 * picks the implementation, then the remaining fields are driver-specific.
 *
 * Example:
 *
 * ```ts
 * createFormHandler({ driver: 'cf7', apiBase: 'https://wp.benettcar.hu', formId: '123' })
 * createFormHandler({ driver: 'noop' })
 * createFormHandler({ driver: 'mailto', target: 'kapcsolat@benettcar.hu' })
 * ```
 */
export type CreateFormHandlerConfig =
  | ({ driver: 'cf7' } & Cf7FormHandlerConfig)
  | ({ driver: 'noop' } & NoOpFormHandlerConfig)
  | ({ driver: 'mailto' } & MailtoFormHandlerConfig)

/**
 * Create a `FormHandler` based on driver selection. Pure async, no React.
 *
 * Without arguments, returns a `NoOpFormHandler` — useful for tests and
 * Storybook defaults. Production should always pass an explicit config.
 *
 * @throws Error if the driver is not one of the supported values
 */
export function createFormHandler(
  config?: CreateFormHandlerConfig,
): FormHandler {
  if (!config) {
    return createNoOpFormHandler()
  }

  switch (config.driver) {
    case 'cf7': {
      const { driver: _driver, ...rest } = config
      void _driver
      return createCf7FormHandler(rest)
    }
    case 'noop': {
      const { driver: _driver, ...rest } = config
      void _driver
      return createNoOpFormHandler(rest)
    }
    case 'mailto': {
      const { driver: _driver, ...rest } = config
      void _driver
      return createMailtoFormHandler(rest)
    }
    default: {
      // Exhaustive check — TypeScript flags here if a new driver is added
      // to the union but not handled.
      const _exhaustive: never = config
      throw new Error(
        `createFormHandler: unsupported driver: ${JSON.stringify(_exhaustive)}`,
      )
    }
  }
}
