import { describe, expect, it } from 'vitest'
import { createFormHandler } from '../factory'

describe('createFormHandler', () => {
  it('returns a NoOp handler when called without arguments', () => {
    const handler = createFormHandler()
    expect(handler.id).toBe('noop')
  })

  it("creates a 'cf7' driver", () => {
    const handler = createFormHandler({
      driver: 'cf7',
      apiBase: 'https://wp.example.com',
      formId: '123',
    })
    expect(handler.id).toBe('cf7')
  })

  it("creates a 'noop' driver explicitly", () => {
    const handler = createFormHandler({
      driver: 'noop',
      delayMs: 0,
      logToConsole: false,
    })
    expect(handler.id).toBe('noop')
  })

  it("creates a 'mailto' driver", () => {
    const handler = createFormHandler({
      driver: 'mailto',
      target: 'a@b.hu',
    })
    expect(handler.id).toBe('mailto')
  })

  it('throws when the cf7 driver lacks apiBase', () => {
    expect(() =>
      createFormHandler({
        driver: 'cf7',
        apiBase: '',
      }),
    ).toThrow(/apiBase/)
  })

  it('throws when the mailto driver lacks target', () => {
    expect(() =>
      createFormHandler({
        driver: 'mailto',
        target: '',
      }),
    ).toThrow(/target/)
  })
})
