Function.prototype.mybind = function (oThis) {
    if (typeof this !== 'function') {
        // closest thing possible to the ECMAScript 5
        // internal IsCallable function
        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var oArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function () { },
        fBound = function () {
            console.log(this);
            return fToBind.apply(
                this instanceof fToBind
                    ? this
                    : oThis,
                oArgs.concat(Array.prototype.slice.call(arguments))
            );
        };
    
    // 维护原型关系
    if (this.prototype) {
        // 当执行Function.prototype.bind()时, this为Function.prototype 
        // this.prototype(即Function.prototype.prototype)为undefined
        fNOP.prototype = this.prototype; 
      }
      // 下行的代码使fBound.prototype是fNOP的实例,因此
      // 返回的fBound若作为new的构造函数,new生成的新对象作为this传入fBound,新对象的__proto__就是fNOP的实例
      fBound.prototype = new fNOP();

    // fBound.prototype = null;

    return fBound;
}

this.x = 9;    // 在浏览器中，this指向全局的 "window" 对象
var module = {
    x: 81,
    getX: function () { console.log(this); return this.x; }
};

// console.log(module.getX()); // 81
var retrieveX = module.getX;
retrieveX();
// 返回9 - 因为函数是在全局作用域中调用的

// 创建一个新函数，把 'this' 绑定到 module 对象
// 新手可能会将全局变量 x 与 module 的属性 x 混淆
var boundGetX = retrieveX.bind(module);
var boundGetY = retrieveX.mybind(module);
// console.log(boundGetX()); // 81
console.log(boundGetY()); // 81