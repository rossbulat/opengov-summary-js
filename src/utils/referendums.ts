import axios from 'axios'
import { openai } from '..'
import type { GetReferendumResult } from '../types'

export const POLKASSEMBLY_BASE_URL = 'https://api.polkassembly.io/api/v1'

// Function to fetch referendum data from PolkAssembly API and return relevant metadata
export const getReferendum = async (
  refId: number
): Promise<GetReferendumResult | undefined> => {
  try {
    // Configure Axios instance with base URL for PolkAssembly API
    const axiosApi = axios.create({
      baseURL: POLKASSEMBLY_BASE_URL,
    })

    // Fetch referendum data using the provided ref ID (that PolkAssembly refers to as postId)
    const response = await axiosApi.get(
      `/posts/on-chain-post?postId=${refId}&proposalType=referendums_v2`,
      {
        // NOTE: Important to set `maxBodyLength` to Infinity to handle large responses
        maxBodyLength: Infinity,
        headers: { 'x-network': 'polkadot' },
      }
    )

    // Check if the response contains data, if not throw an error
    if (!response?.data) {
      throw new Error('No data found for the given referendum ID')
    }

    // Extract relevant metadata from the response and return it
    const { status, title, tags, comments_count, content } = response.data
    return {
      title,
      content,
      status,
      tags,
      comments_count,
    }
  } catch (err) {
    // Log error details and return undefined if an error occurs
    console.error('Error fetching referendum data:', err)
    return undefined
  }
}

// Function to summarise a referendum using OpenAI's GPT model
export const summariseReferendum = async (content: string) => {
  const response = await openai.responses.create({
    model: 'gpt-4.1',
    input: [
      {
        role: 'system',
        content: [
          {
            type: 'input_text',
            text: 'You are a neutral Polkadot governance analyst.\nSummarise the referendum in 150-200 words.\n• Purpose\n• Funding/mechanics\n• Potential impact\n• Controversial points (if any)\n\nThe output of this summary is for the command line, so it is imperative that plain text is output - not markdown, not HTML, etc. Just plain text.',
          },
        ],
      },
      { role: 'user', content },
    ],
    text: {
      format: {
        type: 'text',
      },
    },
    reasoning: {},
    tools: [],
    temperature: 1,
    max_output_tokens: 2048,
    top_p: 1,
    store: true,
  })

  return response.output_text
}
