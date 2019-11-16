const router = require('./router');
const Nav = [
    { text: '进阶', link: '/guide/' },
    // { text: '面试', link: '/mianshi/' },
];

module.exports = {
    locales: {
        '/': {
            lang: 'zh-CN',
            title: '前端小然子的博客',
            description: '前端小然子的博客，记录小然子的学习历程。'
        }
    },
    theme: "theme",
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }],
        ['meta', { name: 'keywords', content: '前端小然子, 前端小然子的博客' }],
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
    ],
    port: 8080,
    markdown: {
        lineNumbers: true,
    },
    themeConfig: {
        lastUpdated: '上次更新',
        nav: Nav,
        sidebar: {
            '/guide/': [
                {
                    title: "前言",
                    collapsable: false,
                    children: [
                        '/guide/',
                    ]
                },
                ...router.guide,
            ],
            '/mianshi/': [...router.mianshi],
        },
        // CNZZ统计
        cnzzUrl: "https://s4.cnzz.com/z_stat.php?id=1278211911&web_id=1278211911",
        // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
        repo: 'https://github.com/FontEndArt/blog',
        repoLabel: 'GitHub',
        author: '前端小然子',
        scss: { indentedSyntax: true },
        serviceWorker: {
            updatePopup: true
        }
    },
    plugins: []
}