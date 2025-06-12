import type { OptionValues } from 'commander'

// Split string action - example implementation
export const splitString = (str: string, options: OptionValues) => {
  const limit = options.first ? 1 : undefined
  const separator = options.separator

  console.log('string: ', str)
  console.log('separator: ', separator)

  console.log(str.split(options.separator, limit))
}
