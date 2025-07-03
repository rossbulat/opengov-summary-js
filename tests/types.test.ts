import { describe, expect, it } from 'vitest'
import type { GetReferendumResult } from '../src/types'

describe('Types', () => {
  it('should define GetReferendumResult interface correctly', () => {
    // Create a test object that matches the interface
    const testResult: GetReferendumResult = {
      title: 'Test Title',
      content: 'Test Content',
      status: 'active',
      tags: ['governance', 'treasury'],
      comments_count: 42,
    }

    // Verify the structure
    expect(testResult).toHaveProperty('title')
    expect(testResult).toHaveProperty('content')
    expect(testResult).toHaveProperty('status')
    expect(testResult).toHaveProperty('tags')
    expect(testResult).toHaveProperty('comments_count')

    // Verify types
    expect(typeof testResult.title).toBe('string')
    expect(typeof testResult.content).toBe('string')
    expect(typeof testResult.status).toBe('string')
    expect(Array.isArray(testResult.tags)).toBe(true)
    expect(typeof testResult.comments_count).toBe('number')
  })

  it('should allow valid GetReferendumResult objects', () => {
    const validResults: GetReferendumResult[] = [
      {
        title: 'Referendum 1',
        content: 'Content 1',
        status: 'passed',
        tags: [],
        comments_count: 0,
      },
      {
        title: 'Referendum 2',
        content: 'Content 2',
        status: 'rejected',
        tags: ['treasury'],
        comments_count: 10,
      },
    ]

    expect(validResults).toHaveLength(2)
    expect(validResults[0].tags).toEqual([])
    expect(validResults[1].tags).toEqual(['treasury'])
  })
})
