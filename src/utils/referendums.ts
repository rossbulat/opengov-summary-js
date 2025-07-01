import axios from 'axios'
import type { GetReferendumResult } from '../types'

// Function to fetch referendum data from PolkAssembly API and return relevant metadata
export const getReferendum = async (
  refId: number
): Promise<GetReferendumResult | undefined> => {
  try {
    // Configure Axios instance with base URL for PolkAssembly API
    const baseURL = 'https://api.polkassembly.io/api/v1'
    const axiosApi = axios.create({
      baseURL,
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
