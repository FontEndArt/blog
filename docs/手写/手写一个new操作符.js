// 手写一个new操作符
function myNew() {
    // 得到 arguments[0] 并修改arguments
    var oFunc = [].shift.call(arguments);
    if (typeof oFunc !== 'function') {
        throw(new Error("myNew need first Function arguments !"));
    }

    // 创建一个新的对象
    var obj = {};
    // 将obj原型指向原函数的原型
    obj.prototype = oFunc.prototype;
    // 将参数给到 oFunc 并执行 this是obj
    var result = oFunc.apply(obj, arguments);
    //确保new出来的是一个对象
    return typeof result === "object" ? result : obj;
}


function Person(name, age) {
    this.name = name;
    this.age = age;
    this.say = function () {
        console.log("I am " + this.name)
    }
}

//通过new创建构造实例
var person1 = new Person("Curry", 18);
console.log(person1.name);      //"Curry"
console.log(person1.age);       //18
person1.say();      //"I am Curry'

//通过realize()方法创造实例
var person2 = myNew(Person, "Curry", 18);
console.log(person2.name);      //"Curry"
console.log(person2.age);       //18
person2.say();      //"I am Curry'

var person3 = myNew({});
var person3 = myNew();