import { describe, expect, it } from 'vitest'

describe('Version Command', () => {
  it('should export a version command', async () => {
    const { version } = await import('../../src/command/version')

    expect(version).toBeDefined()
    expect(version.name()).toBe('version')
    expect(version.description()).toContain('version')
  })
})
