# 原型及原型链

## 前言

大家都知道，JavaScript是一种弱类型语言，和Java这种传统的面向对象语言不同，JS没有类的概念（ES6的class也只不过是语法糖，而不是真正意义上的类，其实质还是基于原型链）。在JavaScript中，一切皆是对象。

在基于类的传统面向对象的编程语言中，对象由类实例化而来，实例化的过程中，类的属性和方法会拷贝到这个对象中；对象的继承实际上是类的继承，在定义子类继承于父类时，子类会将父类的属性和方法拷贝到自身当中。因此，这类语言中，对象创建和继承行为都是通过拷贝完成的。

但在JavaScript中，对象的创建、对象的继承（更好的叫法是对象的代理，因为它并不是传统意义上的继承）是不存在拷贝行为的。

> 引用 掘金-艾特老干部

后面会放一张大家应该都见过的神图，神图出，仙魔退避。

## 什么是原型和原型链

JavaScript中的对象，都有一个内置属性```[[Prototype]]```，指向这个对象的原型。对象的原型实际上也是一个对象，它和对象本身是完全独立的两个对象。

当查找一个属性或方法时，如果在当前对象中找不到定义，会继续在当前对象的原型对象中查找；如果原型对象中依然没有找到，会继续在原型对象的原型中查找（原型也是对象，也有它自己的原型）；如此继续，直到找到为止，或者查找到最顶层的原型对象中也没有找到，就结束查找，返回undefined。

这个查找的过程是一层层不断的向```[[Prototype]]```递进的，这个操作是一个链式的操作，而这些原型链接组成的链条，就是原型链。拥有相同原型的多个对象，他们的共同特征正是通过这个查找模式体现出来的。

比如函数的继承：
```javascript
function person(){};
function person1(){};
person1.prototype = Object.create(person.prototype, {
    constructor: {
        value: person1
    }
});
console.log(person1); // function person1(){}
new person1();
// person1.__proto__ = person
// person1.__proto__.constructor = function person1() {}
// person1.__proto__.__proto__.constructor = function person() {}
```

## 普通对象和函数对象

```javascript
// 普通对象
var obj1 = {};
var obj2 = new Object();
var obj3 = new person();

// 函数对象
function person(){}; 
var person1 = function(){};
var person2 = new Function('aaa','console.warn(aaaa)');

console.log(typeof Object); //function 
console.log(typeof Function); //function 

console.log(typeof person); //function
console.log(typeof person1); //function
console.log(typeof person2); //function
console.log(person instanceof Function) // true 

console.log(typeof person); //function
console.log(typeof person1); //function
console.log(typeof person2); //function
console.log(obj3 instanceof Object)  // true
```

通过以上实例我们知道 new Function 构建的都是函数对象，其余都是普通对象

## 通过字面量方式创建对象
当通过字面量方式创建对象时，它的原型就是Object.prototype。

虽然我们无法直接访问内置属性[[Prototype]]，但我们可以通过Object.getPrototypeOf()或对象的__proto__获取对象的原型。

```javascript
var obj = {};
Object.getPrototypeOf(obj) === Object.prototype;   // true
obj.__proto__  === Object.prototype;            // true
```

## 通过构造调用创造对象

构造调用，经常被我们称为构造函数，是因为我们在其他语言中的习惯叫出来的。在JavaScript中同样没有构造函数的概念，所有的函数都是平等的，只不过用来创建对象时，函数的调用方式不同而已。

通过函数的构造调用创建对象，也是一种常见的创建对象的方式。

基于同一个函数创建出来的对象，理应可以共享一些相同的属性或方法，但这些属性或方法如果放在Object.prototype里，那么所有的对象都可以使用它们了，作用域太大，显然不合适。

于是，JavaScript在定义一个函数时，同时为这个函数定义了一个 默认的prototype属性，所有共享的属性或方法，都放到这个属性所指向的对象中。由此看出，通过一个函数的构造调用创建的对象，它的原型就是这个函数的prototype指向的对象。

```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.sayName = function () {
    console.log(this.name)
}
var person1 = new Person('zhansan', 29);
var person2 = new Person('lisi', 29);

person1.sayName() // zhansan
person2.sayName() // lisi
person1.__proto__ === Person.prototype; // true
```

## Object.create()
还有一种常用的创建对象的方式是使用Object.create()。这个方法会以你传入的对象作为创建出来的对象的原型。

```javascript
var obj = {};
var obj2 = Object.create(obj);
obj2.__proto__ === obj;       // true
```

上面提到过的继承也是利用了Object.create();

通过```Object.create(null)```可以创建一个空对象，即没有原型的对象。常常在优化的时候使用。

## proto,prototype,constructor

- __proto__: 在JavaScript权威指南中指出每个js对象一定对应一个原型对象，并从原型对象继承属性和方法
- prototype: 当创建函数对象时，js会自动为这个函数添加prototype属性（这里明确一下只有函数对象才会有此属性）
- 每个原型都有一个 constructor 属性指向关联的构造函数。

> 函数的prototype中还有一个constructor方法，建议大家就当它不存在，它的存在让JavaScript原型的概念变得更加混乱，而且这个方法也几乎没有作用。当然在上述处理继承的时候修改了constructor的值，不过希望大家还是要以实践为主，存在即合理，重点在于如何去使用它们。

---

> __proto__指向当前对象的原型，prototype是函数才具有的属性，默认情况下，new 一个函数创建出的对象，其原型都指向这个函数的prototype属性。

如图可以加深理解：
![](https://tva1.sinaimg.cn/large/006y8mN6ly1g9297yenmgj30rr0cmglv.jpg)

虽然person1和person2这两个个实例都不包含属性和方法，但是我们可以通过查找对象属性来实现调用person1.sayName()

此时我们来确定两个实例对象返回的原型指针是否一样(Object.getPrototypeOf 此方法可以获取对象的原型)

```javascript
Object.getPrototypeOf(person1) === Person.prototype // true
Object.getPrototypeOf(person1) === Person.prototype // true
```

通过如上输出结果得知他们内部都有一个指向Person.prototype的指针也就是

```javascript
person1.__proto__ === Person.prototype
person2.__proto__ === Person.prototype
```

经过上面解释这么多我们得出的结果就是如下

```javascript
person1.__proto__ === Person.prototype
Person.prototype.constructor == Person
```

> instanceOf的原理实质上就是在原型链上查找是否存在原型一致的对象

## Object

- js几乎所有对象都是Object; 典型对象继承属性（包括方法）
- 所有引用类型的原型链上必然存在Object的原型（Object.create(null)除外）
- new Object 出来的实例是普通对象我们前面说过只有函数对象才有prototype
- Object 实际是function Object跟function Function 类似
- Object.prototype是Object构造函数的属性。它也是原型链的终结

```javascript
function Object (name,age) {
    this.name = name;
    this.age = age;
}
Object.prototype.sayName = function () {
    console.log(this.name)
}
object = new Object('zhangsan', 20)
object.sayName()
```

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g929qsheyrj30rr0egaaf.jpg)

我们可以得出结论Object.prototype.__proto__ === null

### null和undefined区别
- null === undefined为false，null == undefined为true 说明只是值相等
- null是一个表示”无”的对象，转为数值时为0；undefined是一个表示”无”的原始值，转为数值时为NaN。
- null表示变量未指向任何对象，undefined表示变量被声明但是没有被赋值（除非是主动赋值为undefined，这个时候是有意义的）

## Function
- 在js中每个函数实际上都是一个Function对象。
- 使用Function构造器生成的Function对象是在函数创建时解析的(```new Function('xxx')```),而其他函数方式是跟其他代码一起解析，所以较为低效
- 全局的Function对象没有自己的属性和方法，通过Function.prototype继承部分属性和方法。
- 我们说js中万物皆对象，Function也也是对象，只不过是函数对象所以```Function.prototype.__proto__```指针指向```Object.prototype```
- ```Object.__proto__``` 指针指向 ```Function.prototype```

Function创建的函数一般在全局作用域中被创建，但并不会像其他函数一样产生闭包，所以只能自己内部和全局的变量

eg:
```javascript
function Function (name,age){
    this.name  = name
    this.age = age
}
Function.prototype.sayName = function () {
    console.log(this.name)
}
f = new Function('zhangsan', 20)
f.sayName();
```

这里我们同样以图例的形式来说明Function的proto,prototype,constructor

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g929uma4vsj30rs0ekaag.jpg)

我们可以看到 ```Object.prototype === Function.prototype.__proto__```

## 将Function，Object，Person链接起来

我们把上面所说的图整合到一起是什么样子的呢？

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g929wf44vfj30ub0u0wg9.jpg)

通过以上图例我们可以观察到其实js原型链就是由相互关联的链条组成，查找属性或者方法的过程就是图中红色链条的过程，如果找到则终止否则直到返回null。

通过上面我们可以得出结论：

- 只有函数对象才有 ```prototype```，但是每个对象（普通对象和函数对象）都拥有```proto```属性
- 原型对象都有一个 ```constructor``` 属性指向它们的构造函数（也就是自己）
- 原生对象既是对象，也是构造函数
- 实例对象的隐式原型始终指向构造函数的显式原型（```person1.__proto__ > Person.prototype```）
- 原型链的查找过程链接依赖 ```proto``` 指针逐级向上，并且原型链的尽头始终为null

## 神图

神图出，仙魔退避。

只要你完全整明白这张神图，那么原型链对你来说就是小case了。

下面上神图：

![](https://tva1.sinaimg.cn/large/006y8mN6gy1g92a4koyj5j30eg0gadgc.jpg)

## 结语

掌握原型和原型链的相关知识，有助于我们更好的了解JavaScript本身。同时我们也要加强对于面向对象语言的了解，这样才能扩展我们的视野。
