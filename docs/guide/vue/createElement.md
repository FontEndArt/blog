# Vue主线剧情之createElement

## 前言

上回说到 ```render``` 函数最终是执行 ```createElement``` 方法，返回 ```vnode``` 节点。这次就让我们来看看 ```createElement``` 内部做了些什么。

## 源码及分析

从 ```src/core/instance/render.js``` 中看到了， ```createElement``` 方法在 ```src/core/vdom/create-element.js``` 文件中。

[点击查看createElement源码](https://github.com/vuejs/vue/blob/dev/src/core/vdom/create-element.js#L28-L136)

看源码第一步，抓重点：

- createEmptyVNode 创建空的vnode
- createComponent 创建组件
- normalizeChildren 规范的children
- simpleNormalizeChildren 简单的规范的children

第二步，看一下执行步骤：

- 判断tag是否存在，不存在则创建一个空节点
- 如果传递了children， 根据 ```normalizationType``` 调用 ```normalizeChildren(children)``` / ```simpleNormalizeChildren(children)```
- 对参数 ```tag``` 的判断， 如果是一个普通的 html 标签，实例化为一个VNode节点，如果是 component 则通过 createComponent 创建一个组件的 vnode。

> 这里可能需要自己再去揣摩一下，大概就是把普通的VNode节点和组件的VNode做一个分别创建

## 总结
因为除了组件的 ```vnode``` 没有 ```children```，而其他通过 ```createElement``` 创建的每个 ```vnode``` 都有 ```children```，并且 ```children``` 每个元素也是一个 ```vnode```。

这样就形成了一个完整的 ```vnode tree```，这样我们就知道 ```vm._render``` 阶段是如何创建的 vnode。

那么接下来我们就去看看 ```vm._update```，看看是如何将 ```vnode``` 渲染成**真实 ```dom```** 的。
