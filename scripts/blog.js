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
    console.log(chalk.red.bold(`command 'git add .' is Error \r\n Error: ${add}`));
    return;
} else {
    console.log(chalk.white.bold(`command 'git add .': done`));
}


const CommitStatus = execa.sync('git', [
    'commit',
    [
        `-m "COMMIT: ${commit}"`,
    ]
]).stdout;

if (CommitStatus) {
    console.log(chalk.white.bold(`command 'git commit -m "COMMIT: ${commit}"': \r\n`) + chalk.green.bold(CommitStatus));
} else {
    console.log(chalk.white.bold(`command 'git commit -m "COMMIT: ${commit}"': done`));
}

// 存在 -p参数再提交
if (!argv.p) {
    console.log(chalk.yellow.bold(`Do you want to exec command 'git push'? If you want to push to github, please use '-p' options!`));
    return;
}

const pushOptions = [];
pushOptions.push("blog");
if (typeof argv.p !== 'boolean') {
    pushOptions.push(argv.p);
}

const pushStatus = execa.sync('git', [
    'push',
    pushOptions
]).stdout;

const pushCommand = `command 'git push ${pushOptions[0]} ${pushOptions[1] ? pushOptions[1] : ""}`;

if (pushStatus) {
    console.log(chalk.white.bold(`${pushCommand}: \r\n`) + chalk.green.bold(CommitStatus));
} else {
    console.log(chalk.white.bold(`${pushCommand}: done`));
}
// console.log(commit);
    // {
    //     stdio: 'inherit'
    // });

