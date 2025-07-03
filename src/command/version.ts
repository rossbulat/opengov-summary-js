import { Command } from 'commander'
import { version as pkgVersion } from '../../package.json'

export const version = new Command('version')
  .description(
    'Prints the current version of the OpenGov Summary Python package.'
  )

  .action(async () => {
    console.log(pkgVersion)
  })
