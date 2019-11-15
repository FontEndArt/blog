const execa = require("execa");
const chalk = require('chalk');
const argv = require("yargs-parser")(process.argv.slice(2));

if (!argv.m) {
    console.log(chalk.red.bold(`Can you input commit info? \r\n Please use '-m "message"' options!`))
    return;
}
const commit = typeof argv.m === 'boolean' ? execa.sync('git', ['rev-parse', 'HEAD']).stdout.slice(0, 7) : argv.m;

const add = execa.sync('git', ['add', '.']).stdout;
if (add) {
    console.log(chalk.red.bold(`command "git add ." is Error \r\n Error: ${add}`));
    return;
}

const CommitStatus = execa.sync('git', [
    'commit',
    [
        '-m',
        [`"COMMIT: ${commit}"`]
    ]
]).stdout;

if (CommitStatus) {
    console.log(chalk.white.bold(`command 'git commit -m "COMMIT: ${commit}"': \r\n ${CommitStatus}`));
    return;
}

console.log(commit);
    // {
    //     stdio: 'inherit'
    // });

