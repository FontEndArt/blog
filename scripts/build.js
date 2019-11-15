const execa = require("execa");
execa.sync('vuepress', ['build', 'docs'],
    {
        stdio: 'inherit'
    });