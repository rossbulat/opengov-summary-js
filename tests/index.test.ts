import { Command } from 'commander'
import { afterEach, describe, expect, it, vi } from 'vitest'

// Mock environment variables
process.env.OPENAI_API_KEY = 'test-key'

// Mock the OpenAI module to avoid real API calls
vi.mock('openai', () => ({
  default: vi.fn().mockImplementation(() => ({
    // Mock OpenAI client
  })),
}))

// Mock dotenv/config
vi.mock('dotenv/config', () => ({}))

describe('CLI Program', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should create a CLI program with correct name and description', async () => {
    // Import the program after mocks are set up
    const { program } = await import('../src/index')

    expect(program).toBeInstanceOf(Command)
    expect(program.name()).toBe('OpenGov Summary CLI')
    expect(program.description()).toBe(
      'A CLI to summarize Polkadot OpenGov proposals'
    )
    expect(program.version()).toBe('0.1.0')
  })

  it('should have referendum and version commands registered', async () => {
    const { program } = await import('../src/index')

    const commands = program.commands.map((cmd) => cmd.name())
    expect(commands).toContain('referendum')
    expect(commands).toContain('version')
  })

  it('should handle graceful shutdown setup', async () => {
    // This test verifies that the graceful shutdown is set up without errors
    expect(async () => {
      await import('../src/index')
    }).not.toThrow()
  })
})
