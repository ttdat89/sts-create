var shell = require("shelljs");
var program = require('commander');
var commandExists = require('command-exists').sync;
const chalk = require('chalk');
const log = console.log;
var fs = require('fs');

const projectName = process.argv[2]

if (!projectName){
	log('Please input project name: sts-create react-app [project-name]')
	log('For example:')
	log('  $ sts-create react-app my-project')
	process.exit(1)
}else{
	if (fs.existsSync(projectName)){
		log('Project name "'+projectName+'" already exists in current folder')
		process.exit(1)
	}
}

if (!commandExists('git')){
	log(chalk.red('[error] Please install git!'))
	process.exit(1)
}

shell.exec('git clone git@github.com:stssoftware/react-redux-app.git ' + projectName)
shell.cd(projectName)
shell.rm('-rf', projectName + '/.git')
if (!commandExists('yarn')){
	log(chalk.yellow('[warn] You can install yarn (https://yarnpkg.com) to make this process faster'))
	shell.exec('npm install')
}else{
	shell.exec('yarn')
}

log('')
log(chalk.bold.green('Project created successfully at: ' + process.cwd()))
log('')
log('You can run these commands to start project:')
log('  $ cd '+projectName)
log('  $ npm start')
