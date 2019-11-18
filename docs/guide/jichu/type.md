# JS数据类型

## 堆栈内存

js中有两大内存：堆内存(heap)、栈内存(stack)
- 堆内存作用：用来存储内容的(对象存储的是键值对，函数存储的是代码字符串)
- 栈内存作用：也可以被称为作用域，是代码解析和执行的环境

## JS中的基本(原始)数据类型

js中的基础数据类型，这些值都有固定的大小，往往都是保存在内存空间中，由系统自动分配存储空间。我们可以直接操作保存在栈（stack）内存空间里面的值，因此**基本数据类型都是按值访问的**

JS中，存在的7中原始值分别是：

- string
- number
- boolean
- undefined
- null
- symbol(es6)
- bigint

**基本数据类型的值是不可变的**

```javascript
var str = "string";
str.toUpperCase(); // STRING
console.log(str); // string
```

**按值进行比较**

```javascript
  var a = 1;
  var b = true;
  console.log(a == b); // true
  console.log(a === b); // false
```

其中，```a == b```，虽然数据类型不相同（true为boolean, 1为Number）但在比较之前js自动进行了数据类型的隐式转换

> 数据类型的隐式转换: 在算数运算符时，运算符两边的数据类型可以是任意的，比如，一个字符串可以和一个数字相加。但是如果两边数据不统一的话，CPU就无法进行计算，所以我们的编译器会自动的对数据进行隐式类型转换后再进行计算。

```==``` 是进行值比较所以为true

```===``` 不仅比较值还要比较数据类型所以为false

栈内存中保存了变量的标识符和变量的值

```javascript
var a,b;
a = 1;
b = a;
console.log(a); // 1
console.log(b); // 1
a = 2;
console.log(a); // 2
console.log(b); // 1
```

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g926gfymwmj30nm07174h.jpg)


## JS中的引用数据类型

由于引用数据类型存储的值过于复杂(结构复杂即内容较多)，渲染引擎会在堆内存（Heap）中开辟一个新的内存空间，单独来存储这些值，最后把内存空间引用地址赋值给对应的变量，后期所有的操作都是基于地址找到空间，然后对空间中的内容进行操作。

在JS中引用数据类型被统称为Object:

- Object
    + Object
    + Function
    + Array
    + RegExp
    + Date
    + Math

> 这里要特殊注意的是 ```typeof null``` 也是 ```object```.

**引用类型的值是可变化的**

```javascript
var obj = { name: 'renbo' };
obj.name = 'zhangsan';
obj.age = 28;
obj.say = function () {
    return 'My name is' + this.name + 'I‘m' + this.age+ 'years old';
}
obj.say(); //My name is zhangsan I‘m 28 years old
```

**引用类型是按引用地址进行比较**

```javascript
var obj = {};
var obj1 = {};
console.log(obj == obj1); // false
console.log(obj === obj1) // false
```

栈内存中保存了变量标识符和指向堆内存中该对象的指针

堆内存中保存了对象的内容

如以下示例所示：

```javascript
var a = { name: 'renbo' };
var b = a;
a.name = 'zhangsan';
console.log(b.name); // zhangsan
b.age = 28;
console.log(b.age) // 28
b.say = function () {
    return 'My name is' + this.name + 'I‘m' + this.age+ 'years old';
}
console.log(a.say()); //My name is zhangsan I‘m 28 years old
var c = {
    name:'zhangsan',
    age:28
}
```

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g926lmdygij30rg0jj0u3.jpg)

## typeof

经常用以检查变量是不是基本数据类型

特殊的有
- null： typeof null // object
- function： typeof function(){} // function

```javascript
var a;
a = "hello";
typeof a; // string

a = true;
typeof a; // boolean

a = 1;
typeof a; // number 

a = null;
typeof a; // object

typeof a; // undefined

a = Symbol();
typeof a; // symbol

a = function(){}
typeof a; // function

a = [];
typeof a; // object

a = {};
typeof a; // object

a = /renbo/g;
typeof a; // object   
```

## Object.prototype.toString
除 typeof 之外，我们还经常用另一种方法来检测变量的数据类型。

```javascript
const toString = Object.prototype.toString;
// 首字母大写
function upperFirst (word) {
    return word[0].toUpperCase() + word.slice(1);
}
// 判断类型
function isType (obj, type) {
    return type
        ? toString.call(obj) === '[object ' + upperFirst(type) + ']'
        : toString.call(obj).match(/(?![\[object ]).*(?=\])/i)[0].toLowerCase();
};

isType("111") // string
isType("111", "string") // true
```

## instanceof
经常用来判断引用类型的变量具体是某种类型

```javascript
var a;
a = function(){}
a instanceof Function; // true

a = [];
a instanceof Array; // true

a = {};
a instanceof Object; // true

a = /renbo/g;
a instanceof RegExp ; // true    
```

具体的instanceOf详见 [手写一个instanceOf](./手写instanceOf.html)
