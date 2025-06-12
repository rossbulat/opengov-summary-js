import { program } from 'commander';
import { splitString } from './actions.js';

program
  .name('OpenGov Summary Bot')
  .description('A CLI to summarize OpenGov proposals')
  .version('0.1.0')

program.command('split')
  .description('Split a string into substrings and display as an array')
  .argument('<string>', 'string to split')
  .option('--first', 'display just the first substring')
  .option('-s, --separator <char>', 'separator character', ',')
  .action(splitString);

program.parse();