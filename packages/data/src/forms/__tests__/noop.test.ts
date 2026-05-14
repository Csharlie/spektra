import { afterEach, describe, expect, it, vi } from 'vitest'
import { createNoOpFormHandler } from '../drivers/noop'

describe('NoOpFormHandler', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("identifies itself as 'noop'", () => {
    const handler = createNoOpFormHandler()
    expect(handler.id).toBe('noop')
  })

  it("resolves with { status: 'ok' }", async () => {
    const handler = createNoOpFormHandler({ delayMs: 0, logToConsole: false })
    const result = await handler.submit('contact', { 'your-name': 'Teszt' })
    expect(result).toEqual({ status: 'ok' })
  })

  it('respects the configured delay', async () => {
    const handler = createNoOpFormHandler({ delayMs: 50, logToConsole: false })
    const start = Date.now()
    await handler.submit('contact', {})
    const elapsed = Date.now() - start
    expect(elapsed).toBeGreaterThanOrEqual(40) // allow ±10ms scheduler jitter
  })

  it('logs the payload by default', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const handler = createNoOpFormHandler({ delayMs: 0 })
    await handler.submit('contact', { 'your-name': 'Teszt' })
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('[NoOpFormHandler]'),
      expect.objectContaining({ 'your-name': 'Teszt' }),
    )
  })

  it('suppresses logs when logToConsole is false', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const handler = createNoOpFormHandler({ delayMs: 0, logToConsole: false })
    await handler.submit('contact', {})
    expect(logSpy).not.toHaveBeenCalled()
  })
})
