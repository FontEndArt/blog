# Vue主线剧情之core/index

啦啦啦，进入新手村了，游戏才刚刚开始哦～

通过对core/index的分析，一点点的开启支线任务，让我们慢慢的了解这个游戏。

> 打包web会先进入到```src/platforms/web```，这里暂且忽略，这个里面也是引用的core_index，这个游戏从core_index开始说起。

## 触发core/index
主线任务：找到```core/index```老爷爷，并与他对话。

对话框：是否查看源码
|```是```｜```否```
|---|---|

我：否

对话框：好的，拜拜

我：wc,wq（卧槽，无情）

再次打开任务框：找到```core/index```老爷爷，并与他对话。

我：emm...


对话框：是否查看源码
|```是```｜```否```
|---|---|

我：是

> 内心：卧槽，就这一个任务，不选 ```是``` 不让往下走了，这特娘的任务设定，那为什么要让我选择呀～
直接看不就完了吗？

---

```javascript
import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
import { isServerRendering } from 'core/util/env'
import { FunctionalRenderContext } from 'core/vdom/create-functional-component'

// 初始化全局API
initGlobalAPI(Vue)

// 挂载isServer判断方法
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})

// 挂载直接访问组件中的服务器端渲染上下文(SSR context)。
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get () {
    // istanbul 提供注释语法，允许某些代码不计入覆盖率。
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
})

// 为vue原型定义当为ssr环境时加载FunctionalRenderContext方法
// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
})

// 版本号
Vue.version = '__VERSION__'

export default Vue
```

通过上面我们可以得到如下的流程：
![](https://tva1.sinaimg.cn/large/006y8mN6ly1g94kktjk75j31f40qgq3g.jpg)

## 探寻Vue的构造函数
我们可以看到 ```core/index``` 中最主要的就是 ```./instance/index``` 和 ```initGlobalAPI```。

我们当然先看最主要的，导出 Vue 构造函数的文件了。

```javascript
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
```

由此可以看到 Vue 实际上就是一个用 ```Function``` 实现的类，接收 ```options``` 参数，通过 ```new``` 关键字初始化后，就会调用 ```this._init``` 方法。

我们看到了一大堆的 ```Mixin```，所以可见这些重点方法全部是混入到Vue的构造函数上面的。具体的得等我们接收相关任务了才能看到。

继续主线。。寻找 ```this._init``` 方法

## this._init

这个不难，通过任务就可以看到init方法嘛，只有initMixin和init有关系，所以我们打开小地图直奔``` core/instance/init.js ```

```javascript
// core/instance/init.js

...

export function initMixin (Vue: Class<Component>) {
  Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // 当前组件的uid 用来标记当前组件
    // a uid
    vm._uid = uid++

    let startTag, endTag

    // 标记开始
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }

    // 如果是Vue的实例的话，就不用observe（观察）了
    // a flag to avoid this being observed
    vm._isVue = true

    // 合并参数
    // merge options

    // 是不是一个单独的组件
    if (options && options._isComponent) {
      // 优化内部组件实例化
      // optimize internal component instantiation
      // 因为动态的合并参数是很慢的，并且没有   (emm...这里我也不知道想说啥，反正是比动态枚举快就对了)
      // since dynamic options merging is pretty slow, and none of the
      // 内部组件选项需要特殊处理。
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      // 公共的参数合并
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }

    // 通过判断 Proxy 为 vue的实例属性赋值
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }

    // 看起来有点像 self.self === self ???
    // expose real self
    vm._self = vm

    // 初始化生命周期相关
    initLifecycle(vm)

    // 初始化事件监听相关
    initEvents(vm)

    // 初始化编译render
    initRender(vm)

    // 通知调用beforeCreate钩子
    callHook(vm, 'beforeCreate')

    // 在data/props之前注入处理一些事情
    initInjections(vm) // resolve injections before data/props

    // 初始化props、methods、data、computed与watch
    initState(vm)

    // 在data/props之后处理一些事情
    initProvide(vm) // resolve provide after data/props

    // 通知调用created钩子
    callHook(vm, 'created')

    // 标记结束
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }

    // 如果el元素存在，则挂载组件方法触发组件的DOM渲染
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}

...

```

> 吐槽一下，看到这里我才明白以前在网上看的那些文档里面，为什么非要用 ```var vm = new Vue(xxx)``` 阿西吧，我说为啥要用vm呢～

总结一下 vue._init 第一次主要干的活有：

- 合并配置项
- 初始化生命周期
- 初始化事件监听
- 初始化render
- 调用beforecreate钩子
- 初始化 data、props、computed、watcher 等
- 调用created钩子
- 最后调用vm.$mount 方法挂载 vm，把模版渲染成DOM。

> 再次吐槽，为啥子Vue的Mixin这么简陋，居然是直接挂载到prototype上，而且，有那么多的Mixin居然都是这样，最后的Vue.use也不例外...  啊啊啊~为什么感觉这么难受啊！！！

## vm.$mount

好了继续主线，大体流程知道了，下一章我们来看 ```_init``` 的最后一步 ```vm.$mount``` 。

