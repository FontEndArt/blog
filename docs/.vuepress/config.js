const router = require('./router');
const Nav = [
    { text: '进阶', link: '/guide/' },
    {
        text: '面试合集',
        items: [
            { text: 'HTML', link: '/mianshi/html/' },
            { text: 'Vue', link: '/mianshi/vue/' },
            // { text: 'React', link: '/mianshi/react/' }
        ]
    }
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
        externalLinks: { target: '_blank', rel: 'noopener noreferrer' },
        toc: { includeLevel: [2, 3] }
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
            '/mianshi/vue': [
                ...router.vue
            ],
            '/mianshi/html': [
                ...router.html
            ]
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