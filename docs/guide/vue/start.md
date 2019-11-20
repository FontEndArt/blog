# Vue初探

## 前言

前端的发展还是很迅猛的，社区一直推动着前端技术的更新迭代。从经典的jQuery大法到数据驱动视图的开发模式，仅仅经历了几年的时间。现在主流的前端框架几乎三分天下，Vue、React、Angular ***（这里的顺序无规则）*** 各自占据一方，而其他的框架大多数是围绕着这三大框架或衍生、或依赖、或借鉴。总而言之，数据驱动视图的开发模式已经渗入了前端开发人员的生活 ***（部分国企、内网除外？？？）*** 。

这里我们仅围绕Vue这个尤大大开发的框架来研究，虽然外面的世界对于某些框架不屑一顾，但是存在即合理，我们仅围观它的技术，并学习它的思想。而不去探究是否适合这个时代，不去评价这个框架如何如何。

Vue一直以简单、快速著称，我们来看一看在国内如此火热的Vue，为什么可以获得如此高的评价。后面我们会分析Vue的源码，从中学习一些开发思想，来帮助我们在工作中解决一些问题。

## Vue介绍
Vue官方介绍是一套用于构建用户界面的渐进式 JavaScript 框架。Vue提供了MVVM风格的双向数据绑定，也就是我们所说的MVVM,MVVM是一种以数据驱动UI的一种设计模式，所以说Vue专注的是UI层。

随着前端的开发模式的进步，前端项目在方便开发人员的同时，也变得愈发的复杂。由此引来了组件化开发，Vue的核心之一就是组件化开发。现在几乎所有的框架都在试图去构建一套自己的写法，比如.vue .jsx .wxml等等。相比之下Vue和React这样的写法还是比较容易让大众所接受的。

## 凭什么赢得国内开发者喜爱
我认为最重要的一点就是简单，Vue虽然使用了自己的一套```.vue```模版规则，但是实质上并没有对前端熟悉的```.html```有什么较大的改变。

其次呢，就是文档易于阅读，对于国内开发者友好，几乎将你的开发难度降到了冰点。只需要你有一点点前端开发的底子，然后面向文档开发就能交付代码。

然后让我们看看React的铁子：
![](https://tva1.sinaimg.cn/large/006y8mN6gy1g948n16yxsj31pn0u0q70.jpg)

**铁子，我看你是在为难我胖虎。**

至于Angular，emm...我感觉是自己把自己从中国开发者身边玩死的，版本更新带来的是一片鬼哭狼嚎，虽然不得不承认Angular的源码是真的 Niubility!

不管说这个框架源码写的好不好，但是它是真的简单，开发者也是人，也有惰性，绝大多数开发者当下能偷懒绝不会让自己多写一行。

> 最重要的是国内的市场总是让你快速交付，比如一个项目两三个专题页面，让你一天交付出来，你会用Vue、React？这样说实在的真不如jQuery快。 ***（大部分老板才不会管你用的什么技术）***

好了，下面言归正传。

## Vue的开发模式

Vue是将```html```、```js```、```css```写在一个```.vue```的文件中。因为浏览器是识别不了.vue文件的，所以我们就需要编译(compiler)，编译成相应的```html```、```js```、```css```文件，才可以放在浏览器中运行。

## MVVM模型

在Vue的MVVM模型中：View就是我们的视图，Model是请求过来的数据，ViewModel就是建立在View和Model之间的联系。所以是Vue是数据驱动视图：v=f(d)。

具体详细的MVVM知识还未成稿，等确定上传了请移步到我的博客基础篇查看。

## Vue的安装使用

哇，要死啦，写不下去了我，都说了是面向文档开发，怎么可能在这里施展一番CV大法呢。

如果真的有需要，请移步 [Vue.js教程](https://cn.vuejs.org/v2/guide/installation.html)

嘿嘿，省下了好多文字。

## Vue的源码架构

首先，奉上我对尤大大的敬意，Vue的GitHub仓库地址 [https://github.com/vuejs/vue](https://github.com/vuejs/vue)

我们有需要的东西都在这里了：

```javascript
Vue的Git仓
├── src
    ├── compiler    / # 模版编译目录
    ├── core        / # 核心代码
    ├── platforms   / # 跨平台的支持
    ├── server      / # 处理服务端渲染
    ├── sfc         / # .vue 文件的解析
    ├── shared      / # 全局用到的工具函数
```

## compiler
compiler目录包含了Vue所有编译相关的代码。包括把模版解析成抽象语法树(AST)，编译、生成等功能。

## core
core目录包含了Vue的核心代码，包含了内置组件、指令、全局API、Observer、VNode(虚拟dom)、全局工具函数等，这里是Vue框架的最最最核心部分，也是我们接下来重点关注分析的地方。

## platforms
最初 vue 是跑在 web 上的MVVM架构, 后期增加了 阿里团队的 Weex 入口，配合 Weex 也可以运行在 native 客户端上。
> Weex是个大坑，慎踩，uni-app也是用了Weex的编译流程，不过整体来说对开发者友好了许多，让前端可以凑合着开发app了。

## server
服务端渲染入口，这是是vue2.0 之后更新的功能，所谓的服务端渲染是把相对应的组件渲染为服务端的 html 字符串，然后发送给客户端，客户端进行处理。这样做能提高客户体验。

> Nuxt.js是一个基于 Vue.js 的轻量级应用框架,可用来创建服务端渲染 (SSR) 应用，常用的Vue SSR渲染框架。如果你的技术足够，希望还是自己实现Vue的SSR吧。如果你的技术够屌，那肯定不用我这小菜鸡在这里说三道四的对吧。诶嘿嘿～

## sfc
用来将 ```.vue``` 文件内容解析成JavaScript的对象

## shared
全局用到的工具函数，这里没什么可介绍的，大家看看源码就知道啦哈～

## 源码构建

vue 源码是基于 [Rollup](https://www.rollupjs.com/) 构建的，构建的配置在 scripts 目录下

> 最近在学着怎么写一个第三方库，感觉Rollup挺好用的，给我的感觉至少比gulp要好一些。尤其在tree-shaking这块

```javascript
scripts
├── git-hook/           # git-hook配置文件
├── alias               # 混入文件目录别名配置
├── build               # 构建的入口文件
├── config              # 构建全局配置文件
├── feature-flags       # weex 环境 flag
├── gen-release-note    # 生成 Change log
├── get-weex-version    # 生成 weexBaseVersion
├── release-weex        # weex发布的脚本
├── release             # 发布脚本
├── verify-commit-msg   # 检查 Commit message 是否符合格式
```

## 构建脚本

我们都知道通过```npm```和```yarn```构建的项目都会有一个 ```package.json``` 文件，这个文件当中的 ```script``` 描述符中一般配置的基本都是启动项目、打包、测试等相关命令, 看一下 ```vue``` 项目根目录的 ```package.json```。这里我们去掉了测试相关的命令。

```json
{
    "dev": "rollup -w -c scripts/config.js --environment TARGET:web-full-dev",
    "dev:cjs": "rollup -w -c scripts/config.js --environment TARGET:web-runtime-cjs-dev",
    "dev:esm": "rollup -w -c scripts/config.js --environment TARGET:web-runtime-esm",
    "dev:ssr": "rollup -w -c scripts/config.js --environment TARGET:web-server-renderer",
    "dev:compiler": "rollup -w -c scripts/config.js --environment TARGET:web-compiler ",
    "dev:weex": "rollup -w -c scripts/config.js --environment TARGET:weex-framework",
    "dev:weex:factory": "rollup -w -c scripts/config.js --environment TARGET:weex-factory",
    "dev:weex:compiler": "rollup -w -c scripts/config.js --environment TARGET:weex-compiler ",
    "build": "node scripts/build.js",
    "build:ssr": "npm run build -- web-runtime-cjs,web-server-renderer",
    "build:weex": "npm run build -- weex",
}
```
通过分析 ```package.json``` 我们很容易的就找到了打包的入口。通过这个入口就可以进入Vue这个大迷宫一探究竟。

## 构建过程 & 主线流程
我们这里主要通过build命令来分析Vue的主线流程。

vue 主线流程图如下：

![](https://tva1.sinaimg.cn/large/006y8mN6gy1g94av88icsj31m50u0409.jpg)

上面的图中能够直观的看到 vue 主干的执行流程，但是缺少核心部分，我们会通过下面的文章一点点来揭开Vue的面纱。 ***（主要是在一篇文章里写不下了）***

