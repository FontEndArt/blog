# Vue主线剧情之vm._update

## 前言

## _update源码

[vm._update](https://github.com/vuejs/vue/blob/dev/src/core/instance/lifecycle.js#L59-L88)

我们都知道```vm._update```是负责渲染vnode的，通过源码的大概阅读可以知道，```vm._update``` 的核心就是 ```vm.__patch__```，通过 ```vm.__patch__``` 函数来实现将 vnode 转换成真实的 node 节点。

由于我们这里只关心web的相关实现，我们在web的runtime入口处看到有这么一行代码：

```javascript
// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop
```

所以我们顺着环境来寻找patch。


## patch

[vue/src/platforms/web/runtime/patch.js](https://github.com/vuejs/vue/blob/f64765fa03c1eb1d37f3301ea5beb4d18e57158a/src/platforms/web/runtime/patch.js#L3-L12) 我们先来这里看一眼有什么东西。

patch实质是调用了 ```createPatchFunction``` 方法的返回值

## createPatchFunction

```javascript
export function createPatchFunction (backend) {
```
[createPatchFunction return function path(){}](https://github.com/vuejs/vue/blob/f64765fa03c1eb1d37f3301ea5beb4d18e57158a/src/core/vdom/patch.js#L700-L803)
```javascript
}
```

返回的 path 函数 本身接收4个参数， 分别是：

- oldVnode 顾名思义，表示旧的 VNode 节点（看代码也看到了，oldVnode也可以是一个真实的dom对象）
- vnode 表示执行 _render 后返回的 VNode 的节点
- hydrating 依旧忽略先（虽然大家可能看其他文章看到这个东西是做什么用的）
- removeOnly 是给 patchVnode 用的，暂时不管

看看 path 方法主要用了哪些方法，做了什么事情。

主要调用了以下三个方法：
- createElm
    + createElm(vnode, insertedVnodeQueue)
    + 分析这个调用的大概意思就是，通过当前的vnode节点，加入到Vnode的队列中，创建元素（可能会插入到Dom节点中）
- sameVnode
    + sameVnode(oldVnode, vnode)
    + 语义化很明显啊，就是比较oldVnode和vnode。（比较就是看看两个节点是否一致，是不是同一个节点）
- patchVnode
    + patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly)
    + [源码地址](https://github.com/vuejs/vue/blob/f64765fa03c1eb1d37f3301ea5beb4d18e57158a/src/core/vdom/patch.js#L501-L574)
    + 这个方法是整个vdom体系中的核心，用来更新dom。（回头会单开一个副本来刷）

## 总结

整体来说，_update就是利用createPatchFunction返回的path方法来进行创建、比较、更新生成真实节点。

至于具体是怎么增加、删除、更新vnode和dom节点，我会开一个副本的。毕竟dom-diff比较复杂。

至此，Vue的主线任务完成了。
最后，我们用一张图来总结一下整个流程。

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g9a3jdsmzfj31qc0mnt9m.jpg)
