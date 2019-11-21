# Vue主线剧情之vm.$mount下篇

## 前言
写完上传到博客才发现，忘了看 ```compiler``` 模式的 ```vm.$mount```，又不想更新上一篇，怎么办，再开一篇文章说吧。这篇文章可能会短一些。

## compiler模式的$mount
小的这就将源码地址奉上：[compiler模式的$mount](https://github.com/vuejs/vue/blob/6fe07ebf5ab3fea1860c59fe7cdd2ec1b760f9b0/src/platforms/web/entry-runtime-with-compiler.js#L17-L83)

我们通过对代码的分析发现compiler主要是对template进行处理，最后还调用了一个public mount methed，由此可以知道，Vue对所有的渲染最终走的都是上篇最后提到的 ```vm._render```。

也就是说如果我们用了下面这种方式，就需要在客户端进行编译模版，通过compileToFunctions处理为render函数。
```javascript
new Vue({
    ...
    template: '{{ hello }}',
    ...
})
```

在使用这种编译方式情况下，显而易见的对我们整体的性能是有损耗的。

所以，使用vue.js的话，我们并不推荐使用compiler-with-runtime这种方式。

> 没有使用到compiler的情况只有：没有指定template，但指定了render。没有指定template的同时，也没指定render（这时候使用的就是被挂载元素的outerHtml）。```template = getOuterHTML(el)```

## 总结
好了，compiler和runtime的mount都介绍看完了。接下来进军```vm._render```；

Let's Go!

