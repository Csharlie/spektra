import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createMailtoFormHandler } from '../drivers/mailto'

describe('MailtoFormHandler', () => {
  let assignedHref = ''

  beforeEach(() => {
    assignedHref = ''
    // Inject a writable `window.location` shim with an `href` setter that
    // captures what the driver assigns. `vi.stubGlobal` handles restore.
    const locationStub = {
      set href(value: string) {
        assignedHref = value
      },
      get href() {
        return assignedHref
      },
    }
    vi.stubGlobal('window', { location: locationStub })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("identifies itself as 'mailto'", () => {
    const handler = createMailtoFormHandler({ target: 'a@b.hu' })
    expect(handler.id).toBe('mailto')
  })

  it('throws when target is missing', () => {
    expect(() =>
      createMailtoFormHandler({ target: '' }),
    ).toThrow(/target/)
  })

  it("returns { status: 'ok' } optimistically after assigning location.href", async () => {
    const handler = createMailtoFormHandler({ target: 'kapcsolat@benettcar.hu' })
    const result = await handler.submit('contact', {
      'your-name': 'Teszt Elek',
      'your-email': 'teszt@example.hu',
      'your-message': 'Üzenet törzs',
    })
    expect(result).toEqual({ status: 'ok' })
    expect(assignedHref).toMatch(/^mailto:/)
  })

  it("encodes the target email and subject", async () => {
    const handler = createMailtoFormHandler({
      target: 'kapcsolat@benettcar.hu',
      subjectTemplate: 'New contact from {formId}',
    })
    await handler.submit('contact-form', {})
    expect(assignedHref).toContain('mailto:kapcsolat%40benettcar.hu')
    expect(assignedHref).toMatch(/subject=New%20contact%20from%20contact-form/)
  })

  it('places the bodyField value first in the email body', async () => {
    const handler = createMailtoFormHandler({
      target: 'a@b.hu',
      bodyField: 'your-message',
    })
    await handler.submit('contact', {
      'your-name': 'Teszt',
      'your-message': 'Központi üzenet',
      'your-email': 'teszt@example.hu',
    })
    const body = decodeURIComponent(
      assignedHref.split('&body=')[1] ?? '',
    )
    const lines = body.split('\n')
    expect(lines[0]).toBe('Központi üzenet')
    expect(lines).toContain('your-name: Teszt')
    expect(lines).toContain('your-email: teszt@example.hu')
  })

  it('skips Blob (file) values — they cannot fit in a mailto URL', async () => {
    const handler = createMailtoFormHandler({ target: 'a@b.hu' })
    await handler.submit('contact', {
      'your-name': 'Teszt',
      attachment: new Blob(['file content'], { type: 'text/plain' }),
    })
    const body = decodeURIComponent(
      assignedHref.split('&body=')[1] ?? '',
    )
    expect(body).not.toContain('attachment')
    expect(body).toContain('your-name: Teszt')
  })

  it('joins string-array values with commas', async () => {
    const handler = createMailtoFormHandler({ target: 'a@b.hu' })
    await handler.submit('contact', {
      interests: ['cars', 'service'],
    })
    const body = decodeURIComponent(
      assignedHref.split('&body=')[1] ?? '',
    )
    expect(body).toContain('interests: cars, service')
  })
})
