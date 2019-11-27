---
source: 掘金 + 前端小然子补充
sourceAuthor: 我是你的超级英雄（掘金） + 前端小然子
---

# Vue经典面试题合集篇（未完）

## 说说你对 SPA 单页面的理解，它的优缺点分别是什么？
SPA（single-page application）仅在Web页面初始化时加载相应的 HTML、JavaScript 和 CSS。一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转；取而代之的是利用路由机制实现 HTML 内容的变换，UI 与用户的交互，避免页面的重新加载。

- ### 优点：
    
    - 用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染；
    
    - 基于上面一点，SPA 相对对服务器压力小；
    
    - 前后端职责分离，架构清晰，前端进行交互逻辑，后端负责数据处理；

- ### 缺点：

    - 初次加载耗时多：为实现单页 Web 应用功能及显示效果，需要在加载页面的时候将 JavaScript、CSS 统一加载，部分页面-- 按需加载；

    - 前进后退路由管理：由于单页应用在一个页面中显示所有的内容，所以不能使用浏览器的前进后退功能，所有的页面切换需要自己建立堆栈管理；

    - SEO 难度较大：由于所有的内容都在一个页面中动态替换显示，所以在 SEO 上其有着天然的弱势。

## v-show 与 v-if 有什么区别？
- v-if 是真正的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建；也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

- v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 的 “display” 属性进行切换。

- 所以，v-if 适用于在运行时很少改变条件，不需要频繁切换条件的场景；v-show 则适用于需要非常频繁切换条件的场景。

## Class 与 Style 如何动态绑定？

### Class 可以通过对象语法和数组语法进行动态绑定：

- #### 对象语法：
```Vue
<div v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>

<script>
export default {
    data() {
        return {
            isActive: true,
            hasError: false
        }
    }
}
</script>
```

- #### 数组语法：

```Vue
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>

<script>
export default {
    data() {
        return {
            activeClass: 'active',
            errorClass: 'text-danger'
        }
    }
}
</script>
```

### Style 也可以通过对象语法和数组语法进行动态绑定：


- #### 对象语法：
```Vue
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

<script>
export default {
    data() {
        return {
            activeColor: 'red',
            fontSize: 30
        }
    }
}
</script>
```

- #### 数组语法：

```Vue
<div v-bind:style="[styleColor, styleSize]"></div>

<script>
export default {
    data() {
        return {
            styleColor: {
                color: 'red'
            },
            styleSize:{
                fontSize:'23px'
            }
        }
    }
}
</script>
```

## 怎样理解 Vue 的单向数据流？

所有的 ```prop``` 都使得其父子 ```prop``` 之间形成了一个单向下行绑定：父级 ```prop``` 的更新会向下流动到子组件中，但是反过来则不行。

> 这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。

额外的，每次父级组件发生更新时，子组件中所有的 ```prop``` 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 ```prop```。如果你这样做了，Vue 会在浏览器的控制台中发出警告。子组件想修改时，只能通过 ```$emit``` 派发一个自定义事件，父组件接收到后，由父组件修改。

有两种常见的试图改变一个 prop 的情形 :

-  这个 ```prop``` 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 ```prop``` 数据来使用。在这种情况下，最好定义一个本地的 data 属性并将这个 ```prop``` 用作其初始值：
```JavaScript
{
    props: ['initialCounter'],
    data: function () {
        return {
            counter: this.initialCounter
        }
    }
}
```

- 这个 prop 以一种原始的值传入且需要进行转换。在这种情况下，最好使用这个 prop 的值来定义一个计算属性
```JavaScript
{
    props: ['size'],
    computed: {
        normalizedSize: function () {
            return this.size.trim().toLowerCase()
        }
    }
}
```

::: danger 警告
在开发中，千万不要试图在当前组件中直接去修改props接收的值。

```Vue
<template>
    <button @click="onAdd">add</button>
</template>

<script>
export default {
    data() {
        return {
            isActive: true,
            hasError: false
        }
    },
    props: ['size'],
    methods: {
        onAdd() {
            this.size ++;
        }
    }
}
</script>
```
:::

## computed 和 watch 的区别和运用的场景？

### computed
```computed``` 是计算属性，依赖其它属性值，并且 ```computed``` 的值有缓存，只有它依赖的属性值发生改变，下一次获取 ```computed``` 的值时才会重新计算 computed  的值；

### watch
```watch``` 更多的是「观察」的作用，类似于某些数据的监听回调，每当监听的数据变化时都会执行回调进行后续操作；

### 适用场景

- 当我们需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算；

- 当我们需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许我们执行异步操作 ***( 比如访问一个 API )*** ，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。

## 直接给一个数组项赋值，Vue 能检测到变化吗？

由于 JavaScript 的限制，Vue 不能检测到以下数组的变动：

- 当你利用索引直接设置一个数组项时，例如：```vm.items[indexOfItem] = newValue```

```javascript
// 解决方案

// Vue.set
Vue.set(vm.items, indexOfItem, newValue)
// vm.$set，Vue.set的一个别名
vm.$set(vm.items, indexOfItem, newValue)
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```

- 当你修改数组的长度时，例如：vm.items.length = newLength

```javascript
// 解决方案

// Array.prototype.splice
vm.items.splice(newLength)
```

## 谈谈你对 Vue 生命周期的理解？

（1）生命周期是什么？

Vue 实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模版、挂载 Dom -> 渲染、更新 -> 渲染、卸载等一系列过程，我们称这是 Vue 的生命周期。

（2）各个生命周期的作用

|生命周期|描述|
| --------  | :---- |
|beforeCreate|组件实例被创建之初，组件的属性生效之前|
|created|组件实例已经完全创建，属性也绑定，但真实 dom 还没有生成，$el还不可用|
|beforeMount|在挂载开始之前被调用:相关的 render 函数首次被调用|
|mounted|被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子|
|beforeUpdate|组件数据更新之前调用，发生在虚拟DOM打补丁之前|
|updated|组件数据更新之后|
|activited|keep-alive 专属，组件被激活时调用|
|deactivated|keep-alive 专属，组件被销毁时调用|
|beforeDestory|组件销毁前调用|
|destoryed|组件销毁后调用|

![](https://tva1.sinaimg.cn/large/006y8mN6gy1g9cn6kxlnwj30u00xm48f.jpg)
[原图地址](https://user-gold-cdn.xitu.io/2019/8/19/16ca74f183827f46?imageslim)

## Vue 的父组件和子组件生命周期钩子函数执行顺序？

- 加载渲染过程

父 beforeCreate -> 父 created -> 父 beforeMount 

-> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted 

-> 父 mounted

---

- 子组件更新过程

父 beforeUpdate 

-> 子 beforeUpdate -> 子 updated 

-> 父 updated

---

- 父组件更新过程

父 beforeUpdate -> 父 updated

---

- 销毁过程

父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed

## 在哪个生命周期内调用异步请求？
可以在钩子函数 created、beforeMount、mounted 中进行调用，因为在这三个钩子函数中，data 已经创建，可以将服务端端返回的数据进行赋值。但是本人推荐在 created 钩子函数中调用异步请求，因为在 created 钩子函数中调用异步请求有以下优点：

- 能更快获取到服务端数据，减少页面 loading 时间；

- ssr 不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性；

::: warning 注意
我认为这个问题不算明确，关于是否在 created 钩子函数中调用异步请求，应当看是否需要是一些初始化渲染的数据。

面试回答这个问题的时候，首先应当回答 “可以在钩子函数 created、beforeMount、mounted 中进行调用，因为在这三个钩子函数中，data 已经创建，可以将服务端端返回的数据进行赋值。”

其次，可以一一列举出在这几个钩子函数中调用异步请求的一些业务场景。

最后看自己要不要引申到其他地方，比如 store。
:::

## 在什么阶段才能访问操作DOM？
在钩子函数 mounted 被调用前，Vue 已经将编译好的模板挂载到页面上，所以在 mounted 中可以访问操作 DOM。vue 具体的生命周期示意图可以参见如下，理解了整个生命周期各个阶段的操作，关于生命周期相关的面试题就难不倒你了。

![](https://tva1.sinaimg.cn/large/006y8mN6gy1g9cn6kxlnwj30u00xm48f.jpg)
[原图地址](https://user-gold-cdn.xitu.io/2019/8/19/16ca74f183827f46?imageslim)

## 父组件可以监听到子组件的生命周期吗？
比如有父组件 Parent 和子组件 Child，如果父组件监听到子组件挂载 mounted 就做一些逻辑处理，可以通过以下写法实现：

```Vue
// Parent.vue
<Child @mounted="doSomething"/>
    
// Child.vue
<script>
export default {
    mounted() {
        this.$emit("mounted");
    }
}
</script>
```

以上需要手动通过 $emit 触发父组件的事件，更简单的方式可以在父组件引用子组件时通过 @hook 来监听即可，如下所示：

```Vue
//  Parent.vue
<Child @hook:mounted="doSomething" ></Child>

<script>
export default {
    methods: {
        doSomething() {
            console.log('父组件监听到 mounted 钩子函数 ...');
        }
    }
}
</script>
    
//  Child.vue
<script>
export default {
    mounted(){
        console.log('子组件触发 mounted 钩子函数 ...');
    }
}
</script>
// 以上输出顺序为：
// 子组件触发 mounted 钩子函数 ...
// 父组件监听到 mounted 钩子函数 ...     
```

当然 @hook 方法不仅仅是可以监听 mounted，其它的生命周期事件，例如：created，updated 等都可以监听。

## 谈谈你对 keep-alive 的了解？

keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，避免重新渲染 ，其有以下特性：

- 一般结合路由和动态组件一起使用，用于缓存组件；

- 提供 ```include``` 和 ```exclude``` 属性，两者都支持字符串或正则表达式。

    + ```include``` 表示只有名称匹配的组件会被缓存

    + ```exclude``` 表示任何名称匹配的组件都不会被缓存

    + ```exclude``` 的优先级比 ```include``` 高；

- 对应两个钩子函数 ```activated``` 和 ```deactivated``` ，当组件被激活时，触发钩子函数 ```activated``` ，当组件被移除时，触发钩子函数 ```deactivated```。

## 组件中 data 为什么是一个函数？
> 为什么组件中的 data 必须是一个函数，然后 return 一个对象，而 new Vue 实例里，data 可以直接是一个对象？

```javascript
// data
data() {
  return {
	message: "子组件",
	childName: this.name
  }
}

// new Vue
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
```

因为组件是用来复用的，且 JS 里对象是引用关系，如果组件中 data 是一个对象，那么这样作用域没有隔离，子组件中的 data 属性值会相互影响，如果组件中 data 选项是一个函数，那么每个实例可以维护一份被返回对象的独立的拷贝，组件实例之间的 data 属性值不会互相影响；而 new Vue 的实例，是不会被复用的，因此不存在引用对象的问题。

## v-model 的原理？

我们在 vue 项目中主要使用 v-model 指令在表单 input、textarea、select 等元素上创建双向数据绑定，我们知道 v-model 本质上不过是语法糖，v-model 在内部为不同的输入元素使用不同的属性并抛出不同的事件：

- text 和 textarea 元素使用 value 属性和 input 事件；

- checkbox 和 radio 使用 checked 属性和 change 事件；

- select 字段将 value 作为 prop 并将 change 作为事件。

以 input 表单元素为例：
```Vue
<input v-model='something'>
    
// 相当于

<input v-bind:value="something" v-on:input="something = $event.target.value">
```

如果在自定义组件中，v-model 默认会利用名为 value 的 prop 和名为 input 的事件，如下所示：

```Vue
父组件：
<ModelChild v-model="message"></ModelChild>

子组件：
<div>{{value}}</div>

<script>
export default {
    props: {
        value: String
    },
    methods: {
        test1(){
            this.$emit('input', '小红')
        }
    }
}
</script>
```
