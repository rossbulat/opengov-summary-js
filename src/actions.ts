import type { OptionValues } from 'commander'
import inquirer from 'inquirer'

// Split string action - example implementation
export const splitString = async (str: string, options: OptionValues) => {
  const limit = options.first ? 1 : undefined
  const separator = options.separator

  console.log('string: ', str)
  console.log('separator: ', separator)

  console.log(str.split(options.separator, limit))

  const { choice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'Pick a fruit:',
      choices: ['Apple', 'Banana', 'Cherry'],
    },
  ])
  console.log(`You picked: ${choice}`)
}
