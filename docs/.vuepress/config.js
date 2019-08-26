const Nav = [
  { text: '手册', link: '/guide/' }
];

module.exports = {
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '前端进阶与被虐笔记',
      description: '估计是全网最菜的前端进阶项目'
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  port: 8080,
  dest: 'public',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    nav: Nav,
    sidebar: [],
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: 'https://github.com/FontEndArt/FontEndArt.github.io',
    repoLabel: 'GitHub',
  },
  plugins: []
}