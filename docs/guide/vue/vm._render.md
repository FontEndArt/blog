# Vue主线剧情之vm._render

## 前言
前面说过的```vm.$mount```，在 ```new Wather``` 中，会调用 ```updateComponent``` 方法。在这个方法中生成虚拟Node节点（vNode），最后调用 ```vm._update``` 来更新Dom,那么其中最核心的就是 ```vm._render``` 和 ```vm._update```。

这里我们就来详细了解一下 ```vm._render```。

> 忘了 ```updateComponent``` 方法的点击这里: [updateComponent](https://github.com/vuejs/vue/blob/d9b27a92bd5277ee23a4e68a8bd31ecc72f4c99b/src/core/instance/lifecycle.js#L169-L192)

## 源码
emm... 不看源码就说流程的都是耍流氓。

_render 定义在 [src/core/instance/render.js](https://github.com/vuejs/vue/blob/f64765fa03c1eb1d37f3301ea5beb4d18e57158a/src/core/instance/render.js#L69-L129) 中

## 大概看了看
嗯～，果然不出所料，```vm._render``` 就是生成vNode了，所以我们只需要找到其中最关键的地方就行了。

在哪里呢？ 那就是 ```vnode = render.call(vm._renderProxy, vm.$createElement)```。

不过后面好像还有一个 ```renderError.call```， 看它的参数估摸着和render做的事情差不多。

## 还记得Vue的options吗？

[这里是贼重要的一句](https://github.com/vuejs/vue/blob/f64765fa03c1eb1d37f3301ea5beb4d18e57158a/src/core/instance/render.js#L71)

所以，render是从vm.$options中拿的咯。

让我们回到Vue.js的Api
- [https://vuejs.org/v2/api/#render](https://vuejs.org/v2/api/#render)
- [https://vuejs.org/v2/api/#renderError](https://vuejs.org/v2/api/#renderError)

你是否像这样调用过呢？
```javascript
// render
new Vue({
  render: function (createElement) {
   return createElement('div', {
        attrs: {
            id: 'app'
        },
    }, this.message)
  },
  renderError: function(createElement, err) {
    return createElement('pre', { style: { color: 'red' }}, err.stack)
  }
}).$mount('#app')

---

// renderError
new Vue({
  render (h) {
    throw new Error('oops')
  },
  renderError (h, err) {
    return h('pre', { style: { color: 'red' }}, err.stack)
  }
}).$mount('#app')
```

所以结合一下就可以看出 render 方法的参数 createElement 实际上就是 vm.$createElement, 然而 vm.$createElement 在初始化中就已经执行过了。

具体看这里： [initRender](https://github.com/vuejs/vue/blob/f64765fa03c1eb1d37f3301ea5beb4d18e57158a/src/core/instance/render.js#L27-L34)

我们发现 ```initRender``` 方法中，除了 ```vm.$createElement``` 方法，还有一个 ```vm._c``` 方法，它是被**模板编译成的** ```render``` 函数使用，但 ```vm.$createElement``` 是我们用**原生写的** ```render``` 方法使用的， 这俩个方法支持的参数相同，并且内部都调用了 ```createElement``` 方法。

官网说的非常清楚：

> The render function has priority over the render function compiled from template option or in-DOM HTML template of the mounting element which is specified by the el option.

也就是如果你在options配置项中传入了自己写的render函数，会优先于template和outhorHtml（in-DOM HTML template）的编译渲染功能。

## 总结
经过一番查找，终于得到了结论， ```render``` 函数最终是执行 ```createElement``` 方法，返回 ```vnode``` 节点，这是一个虚拟 ```node```。

> 阿西吧  终于提到了虚拟dom的概念了。。。  感觉有盼头了

Vue的另一个核心就是用到了Virtual DOM，实际上是借鉴了开源库 [snabbdom](https://github.com/snabbdom/snabbdom) 的实现，然后加入了一些自己的东西。

接下来我们将继续追寻 ```createElement``` 方法。

---

两个扩展问题：

- 操作 ```Virtual DOM``` 快还是真实 ```DOM``` 快？
- Vue的Dom diff你了解多少？ (好像在这里问不太合适，算了，先问了再说)

