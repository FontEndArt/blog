const execa = require("execa");
execa.sync('vuepress', ['dev', 'docs'],
    {
        stdio: 'inherit'
    });