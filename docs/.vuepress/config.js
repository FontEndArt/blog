const getLinks = require('../../walk-test');

const Nav = [
  { text: '进阶', link: '/guide/' },
  // { text: '求虐', link: '/mianshi/' },
];

module.exports = {
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '前端小然子的博客',
      description: '客官里面请～'
    }
  },
  // theme: "theme",
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
        ...getLinks("guide"),
      ],
      '/mianshi/': getLinks('mianshi'),
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
  // configureWebpack: (config, isServer) => {
    // config.module.rules = config.module.rules.map(item => {
    //   const rule = item.test.toString()
    //   if (rule.includes("scss") || rule.includes("sass")) {

    //     console.log(JSON.stringify(item))
    //   }
    //   return item;
    // })
    // console.log(config.module.rules);
  //   throw new Error("1");
  //   return {
  //     module: {
  //       rules: [
  //         {
  //           test: /\.scss$/,
  //           use: ['style-loader', 'css-loader', 'sass-loader']
  //         },
  //         {
  //           test: /\.sass$/,
  //           use: ['style-loader', 'css-loader', 'sass-loader']
  //         }
  //       ]
  //     }
  //   }
  // },
  plugins: []
}