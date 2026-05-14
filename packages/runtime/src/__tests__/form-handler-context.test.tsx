import { describe, expect, it, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import type { FormHandler } from '@spektra/data'
import {
  FormHandlerProvider,
  useFormHandler,
} from '../form-handler-context'

function makeFakeHandler(
  overrides: Partial<FormHandler> = {},
): FormHandler {
  return {
    id: 'fake',
    submit: vi.fn().mockResolvedValue({ status: 'ok' }),
    ...overrides,
  }
}

function HandlerIdProbe() {
  const handler = useFormHandler()
  return <span data-testid="handler-id">{handler.id}</span>
}

function SubmitProbe({ formId }: { formId: string }) {
  const handler = useFormHandler()
  return (
    <button
      data-testid="submit"
      onClick={() => {
        void handler.submit(formId, { 'your-name': 'Teszt' })
      }}
    >
      submit
    </button>
  )
}

describe('FormHandlerProvider / useFormHandler', () => {
  it('injects the handler and exposes it through the hook', () => {
    const handler = makeFakeHandler({ id: 'cf7' })
    render(
      <FormHandlerProvider handler={handler}>
        <HandlerIdProbe />
      </FormHandlerProvider>,
    )
    expect(screen.getByTestId('handler-id').textContent).toBe('cf7')
  })

  it('passes the same handler instance through deeply nested children', () => {
    const handler = makeFakeHandler({ id: 'mailto' })
    render(
      <FormHandlerProvider handler={handler}>
        <div>
          <section>
            <HandlerIdProbe />
          </section>
        </div>
      </FormHandlerProvider>,
    )
    expect(screen.getByTestId('handler-id').textContent).toBe('mailto')
  })

  it("delegates submit() to the wrapped handler when invoked from a child", async () => {
    const submit = vi.fn().mockResolvedValue({ status: 'ok' })
    const handler = makeFakeHandler({ id: 'cf7', submit })

    render(
      <FormHandlerProvider handler={handler}>
        <SubmitProbe formId="contact" />
      </FormHandlerProvider>,
    )

    fireEvent.click(screen.getByTestId('submit'))

    await waitFor(() => {
      expect(submit).toHaveBeenCalledWith('contact', { 'your-name': 'Teszt' })
    })
  })

  it('throws a clear error when used without a provider', () => {
    // Silence the React error logging in this expected-error test
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<HandlerIdProbe />)).toThrow(/FormHandlerProvider/)
    errSpy.mockRestore()
  })
})
