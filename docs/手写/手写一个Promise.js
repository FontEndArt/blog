// 它的内部有三个状态
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

// 接收一个fn并代理为Promise对象
// fn接收两个参数 resolve 和 reject
function myPromise(fn) {
    if (typeof fn !== 'function') {
        throw new TypeError("Promise resolver undefined is not a function");
    }
    var _self = this;
    // 默认是pending状态
    this.state = PENDING;
    this.resolveList = [];
    this.rejectList = [];

    function resolve(value) {
        // 配合then 并且将resolve和reject传进去 链式向下走
        if (value instanceof myPromise) {
            return value.then(resolve, reject);
        }
        setTimeout(function () {
            if (_self.state === PENDING) {
                _self.state = FULFILLED;
                _self.data = value;
                for (var i = 0; i < _self.resolveList.length; i++) {
                    _self.resolveList[i](value)
                }
            }
        })
    }

    function reject(reason) {
        setTimeout(() => {
            if (_self.state === PENDING) {
                _self.state = REJECTED;
                _self.data = reason;
                if (_self.resolveList.length === 0) {
                    console.error(reason)
                }
                for (var i = 0; i < _self.resolveList.length; i++) {
                    _self.rejectList[i](reason)
                }
            }
        })
    }

    // 执行fn 并检测是否有错误 有错误 reject
    try {
        fn(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    var then;
    var thenCalledOrThrow = false;

    if (promise2 === x) { // 对应标准2.3.1节
        return reject(new TypeError('Chaining cycle detected for promise!'))
    }

    if (x instanceof myPromise) { // 对应标准2.3.2节
        // 如果x的状态还没有确定，那么它是有可能被一个thenable决定最终状态和值的
        // 所以这里需要做一下处理，而不能一概的以为它会被一个“正常”的值resolve
        if (x.state === 'pending') {
            x.then(function (value) {
                resolvePromise(promise2, value, resolve, reject)
            }, reject)
        } else { // 但如果这个Promise的状态已经确定了，那么它肯定有一个“正常”的值，而不是一个thenable，所以这里直接取它的状态
            x.then(resolve, reject)
        }
        return
    }

    if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) { // 2.3.3
        try {
            // 2.3.3.1 因为x.then有可能是一个getter，这种情况下多次读取就有可能产生副作用
            // 即要判断它的类型，又要调用它，这就是两次读取
            then = x.then
            if (typeof then === 'function') { // 2.3.3.3
                then.call(x, function rs(y) { // 2.3.3.3.1
                    if (thenCalledOrThrow) return // 2.3.3.3.3 即这三处谁选执行就以谁的结果为准
                    thenCalledOrThrow = true
                    return resolvePromise(promise2, y, resolve, reject) // 2.3.3.3.1
                }, function rj(r) { // 2.3.3.3.2
                    if (thenCalledOrThrow) return // 2.3.3.3.3 即这三处谁选执行就以谁的结果为准
                    thenCalledOrThrow = true
                    return reject(r)
                })
            } else { // 2.3.3.4
                resolve(x)
            }
        } catch (e) { // 2.3.3.2
            if (thenCalledOrThrow) return // 2.3.3.3.3 即这三处谁选执行就以谁的结果为准
            thenCalledOrThrow = true
            return reject(e)
        }
    } else { // 2.3.4
        resolve(x)
    }
}

// 该函数有一个参数，即接受的最终结果（the fulfillment  value）
// onRejected 该函数有一个参数，即拒绝的原因（rejection reason）
myPromise.prototype.then = function (onFulfilled, onRejected) {
    // 如果该参数不是函数，则会在内部被替换为 (x) => x，即原样返回 promise 最终结果的函数
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : x => x;
    // 如果该参数不是函数，则会在内部被替换为一个 "Thrower" 函数 (it throws an error it received as argument)。
    // 默认抛出错误，走到reject流程
    onRejected = typeof onRejected === "function" ? onRejected : e => { throw e; };
    var _self = this;

    // console.log(_self.state)
    // console.log(onFulfilled.toString())
    // console.log(onRejected.toString())

    if (_self.state === FULFILLED) {
        return promise2 = new myPromise(function (resolve, reject) {
            setTimeout(function () { // 异步执行onFulfilled
                try {
                    var result = onRejected(_self.data)
                    resolvePromise(promise2, result, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
        })
    }

    if (_self.state === REJECTED) {
        return promise2 = new myPromise(function (resolve, reject) {
            setTimeout(function () { // 异步执行onRejected
                try {
                    var result = onRejected(_self.data)
                    resolvePromise(promise2, result, resolve, reject);
                } catch (e) {
                    reject(e)
                }
            });
        });
    }

    if (_self.state === PENDING) {
        return promise2 = new myPromise(function (resolve, reject) {
            _self.resolveList.push(function (value) {
                try {
                    var result = onFulfilled(value)
                    resolvePromise(promise2, result, resolve, reject);
                } catch (e) {
                    reject(e)
                }
            })
            _self.rejectList.push(function (reason) {
                try {
                    var result = onRejected(reason)
                    // console.log(onRejected.toString());
                    resolvePromise(promise2, result, resolve, reject);
                } catch (e) {
                    reject(e)
                }
            })
        });
    }
}

myPromise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
}

// 前面是Promise A+的实现 下面是自己对ES6 Promise其他方法的实现

// 方法返回一个Promise。在promise结束时，无论结果是fulfilled或者是rejected，都会执行指定的回调函数。这为在Promise是否成功完成后都需要执行的代码提供了一种方式。这避免了同样的语句需要在then()和catch()中各写一次的情况。
// 如果你想在 promise 执行完毕后无论其结果怎样都做一些处理或清理时，finally() 方法可能是有用的。
// 在finally回调中 throw（或返回被拒绝的promise）将以 throw() 指定的原因拒绝新的promise.
myPromise.prototype.finally = function (onFinally) {
    if (typeof onFinally !== 'function') { return }
    // var constructor = this.constructor;

    // return this.then(function (value) {
    //     return constructor.resolve(onFinally()).then(function() {
    //         return value;
    //     });
    // }, function (reason) {
    //     return constructor.resolve(onFinally()).then(function() {
    //         return reason;
    //     });
    // });

    // 这里的实现有坑。。。测试无catch的Error出不来
    this.then(() => {
        onFinally();
    }, () => {
        onFinally();
    });
    return this;
}
// 核心思路：

// 当前this指向的是当前Promise对象，所以可以直接用this.then()
// then回调中的两个参数，一个是成功时的回调，另一个是失败是的回调，利用这个两个参数处理当前promise对象的两种不同情况
// 无论如何都要调用传入的callback函数，并且将当前promise的决议值继续传递下去
// 一些细节：

// callback传入的有可能仍然是一个Promsie对象，如果真的是Promise对象，要等该promise决议之后才能执行之后then()方法，但是这个then()中拿到的是finally()之前的决议值，有种"决议值穿透"的感觉。

myPromise.resolve = function (value) {
    // 不要在解析为自身的thenable 上调用Promise.resolve。这将导致无限递归，因为它试图展平无限嵌套的promise。
    if (value instanceof myPromise) {
        return value;
    }
    return promise2 = new myPromise(function (resolve, reject) {
        setTimeout(function () { // 保证可以读到promise2
            try {
                // 交给resolvePromise来处理  预防2.3.3的情况
                resolvePromise(promise2, value, resolve, reject)
            } catch (e) {
                reject(e)
            }
        })
    })
}

myPromise.reject = function (reason) {
    return new myPromise((resolve, reject) => {
        reject(reason)
    })
}

// Promise.all(iterable) 方法返回一个 Promise 实例，此实例在 iterable 参数内所有的 promise 都“完成（resolved）”或参数中不包含 promise 时回调完成（resolve）；如果参数中 promise 有一个失败（rejected），此实例回调失败（reject），失败原因的是第一个失败 promise 的结果。
myPromise.all = function (iterators) {
    const promises = Array.from(iterators)
    const len = promises.length
    let count = 0
    let resultList = []
    return new Promise((resolve, reject) => {
        promises.forEach((p, index) => {
            Promise.resolve(p)
                .then((result) => {
                    count++
                    resultList[index] = result
                    if (count === len) {
                        resolve(resultList)
                    }
                })
                .catch(e => {
                    reject(e)
                })
        })
    })
}
// 核心思路：

// Promise.myAll()返回的肯定是一个promise对象，所以可以直接写一个return new Promise((resolve, reject) =&gt; {})(这应该是一个惯性思维)
// 遍历传入的参数，用Promise.resolve()将参数"包一层"，使其变成一个promise对象
// 关键点是何时"决议"，也就是何时resolve出来，在这里做了计数器（count），每个内部promise对象决议后就将计数器加一，并判断加一后的大小是否与传入对象的数量相等，如果相等则调用resolve()，如果任何一个promise对象失败，则调用reject()方法。

// 一些细节：

// 官方规定Promise.all()接受的参数是一个可遍历的参数，所以未必一定是一个数组，所以用Array.from()转化一下
// 使用for…of进行遍历，因为凡是可遍历的变量应该都是部署了iterator方法，所以用for…of遍历最安全


// 谁先决议那么就返回谁，所以将all的计数器和逻辑判断全部去除掉就可以了。
myPromise.race = function () {
    return new Promise((resolve, reject) => {
        for (let p of iterators) {
            Promise.resolve(p)
                .then((result) => {
                    resolve(result)
                })
                .catch(e => {
                    reject(e)
                })
        }
    })
}
// 不进行安全检测的简单实现
myPromise.allSettled = function () {
    return new myPromise((resolve, reject) => {
        function addElementToResult(i, elem) {
            result[i] = elem;
            elementCount++;
            if (elementCount === result.length) {
                resolve(result);
            }
        }

        let index = 0;
        for (const promise of iterable) {
            // Capture the current value of `index`
            const currentIndex = index;
            promise.then(
                (value) => addElementToResult(
                    currentIndex, {
                    status: 'fulfilled',
                    value
                }),
                (reason) => addElementToResult(
                    currentIndex, {
                    status: 'rejected',
                    reason
                }));
            index++;
        }
        if (index === 0) {
            resolve([]);
            return;
        }
        let elementCount = 0;
        const result = new Array(index);
    });
}

// 类似于Promise.race 只要有一个决议实现就通知。
myPromise.any = function (arr) {
    const reverse = p => new myPromise((resolve, reject) => myPromise.resolve(p).then(reject, resolve));
    return reverse(Promise.all(arr.map(reverse)));
}

// 暴露测试模块
myPromise.deferred = myPromise.defer = function () {
    var dfd = {}
    dfd.promise = new myPromise(function (resolve, reject) {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}
// Promise A+测试脚本工具 https://github.com/promises-aplus/promises-tests

// new Promise(function(resolve, reject) {
//     resolve(42)
//   })
//     .then(function(value) {
//       // "Big ERROR!!!"
//     })
//     .catch()
//     .then()
//     .then()
//     .catch()
//     .then()

// 由于后面的then和catch是无意义的 怎么解决

// new Promise(function(resolve, reject) {
//     resolve(42)
//   })
//     .then(function(value) {
//       // "Big ERROR!!!"
//       return new Promise(function(){})
//     })
//     .catch()
//     .then()
//     .then()
//     .catch()
//     .then()

// 这样可以解决但是并不会被回收

// 定义Promise停止情况
myPromise.cancel = myPromise.stop = function () {
    return new myPromise(function () { })
}

// new myPromise(function (resolve, reject) {
//     resolve(42)
// })
//     .then(function (value) {
//         // "Big ERROR!!!"
//         return myPromise.stop()
//     })
//     .catch()
//     .then()
//     .then()
//     .catch()
//     .then()

// 这样我们不使用匿名函数，而是使用函数定义或者函数变量的话，在需要多次执行的Promise链中，这些函数也都只有一份在内存中，不被回收也是可以接受的。

const PromiseFun = function (resolve, reject) {
    console.log("初始化")
    resolve(1);
}

// const promise1 = new Promise(PromiseFun)
//     // const promise1 = new myPromise(PromiseFun)
//     .then(res => { console.log(`then1: ${res}`); throw new Error('2err'); return 2; }, e => { console.log(`catch2: ${e}`); return 202; })
//     .then(res => { throw new Error('3err'); console.log(`then2: ${res}`); return 3; }, e => { console.log(`catch1: ${e}`); return 101; })
//     .then(res => { throw new Error('4err'); console.log(`then3: ${res}`); return 4; }, e => { console.log(`catch2: ${e}`); return 202; })
//     // .catch('str')
//     .catch(e => { console.log(`catch3: ${e}`); return 10; })
//     // .catch(e => { console.log(`catch2: ${e}`); return 15; });

myPromise.reject(new Error(111))
    // Promise.reject(new Error(111))
    .then(res => { console.log(`then1: ${res}`); return 2; })
    .catch(res => { console.log(`catch1: ${res}`); })
    .finally(function () { console.log("finally") });
    // .finally(111);