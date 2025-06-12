import axios from 'axios'
import type { OptionValues } from 'commander'
import inquirer from 'inquirer'
import { program } from './index.js'

// Split string action - example implementation
export const splitString = async (str: string, options: OptionValues) => {
  const limit = options.first ? 1 : undefined
  const separator = options.separator

  console.log('string: ', str)
  console.log('separator: ', separator)

  console.log(str.split(options.separator, limit))

  // Loop prompt until user wants to exit
  while (true) {
    const { choice } = await inquirer.prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'Pick a fruit:',
        choices: ['Help', 'Get OpenGov Rederendum', 'Exit'],
      },
    ])
    console.log(`You picked: ${choice}`)
    if (choice === 'Help') {
      console.log(program.helpInformation())
    } else if (choice === 'Exit') {
      console.log('Exiting...')
      break
    } else {
      // Input the referendum ID
      const refId = 123
      // Fetch referendum data
      await getReferendum(refId)
    }
  }
}

const getReferendum = async (refId: number): Promise<boolean> => {
  try {
    const baseURL = 'https://api.polkassembly.io/api/v1'
    const axiosApi = axios.create({
      baseURL,
    })
    const response = await axiosApi.get(
      `/posts/on-chain-post?postId=${refId}&proposalType=referendums_v2`,
      {
        maxBodyLength: Infinity,
        headers: { 'x-network': 'polkadot' },
      }
    )
    const { content, post_id, status, title } = response.data
    console.log('post id: ', post_id)
    console.log('title: ', title)
    console.log('status: ', status)
    console.log('content: ', content)

    return true
  } catch (err) {
    return false
  }
}
