const execa = require("execa");
const { join } = require("path");
const chalk = require('chalk');
const argv = require("yargs-parser")(process.argv.slice(2));

const consoleCMD = (context, color="red") => {
    console.log(chalk[color].bold(typeof context === 'object' ? JSON.stringify(context, true, 2) : context));
}

try {
    // 切换工作目录
    process.chdir(join('./', 'docs/.vuepress/dist'));
    const CNAMEStatus = execa.sync('cp',
        [join('../../../', 'CNAME'), join('./CNAME')]
    );
    if (CNAMEStatus.stderr) {
        throw new Error(CNAMEStatus.stderr);
    }
    const ReadmeStatus = execa.sync('cp',
        [join('../../../', 'README.md'), join('./README.md')]
    );
    if (ReadmeStatus.stderr) {
        throw new Error(ReadmeStatus.stderr);
    }

    execa.sync('git', ['init']);
    const addResult = execa.sync('git', ['add', '.']);
    if (addResult.stderr) {
        throw new Error(`command 'git add .' is Error \r\n Error: ${addResult}`);
    } else {
        consoleCMD(`command 'git add .': done`, 'white');
        consoleCMD(addResult.stdout, 'green');
    }
    const commitResult = execa.sync('git', ['commit', [`-m 'build commit'`]]);
    if (commitResult.stderr) {
        throw new Error(`command 'git commit -m 'build commit'' is Error \r\n Error: ${commitResult}`);
    } else {
        consoleCMD(`command 'git commit -m 'build commit'': done`, 'white');
        consoleCMD(commitResult.stdout, 'green');
    }
    const pushResult = execa.sync('git', ['push', '-f', 'https://github.com/FontEndArt/FontEndArt.github.io.git', 'master']);
    consoleCMD(`command 'git push -f https://github.com/FontEndArt/FontEndArt.github.io.git master': done`, 'white');
    consoleCMD(pushResult.stderr || pushResult.stdout, 'green');
} catch (error) {
    consoleCMD(error, 'red');
}




