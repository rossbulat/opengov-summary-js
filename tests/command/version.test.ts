import { describe, expect, it, vi } from 'vitest'

describe('Version Command', () => {
  it('should export a version command', async () => {
    const { version } = await import('../../src/command/version')

    expect(version).toBeDefined()
    expect(version.name()).toBe('version')
    expect(version.description()).toContain('version')
  })

  it('should execute the version command and log package version', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    const { version } = await import('../../src/command/version')

    // Simulate command execution by calling the action directly
    await version.parseAsync([], { from: 'user' })

    expect(consoleSpy).toHaveBeenCalledWith('1.0.0')

    consoleSpy.mockRestore()
  })

  it('should have correct command structure', async () => {
    const { version } = await import('../../src/command/version')

    expect(version.name()).toBe('version')
    expect(version.description()).toBe(
      'Prints the current version of the OpenGov Summary Python package.'
    )
    expect(version.options).toHaveLength(0) // No options defined
  })
})
