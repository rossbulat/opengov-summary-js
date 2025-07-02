import { program } from 'commander'
import 'dotenv/config'
import OpenAI from 'openai'
import { referendum } from './command/referendum'
import { setupGracefulShutdown } from './utils/shutdown'

// Instantiate OpenAI client with API key
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Defining the CLI Program with description and version
program
  .name('OpenGov Summary CLI')
  .description('A CLI to summarize Polkadot OpenGov proposals')
  .version('0.1.0')

// Adding commands to the CLI program
program.addCommand(referendum)

// Parse command-line arguments and execute commands
program.parse(process.argv)

// Handle graceful shutdown
setupGracefulShutdown(async () => {
  console.log('Shutting down gracefully...')
  // NOTE: Add cleanup logic, like closing database connections
})

// Expose program for use in command modules
export { program }
