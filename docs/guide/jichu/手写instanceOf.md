# 手写一个instanceOf

## 两种实现方式
```javascript
const myInstanceof = (target, origin) => {
    while (target) {
      if (target.__proto__ === origin.prototype) {
        return true
      }
      target = target.__proto__
    }
    return false
  }
// 来源：阿冲
```

```javascript
function myInstanceof(left, right) {
    //基本数据类型直接返回false
    if(typeof left !== 'object' || left === null) return false;
    //getProtypeOf是Object对象自带的一个方法，能够拿到参数的原型对象
    let proto = Object.getPrototypeOf(left);
    while(true) {
        //查找到尽头，还没找到
        if(proto == null) return false;
        //找到相同的原型对象
        if(proto == right.prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
}
// 来源：掘金-神三元
```

## 总结下

```javascript
function myInstanceof(target, origin) {
    // 非object直接返回false
    if(typeof target !== 'object' || target === null) return false;
    
    let proto = Object.getPrototypeOf(target);
    while (proto) {
      if (proto === origin.prototype) {
        return true
      }
      proto = Object.getPrototypeOf(proto);
    }
    return false
}
```

---

## 原始值的instanceof

```javascript
class PrimitiveString {
  static [Symbol.hasInstance](x) {
    return typeof x === 'string'
  }
}
```

```javascript
const primitive = trye => {
  return class {
    static [Symbol.hasInstance](value) {
      return typeof value === trye
    }
  }
}
const primitiveString = primitive('string')
const primitiveNumber = primitive('number')
console.log('123' instanceof primitiveString)
console.log(123 instanceof primitiveNumber)
```
