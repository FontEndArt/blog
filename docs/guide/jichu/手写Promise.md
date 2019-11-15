# 手写一个Promise

## 什么是Promise
请移步 [Promise的使用 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises)

请移步 [Promise的介绍 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## 分析基本的Promise
Promise 的核心说白了是一个模拟异步的过程，并且实现了异步调用。

一个 Promise 有以下几种状态:

    pending: 初始状态，既不是成功，也不是失败状态。
    fulfilled: 意味着操作成功完成。
    rejected: 意味着操作失败。

![](https://tva1.sinaimg.cn/large/006y8mN6gy1g8u5pf7e42j30m9089t8t.jpg)

也就是说 Promise 会一直处于 pending 状态，直到执行完毕，切换为 fulfilled/rejected 状态

### 注意
**状态一旦变为 fulfilled/rejected，后续任何的内部代码将不会继续执行，将会跳出**

## 怎么检验自己实现的 Promise 是否可用

https://github.com/promises-aplus/promises-tests
测试脚本

类似下面的一个测试示例，将 ```Promise.all、Promise.race、Promise.resolve、Promise.reject``` 这几个方法一一调用与ECMAScript中提供的Promise进行比较即可。
```javascript
import myPromise from "./myPromise";

const myPromiseFun = function (resolve, reject){
    // do some things...
    console.log('初始化');

    resolve();
}
const then1 = function (){
    // do some things...
    console.log("then1")

    return {now: "then"};
}
const then2 = function (){
    // do some things...
    console.log("then2")
    throw new Error('有哪里不对了');
        
    console.log('执行「这个」”');
}
const catch = function (){
    // do some things...
    console.log("catch")
}

// 链式调用测试  通常，一遇到异常抛出，Promise 链就会停下来，直接调用链式中的 catch 处理程序来继续当前执行。
new Promise(myPromiseFun).then(then1).then(then2).catch(catch).then(() => {
    console.log('执行「这个」，无论前面发生了什么');
});
new myPromise(myPromiseFun).then(then1).then(then2).catch(catch).then(() => {
    console.log('执行「这个」，无论前面发生了什么');
});
```

## 实现我们自己的Promise

规范
https://promisesaplus.com/#point-46

参考实现 https://zhuanlan.zhihu.com/p/21834559

```javascript
function myPromise() {

}
```

Promise.all() 和 romise.race() 都具有 短路特性
- Promise.all()：如果参数中  promise 有一个失败（rejected），此实例回调失败（reject）
- Promise.race()：如果参数中某个promise解决或拒绝，返回的 promise就会解决或拒绝。
