var shell = require("shelljs");
var program = require('commander');
var commandExists = require('command-exists').sync;
const chalk = require('chalk');
const path = require('path')
const log = console.log;
var fs = require('fs');
var replace = require("replace");
var jsonfile = require('jsonfile')

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

if (!commandExists('react-native')){
    log(chalk.red('[error] Please install react-native first (https://facebook.github.io/react-native/docs/getting-started.html)'))
}

if (!commandExists('git')){
    log(chalk.red('[error] Please install git!'))
    process.exit(1)
}

shell.exec('git clone git@github.com:ttdat89/react-native-redux-rxjs-template.git ' + projectName)
shell.cd(projectName)
shell.rm('-rf', '.git')

updateProjectNameInJson(
    path.resolve(process.cwd(), 'package.json'), 
    {name: projectName}
)
updateProjectNameInJson(
    path.resolve(process.cwd(), 'app.json'), 
    {name: projectName, displayName: projectName}
)
updateProjectNameInJs(path.resolve(process.cwd(), 'index.ios.js'))
updateProjectNameInJs(path.resolve(process.cwd(), 'index.android.js'))

if (!commandExists('yarn')){
    log(chalk.yellow('[warn] You can install yarn (https://yarnpkg.com) to make this process faster'))
    shell.exec('npm install')
}else{
    shell.exec('yarn')
}
shell.exec('npm install github:stssoftware/rnpm-plugin-force-upgrade#v0.0.2 --save-dev')
shell.exec('react-native force-upgrade')
shell.exec('npm uninstall rnpm-plugin-force-upgrade --save-dev')


log('')
log(chalk.bold.green('Project created successfully at: ' + process.cwd()))
log('')
log('You can run these commands to start project:')
log('  $ cd '+projectName)
log('  Run ios:')
log('  $ react-native run-ios')
log('  Run android:')
log('  $ react-native run-android')
log('')

function updateProjectNameInJson(path, updatedContent){
    log('Update project name for ' + path)
    const origin = jsonfile.readFileSync(path)
    jsonfile.writeFileSync(
        path, 
        Object.assign(origin, updatedContent),
        {spaces: 2}
    )
}

function updateProjectNameInJs(path){
    log('Update project name for ' + path)
    replace({
      regex: new RegExp("registerComponent\\([^,;]+,"),
      replacement: "registerComponent('"+projectName+"',",
      paths: [path]
    });
}
