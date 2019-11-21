# Vue主线剧情之vm.$mount

## 前言

上篇忽略了```src/platforms/web```的说明，这里补上。

实际上Vue在打包的时候，入口优先走的```src/platforms/web```目录，有两种入口：
- compiler模式
- runtime模式

runtime模式就是使用webpack构建的，执行的时候有render方法，template用vue-loader去解析的。

compiler模式可以说成是用cdn的方式（举例而已），template模版需要vue执行之后再编译。

## runtime模式的$mount
我们首先看一下runtime的: [$mount实现](https://github.com/vuejs/vue/blob/6fe07ebf5ab3fea1860c59fe7cdd2ec1b760f9b0/src/platforms/web/runtime/index.js#L36-L43)

我们可以看到主要接收两个参数 el、hydrating，el如果是浏览器就设置为选中项（可能是node），另一个还不知道什么意思。先略过，看后面的```mountComponent```方法.

```mountComponent```方法来自： [core/instance/lifecycle](https://github.com/vuejs/vue/blob/dev/src/core/instance/lifecycle.js#L141-L213)

**嘿，boys～**

到这里又看到了我们熟悉的```callhook(vm, xxx)```， 还有我们在写组件的时候经常遇到的 ```Watcher``` 。

那我们根据这里就可以得到以下流程：

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g95ewrzu8dj30pc13ogm7.jpg)

## 总结
通过我们对这个```public mount methed```的理解，基本上已经清楚，这块主要负责的是生命周期中 ```beforeMount -> mounted``` 的过程，也就是组件的渲染。

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g95f1jlp90j31080ra3zj.jpg)

不过，我们好像并没有看到触发 ```updated``` 的钩子。猜测是在哪里呢，update相关的么，估计是在```vm._update```里咯。下面就让我们去找一下它了解一下。

> 这里其实还有几个地方并不知道是什么作用，留作后面探究。比如 ```vm._render```、```noop```、```hydrating``` 这几个。

