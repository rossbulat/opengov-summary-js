import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

describe('Shutdown Utils', () => {
  beforeEach(() => {
    vi.spyOn(process, 'exit').mockImplementation(() => undefined as never)
    vi.spyOn(process, 'on').mockImplementation(() => process)
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should export setupGracefulShutdown function', async () => {
    const { setupGracefulShutdown } = await import('../../src/utils/shutdown')

    expect(setupGracefulShutdown).toBeDefined()
    expect(typeof setupGracefulShutdown).toBe('function')
  })

  it('should call setupGracefulShutdown without throwing', async () => {
    const mockCleanup = vi.fn().mockResolvedValue(undefined)
    const { setupGracefulShutdown } = await import('../../src/utils/shutdown')

    expect(() => {
      setupGracefulShutdown(mockCleanup)
    }).not.toThrow()
  })

  it('should register process event handlers', async () => {
    const processOnSpy = vi.spyOn(process, 'on')
    const mockCleanup = vi.fn().mockResolvedValue(undefined)
    const { setupGracefulShutdown } = await import('../../src/utils/shutdown')

    setupGracefulShutdown(mockCleanup)

    expect(processOnSpy).toHaveBeenCalledWith('SIGINT', expect.any(Function))
    expect(processOnSpy).toHaveBeenCalledWith('SIGTERM', expect.any(Function))
  })
})
