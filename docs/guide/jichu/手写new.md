# 手写 new 操作符

## 看一下 new 操作符的使用
```javascript
/**
 * Car
 * @descript 定义一个构造函数
 * @param {string} name
 * @param {string} color
 */
function Car(name, color) {
    this.name = name;
    this.color = color;
}

Car.prototype.sayInfo = function () {
  console.log(`The color of the ${this.name} is ${this.color}`);
}

Car.prototype.sayName = function () {
  console.log(`My name is ${this.name}`);
}

var car = new Car('bwm', 'red');
console.log(car.name) // bwm
console.log(car.sayName()) // My name is bwm
console.log(car.sayInfo()) // The color of the bwm is red

// 调用内置函数
var array = new Array(); // []
var obj = new Object(); // {}

```

## 实现思路
用构造函数来实现new操作符，实际上会经历以下4个步骤

- 创建一个新对象
- 将构造函数的作用域赋给新对象（因此this就指向了这个对象）
- 执行构造函数中的代码（为这个新对象添加属性）
- 返回新对象

## 模拟实现
```javascript
// new操作符的简易实现
function myNew(fn) {
    var obj = {};
    obj.__proto__ = fn.prototype;
    // 这里执行fn的constructor，this指向obj 并将传入的参数一并传入
    var result = fn.apply(obj, Array.prototype.slice.call(arguments, 1));
    // 验证返回的是否object
    /** 这里应该严格注意 typeof返回object的其实还有null 简易版未做处理 **/
    return typeof result === "object" ? result : obj;
}


function Car(name, color) {
    this.name = name;
    this.color = color;
}

Car.prototype.sayInfo = function () {
  console.log(`The color of the ${this.name} is ${this.color}`);
}

Car.prototype.sayName = function () {
  console.log(`My name is ${this.name}`);
}

var car = myNew(Car, 'bwm', 'red');
console.log(car.name) // bwm
console.log(car.sayName()) // My name is bwm
console.log(car.sayInfo()) // The color of the bwm is red

// 调用内置函数
var array = new Array(); // []
var obj = new Object(); // {}

```