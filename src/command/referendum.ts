// Copyright 2024 JKRB Investments Limited. All rights reserved.

import { Command } from 'commander'
import inquirer from 'inquirer'
import { z } from 'zod'
import { getReferendum, summariseReferendum } from '../utils/referendums.js'

// Define the schema for the referendum summary command
const schema = z.object({
  ref: z.coerce.number().int().min(0),
})

// Function to inspect referenda
export const referendum = new Command('referendum')
  .description(
    'Provides tooling to inspect and generate summaries for OpenGov referenda.'
  )
  .option('-r, --ref <id>', 'Specify a referendum ID')
  .action(async (o) => {
    // Validate options against zod schema and exit early if invalid
    const options = schema.safeParse(o)
    if (!options.success) {
      console.error(options.error.format())
      process.exit(1)
    }
    // Extract referendum ID from options
    const refId = options.data.ref

    console.log(`Ready to work with Referendum ID ${refId}.`)

    while (true) {
      // Prompt user for action
      const { choice } = await inquirer.prompt([
        {
          type: 'list',
          name: 'choice',
          message: 'Choose an action:',
          choices: [
            'Display Referendum Metadata',
            'Generate AI Summary',
            'Help',
            'Exit',
          ],
        },
      ])

      // Handle user choice
      if (choice === 'Display Referendum Metadata') {
        await handleDisplayMetadata(refId)
      } else if (choice === 'Generate AI Summary') {
        await handleDisplayAISummary(refId)
      } else if (choice === 'Help') {
        handleHelp()
      } else if (choice === 'Exit') {
        handleExit()
        // Important: Break the loop to exit the command
        break
      }
    }
  })

// Handle display AI summary
const handleDisplayAISummary = async (refId: number) => {
  console.log(`Generating AI summary for Referendum ID: ${refId}`)
  // Fetch referendum data
  const result = await getReferendum(refId)
  if (!result) {
    console.error(`Referendum with ID ${refId} not found or an error occurred.`)
    return
  }
  // Get content for summarization
  const { content } = result
  const response = await summariseReferendum(content)
  console.log(response)
  console.log('------ Summary generated successfully ---')
}

// Handle displaying referendum metadata
const handleDisplayMetadata = async (refId: number) => {
  console.log(`Fetching metadata for Referendum ID: ${refId}`)

  // Fetch referendum data
  const result = await getReferendum(refId)
  if (!result) {
    console.error(`Referendum with ID ${refId} not found or an error occurred.`)
    return
  }
  // Display the CLI friendly metadata
  const { status, title, tags, comments_count } = result
  console.log('Title: ', title)
  console.log('Status: ', status)
  console.log('Tags: ', tags)
  console.log('Comment count: ', comments_count)
}

// Handler for displaying help information
const handleHelp = () => {
  console.log(`
Referendum Command Help:
- Display Referendum Metadata: Shows the title, status, tags, and comment count for the referendum
- Generate AI Summary: Creates an AI-powered summary of the referendum content
- Help: Shows this help information
- Exit: Exits the referendum command
  `)
}

// Handler for exiting the program
const handleExit = () => {
  console.log('Exiting...')
  process.exit(1)
}
