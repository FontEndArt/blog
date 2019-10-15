// apply() 方法调用一个具有给定this值的函数，以及作为一个数组（或类似数组对象）提供的参数。

// 注意：call()方法的作用和 apply() 方法类似，区别就是call()方法接受的是参数列表，而apply()方法接受的是一个参数数组。

Function.prototype.myapply = function (oThis) {
    if (typeof this !== "function") {
        throw new TypeError("Function.prototype.myapply - what is trying to be bound is not callable");
    }

    if (typeof oThis === 'undefined' || oThis === null) {
        oThis = window
    }
    // 防止重复
    var fnName = 'fn' + Math.random();
    oThis[fnName] = this;
    // 得到数组
    var oArgs = arguments[1];
    var result;
    if (oArgs) {
        // 不定参数的处理
        var arr = [];
        for (var i = 0; i < oArgs.length; i++) {
            arr.push(oArgs[i]);
        }
        // console.log('oThis.fn(' + arr.join(",") + ')')
        // console.log('oThis.fn(' + arr + ')');
        // '' + [0,1,2] => "0,1,2"
        result = eval('oThis[fnName](' + arr + ')');
    } else {
        // 无参数
        result = oThis[fnName]()
    }
    delete oThis[fnName];
    return result;
};


Function.prototype.mycall = function (oThis) {
    if (typeof this !== "function") {
        throw new TypeError("Function.prototype.myapply - what is trying to be bound is not callable");
    }

    if (typeof oThis === 'undefined' || oThis === null) {
        oThis = window
    }
    // 防止重复
    var fnName = 'fn' + Math.random();
    oThis[fnName] = this;
    // 得到数组
    var result;
    if (arguments.length > 1) {
        // 不定参数的处理
        var arr = [];
        for (var i = 1; i < arguments.length; i++) {
            arr.push(arguments[i]);
        }
        // console.log('oThis.fn(' + arr.join(",") + ')')
        // console.log('oThis.fn(' + arr + ')');
        // '' + [0,1,2] => "0,1,2"
        result = eval('oThis[fnName](' + arr + ')');
    } else {
        // 无参数
        result = oThis[fnName]()
    }
    delete oThis[fnName];
    return result;
};


var array = ['a', 'b'];
var elements = [0, 1, 2];
// array.push.apply(array, elements);
// array.push.apply(undefined, []);
// Object.prototype.toString.myapply(array);
// array.push.myapply(array, elements);
array.push.mycall(array, 0, 1, 2);
console.info(array); // ["a", "b", 0, 1, 2]