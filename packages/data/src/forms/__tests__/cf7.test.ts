import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createCf7FormHandler } from '../drivers/cf7'

function mockFetch(body: unknown, ok = true) {
  return vi.fn().mockResolvedValue({
    ok,
    json: async () => body,
  } as Response)
}

describe('Cf7FormHandler', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("posts to the CF7 feedback endpoint using the configured form ID", async () => {
    const fetchMock = mockFetch({ status: 'mail_sent' })
    vi.stubGlobal('fetch', fetchMock)

    const handler = createCf7FormHandler({
      apiBase: 'https://wp.benettcar.hu',
      formId: '42',
    })

    await handler.submit('contact', { 'your-name': 'Teszt' })

    expect(fetchMock).toHaveBeenCalledTimes(1)
    const call = fetchMock.mock.calls[0]!
    const url = call[0]
    const init = call[1] as RequestInit
    expect(url).toBe(
      'https://wp.benettcar.hu/wp-json/contact-form-7/v1/contact-forms/42/feedback',
    )
    expect(init.method).toBe('POST')
    expect(init.body).toBeInstanceOf(FormData)
  })

  it('strips trailing slash from apiBase', async () => {
    const fetchMock = mockFetch({ status: 'mail_sent' })
    vi.stubGlobal('fetch', fetchMock)

    const handler = createCf7FormHandler({
      apiBase: 'https://wp.example.com/',
      formId: '7',
    })
    await handler.submit('contact', {})

    const url = fetchMock.mock.calls[0]![0]
    expect(url).toBe(
      'https://wp.example.com/wp-json/contact-form-7/v1/contact-forms/7/feedback',
    )
  })

  it('uses the submit-time formId when no formId is configured', async () => {
    const fetchMock = mockFetch({ status: 'mail_sent' })
    vi.stubGlobal('fetch', fetchMock)

    const handler = createCf7FormHandler({
      apiBase: 'https://wp.example.com',
    })
    await handler.submit('123', {})

    const url = fetchMock.mock.calls[0]![0]
    expect(url).toContain('/contact-forms/123/feedback')
  })

  // ─── Response mapping — every CF7 status branch ────────────────────────

  it("maps 'mail_sent' → { status: 'ok' }", async () => {
    vi.stubGlobal(
      'fetch',
      mockFetch({ status: 'mail_sent', message: 'Köszönjük' }),
    )
    const handler = createCf7FormHandler({
      apiBase: 'https://wp.example.com',
      formId: '1',
    })
    const result = await handler.submit('contact', {})
    expect(result).toEqual({ status: 'ok', message: 'Köszönjük' })
  })

  it("maps 'validation_failed' → { status: 'error', field, message }", async () => {
    vi.stubGlobal(
      'fetch',
      mockFetch({
        status: 'validation_failed',
        invalid_fields: [
          {
            field: 'your-email',
            message: 'Helytelen email cím',
          },
        ],
      }),
    )
    const handler = createCf7FormHandler({
      apiBase: 'https://wp.example.com',
      formId: '1',
    })
    const result = await handler.submit('contact', {})
    expect(result).toEqual({
      status: 'error',
      field: 'your-email',
      message: 'Helytelen email cím',
    })
  })

  it("maps 'acceptance_missing' → { status: 'error', field: 'gdpr-accept' } — NOT rate_limited", async () => {
    vi.stubGlobal(
      'fetch',
      mockFetch({
        status: 'acceptance_missing',
        message: 'Kérjük, fogadja el az adatkezelési tájékoztatót',
      }),
    )
    const handler = createCf7FormHandler({
      apiBase: 'https://wp.example.com',
      formId: '1',
    })
    const result = await handler.submit('contact', {})

    // CRITICAL: GDPR pipa hiánya field-level validation, nem spam.
    expect(result.status).toBe('error')
    expect(result.status).not.toBe('rate_limited')
    if (result.status === 'error') {
      expect(result.field).toBe('gdpr-accept')
      expect(result.message).toBe(
        'Kérjük, fogadja el az adatkezelési tájékoztatót',
      )
    }
  })

  it('honors a custom acceptanceField for non-default form designs', async () => {
    vi.stubGlobal(
      'fetch',
      mockFetch({ status: 'acceptance_missing' }),
    )
    const handler = createCf7FormHandler({
      apiBase: 'https://wp.example.com',
      formId: '1',
      acceptanceField: 'custom-accept',
      acceptanceMissingMessage: 'Kérjük, fogadja el',
    })
    const result = await handler.submit('contact', {})
    if (result.status === 'error') {
      expect(result.field).toBe('custom-accept')
      expect(result.message).toBe('Kérjük, fogadja el')
    } else {
      throw new Error('expected error status')
    }
  })

  it("maps 'spam' → { status: 'rate_limited' }", async () => {
    vi.stubGlobal('fetch', mockFetch({ status: 'spam' }))
    const handler = createCf7FormHandler({
      apiBase: 'https://wp.example.com',
      formId: '1',
    })
    const result = await handler.submit('contact', {})
    expect(result).toEqual({ status: 'rate_limited' })
  })

  it("maps 'mail_failed' → { status: 'error', message }", async () => {
    vi.stubGlobal(
      'fetch',
      mockFetch({ status: 'mail_failed', message: 'SMTP down' }),
    )
    const handler = createCf7FormHandler({
      apiBase: 'https://wp.example.com',
      formId: '1',
    })
    const result = await handler.submit('contact', {})
    expect(result).toEqual({ status: 'error', message: 'SMTP down' })
  })

  it('maps fetch rejection (network error) → { status: error, message }', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new TypeError('Failed to fetch')),
    )
    const handler = createCf7FormHandler({
      apiBase: 'https://wp.example.com',
      formId: '1',
    })
    const result = await handler.submit('contact', {})
    expect(result.status).toBe('error')
    if (result.status === 'error') {
      expect(result.message).toMatch(/Hálózati/i)
    }
  })

  it('maps malformed JSON response → network error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => {
          throw new Error('invalid json')
        },
      } as unknown as Response),
    )
    const handler = createCf7FormHandler({
      apiBase: 'https://wp.example.com',
      formId: '1',
    })
    const result = await handler.submit('contact', {})
    expect(result.status).toBe('error')
  })

  it("falls back to error for unknown status values", async () => {
    vi.stubGlobal(
      'fetch',
      mockFetch({ status: 'something-else', message: 'unknown' }),
    )
    const handler = createCf7FormHandler({
      apiBase: 'https://wp.example.com',
      formId: '1',
    })
    const result = await handler.submit('contact', {})
    expect(result.status).toBe('error')
  })

  it('serializes string-array fields as repeated FormData entries', async () => {
    const fetchMock = mockFetch({ status: 'mail_sent' })
    vi.stubGlobal('fetch', fetchMock)
    const handler = createCf7FormHandler({
      apiBase: 'https://wp.example.com',
      formId: '1',
    })
    await handler.submit('contact', {
      'interests[]': ['cars', 'service', 'rental'],
    })
    const init = fetchMock.mock.calls[0]![1] as RequestInit
    const body = init.body as FormData
    expect(body.getAll('interests[]')).toEqual(['cars', 'service', 'rental'])
  })

  it('auto-injects _wpcf7_unit_tag (anti-CSRF) and _wpcf7 (form id)', async () => {
    const fetchMock = mockFetch({ status: 'mail_sent' })
    vi.stubGlobal('fetch', fetchMock)
    const handler = createCf7FormHandler({
      apiBase: 'https://wp.example.com',
      formId: '24',
    })
    await handler.submit('contact', { 'your-name': 'X' })
    const init = fetchMock.mock.calls[0]![1] as RequestInit
    const body = init.body as FormData
    // Format: wpcf7-f{formId}-p{containerPostId}-o{instance}
    expect(body.get('_wpcf7_unit_tag')).toBe('wpcf7-f24-p1-o1')
    expect(body.get('_wpcf7')).toBe('24')
  })

  it('respects a caller-provided _wpcf7_unit_tag override', async () => {
    const fetchMock = mockFetch({ status: 'mail_sent' })
    vi.stubGlobal('fetch', fetchMock)
    const handler = createCf7FormHandler({
      apiBase: 'https://wp.example.com',
      formId: '24',
    })
    await handler.submit('contact', {
      'your-name': 'X',
      _wpcf7_unit_tag: 'wpcf7-f24-p42-o3',
    })
    const init = fetchMock.mock.calls[0]![1] as RequestInit
    const body = init.body as FormData
    expect(body.get('_wpcf7_unit_tag')).toBe('wpcf7-f24-p42-o3')
  })
})
