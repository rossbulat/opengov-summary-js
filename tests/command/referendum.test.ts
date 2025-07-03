import { describe, expect, it, vi } from 'vitest'

// Mock inquirer to avoid interactive prompts in tests
vi.mock('inquirer', () => ({
  default: {
    prompt: vi.fn(),
  },
}))

// Mock the utils/referendums module
vi.mock('../../src/utils/referendums', () => ({
  getReferendum: vi.fn(),
  summariseReferendum: vi.fn(),
}))

describe('Referendum Command', () => {
  it('should export a referendum command', async () => {
    const { referendum } = await import('../../src/command/referendum')

    expect(referendum).toBeDefined()
    expect(referendum.name()).toBe('referendum')
    expect(referendum.description()).toContain('inspect and generate summaries')
  })

  it('should have correct command structure', async () => {
    const { referendum } = await import('../../src/command/referendum')

    expect(referendum.name()).toBe('referendum')
    expect(referendum.description()).toBe(
      'Provides tooling to inspect and generate summaries for OpenGov referenda.'
    )

    // Check that it has the -r, --ref option
    const refOption = referendum.options.find((opt) => opt.short === '-r')
    expect(refOption).toBeDefined()
    expect(refOption?.long).toBe('--ref')
  })

  it('should have referendum ID option configured', async () => {
    const { referendum } = await import('../../src/command/referendum')

    // Check that the referendum command has the --ref option
    const refOption = referendum.options.find((opt) => opt.short === '-r')
    expect(refOption).toBeDefined()
    expect(refOption?.long).toBe('--ref')
    expect(refOption?.description).toContain('referendum ID')
  })
})
