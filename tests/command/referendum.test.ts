import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

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
  beforeEach(() => {
    // Mock process.exit to prevent tests from actually exiting
    vi.spyOn(process, 'exit').mockImplementation(() => undefined as never)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })
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

  it('should handle AI summary generation with valid referendum data', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const inquirerMock = await import('inquirer')
    const { getReferendum, summariseReferendum } = await import(
      '../../src/utils/referendums'
    )

    // Mock referendum data
    const mockReferendumData = {
      title: 'Test Referendum',
      content: 'This is test referendum content for AI processing',
      status: 'Deciding',
      tags: ['treasury', 'development'],
      comments_count: 42,
    }

    // Mock the utility functions
    vi.mocked(getReferendum).mockResolvedValue(mockReferendumData)
    vi.mocked(summariseReferendum).mockResolvedValue(
      'AI generated summary of the referendum'
    )

    // Mock inquirer to simulate choosing "Generate AI Summary" then "Exit"
    vi.mocked(inquirerMock.default.prompt)
      .mockResolvedValueOnce({ choice: 'Generate AI Summary' })
      .mockResolvedValueOnce({ choice: 'Exit' })

    const { referendum } = await import('../../src/command/referendum')

    // Execute the command with referendum ID
    await referendum.parseAsync(['--ref', '123'], { from: 'user' })

    // Verify the functions were called
    expect(getReferendum).toHaveBeenCalledWith(123)
    expect(summariseReferendum).toHaveBeenCalledWith(mockReferendumData.content)

    // Verify output messages
    expect(consoleSpy).toHaveBeenCalledWith(
      'Ready to work with Referendum ID 123.'
    )
    expect(consoleSpy).toHaveBeenCalledWith(
      'Generating AI summary for Referendum ID: 123'
    )
    expect(consoleSpy).toHaveBeenCalledWith(
      'AI generated summary of the referendum'
    )
    expect(consoleSpy).toHaveBeenCalledWith(
      '------ Summary generated successfully ---'
    )

    consoleSpy.mockRestore()
  })

  it('should handle referendum metadata display with valid data', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const inquirerMock = await import('inquirer')
    const { getReferendum } = await import('../../src/utils/referendums')

    // Mock referendum data
    const mockReferendumData = {
      title: 'Treasury Proposal #456',
      content: 'Detailed proposal content...',
      status: 'Passed',
      tags: ['treasury', 'polkadot'],
      comments_count: 15,
    }

    // Mock the utility function
    vi.mocked(getReferendum).mockResolvedValue(mockReferendumData)

    // Mock inquirer to simulate choosing "Display Referendum Metadata" then "Exit"
    vi.mocked(inquirerMock.default.prompt)
      .mockResolvedValueOnce({ choice: 'Display Referendum Metadata' })
      .mockResolvedValueOnce({ choice: 'Exit' })

    const { referendum } = await import('../../src/command/referendum')

    // Execute the command with referendum ID
    await referendum.parseAsync(['--ref', '456'], { from: 'user' })

    // Verify the function was called
    expect(getReferendum).toHaveBeenCalledWith(456)

    // Verify metadata output
    expect(consoleSpy).toHaveBeenCalledWith(
      'Ready to work with Referendum ID 456.'
    )
    expect(consoleSpy).toHaveBeenCalledWith(
      'Fetching metadata for Referendum ID: 456'
    )
    expect(consoleSpy).toHaveBeenCalledWith('Title: ', 'Treasury Proposal #456')
    expect(consoleSpy).toHaveBeenCalledWith('Status: ', 'Passed')
    expect(consoleSpy).toHaveBeenCalledWith('Tags: ', ['treasury', 'polkadot'])
    expect(consoleSpy).toHaveBeenCalledWith('Comment count: ', 15)

    consoleSpy.mockRestore()
  })

  it('should handle error when referendum is not found', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})
    const inquirerMock = await import('inquirer')
    const { getReferendum } = await import('../../src/utils/referendums')

    // Mock getReferendum to return undefined (referendum not found)
    vi.mocked(getReferendum).mockResolvedValue(undefined)

    // Mock inquirer to simulate choosing "Display Referendum Metadata" then "Exit"
    vi.mocked(inquirerMock.default.prompt)
      .mockResolvedValueOnce({ choice: 'Display Referendum Metadata' })
      .mockResolvedValueOnce({ choice: 'Exit' })

    const { referendum } = await import('../../src/command/referendum')

    // Execute the command with invalid referendum ID
    await referendum.parseAsync(['--ref', '999'], { from: 'user' })

    // Verify error handling
    expect(getReferendum).toHaveBeenCalledWith(999)
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Referendum with ID 999 not found or an error occurred.'
    )

    consoleSpy.mockRestore()
    consoleErrorSpy.mockRestore()
  })
})
