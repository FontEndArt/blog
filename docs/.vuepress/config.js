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
            description: '客官里面请～'
        }
    },
    theme: "theme",
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }],
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
    ],
    port: 8080,
    markdown: {
        lineNumbers: true,
    },
    themeConfig: {
        lastUpdated: true,
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
        // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
        repo: 'https://github.com/FontEndArt/blog',
        repoLabel: 'GitHub',
        author: '前端小然子',
        scss: { indentedSyntax: true },
        serviceWorker: {
            updatePopup: true // Boolean | Object, 默认值是 undefined.
            // 如果设置为 true, 默认的文本配置将是: 
            // updatePopup: { 
            //    message: "New content is available.", 
            //    buttonText: "Refresh" 
            // }
        }
    },
    plugins: []
}