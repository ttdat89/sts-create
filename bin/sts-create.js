#! /usr/bin/env node

var program = require('commander')
program
  .version(require('../package.json').version)
  .command('react-native-app <project-directory>', 'Create React Native app')
  .command('react-app <project-directory>', 'Create React app')

program.on('--help', function(){
    console.log('  Examples:')
    console.log('')
    console.log('    $ sts-create react-app my-react-project')
    console.log('    $ sts-create react-native-app my-react-native-project')
})

program.parse(process.argv)
