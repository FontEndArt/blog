var one_json = {
    "1": "111",
    "2": "222",
    "3": "333"
}

var shift = [].shift;

var myJSON = {
    stringify: (function () {
        // value
        // 将要序列化成 一个JSON 字符串的值。

        // replacer 可选 
        // 如果是函数 每个属性都会经过该函数的转换和处理
        // 如果是数组 则只有包含这个数组中的属性名才会被序列化到最终的JSON字符串中
        // 如果该参数为null或未提供，则对象的所有属性都会被序列化

        // space 可选 缩进用的空白字符串
        // 如果参数是个数字，它代表有多少的空格；上限为10。
        // 该值若小于1，则意味着没有空格；
        // 如果该参数为字符串(字符串的前十个字母)，该字符串将被作为空格；
        // 如果该参数没有提供（或者为null）将没有空格。

        // toJSON 方法
        // 如果一个被序列化的对象拥有 toJSON 方法，
        // 那么该 toJSON 方法就会覆盖该对象默认的序列化行为：
        // 不是那个对象被序列化，而是调用 toJSON 方法后的返回值会被序列化

        return function stringify() {
            var value = shift.call(arguments);
            // 基础类型判断返回
            if (value === null) {
                return String(value);
            }
            switch (typeof value) {
                // 1、2、3...
                case 'number':
                case 'boolean':
                    return String(value);
                case 'string':
                    return '"' + value + '"';
                case 'undefined':
                case 'function':
                    return undefined;
            }

            // 这里已经处理了特殊类型，剩下的只可能是是一个对象了，先不管后两个参数，准备枚举
            var replacer = shift.call(arguments);
            var space = shift.call(arguments);

            // replacer  啊啊啊  好难啊
            if (replacer) {
                switch(Object.prototype.toString(replacer)) {
                    case "[object Function]":
                        break;
                    case "[object Array]":
                        break;
                    default:
                        replacer = undefined;
                }
            }

            // console.log(value, replacer, space);
            // 优先处理特殊类型
            switch (Object.prototype.toString.call(value)) {
                case "[object RegExp]":
                    return "{}";
                // new String(s)、String(s)
                case "[object String]":
                    return '"' + value.toString() + '"';
                // NaN、Infinity、-Infinity、new Number(value)、Number("1")
                case "[object Number]":
                // new Boolean(1)、Boolean(value)
                case "[object Boolean]":
                    return value.toString();
                case "[object Date]":
                    return "'" + (Date.toJSON ? value.toJSON() : value.toString()) + "'"
                case "[object Array]":
                    var res = '[';
                    for (var i = 0; i < value.length; i++) {
                        res += (i ? ', ' : '') + stringify(value[i], replacer);
                    }
                    return res + ']';
                case "[object Object]":
                    var tmp = [];
                    for (var k in value) {
                        if (value.hasOwnProperty(k))
                            tmp.push(stringify(k, replacer) + ': ' + stringify(value[k], replacer));
                    }
                    return '{' + tmp.join(', ') + '}';
            }
        }
    })(),
    parse: function (text) {
        // text
        // 要被解析成JavaScript值的字符串，关于JSON的语法格式,请参考: JSON。
        // reviver 可选
        // 转换器, 如果传入该参数(函数)，可以用来修改解析生成的原始值，调用时机在parse函数返回之前。

        // 最原始版本：
        return eval('(' + text + ')');
    }
}

console.log(JSON.stringify(one_json));
console.log(myJSON.stringify(one_json));
console.log(myJSON.parse(myJSON.stringify(one_json)));

// 转换值如果有toJSON()方法，该方法定义什么值将被序列化。
// 非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中。
// 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
// undefined、任意的函数以及 symbol 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 null（出现在数组中时）。函数、undefined被单独转换时，会返回undefined，如JSON.stringify(function(){}) or JSON.stringify(undefined).
// 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。
// 所有以 symbol 为属性键的属性都会被完全忽略掉，即便 replacer 参数中强制指定包含了它们。
// Date日期调用了toJSON()将其转换为了string字符串（同Date.toISOString()），因此会被当做字符串处理。
// NaN和Infinity格式的数值及null都会被当做null。
// 其他类型的对象，包括Map/Set/weakMap/weakSet，仅会序列化可枚举的属性。

// replacer参数可以是一个函数或者一个数组。作为函数，它有两个参数，键(key)值(value)都会被序列化。

// 如果返回一个 Number, 转换成相应的字符串被添加入JSON字符串。
// 如果返回一个 String, 该字符串作为属性值被添加入JSON。
// 如果返回一个 Boolean, "true" 或者 "false"被作为属性值被添加入JSON字符串。
// 如果返回任何其他对象，该对象递归地序列化成JSON字符串，对每个属性调用replacer方法。除非该对象是一个函数，这种情况将不会被序列化成JSON字符串。
// 如果返回undefined，该属性值不会在JSON字符串中输出。
// 注意: 不能用replacer方法，从数组中移除值(values)，如若返回undefined或者一个函数，将会被null取代。

// space 参数
// space 参数用来控制结果字符串里面的间距。如果是一个数字, 则在字符串化时每一级别会比上一级别缩进多这个数字值的空格（最多10个空格）；如果是一个字符串，则每一级别会比上一级别多缩进用该字符串（或该字符串的前十个字符）。

// toJSON 方法节
// 如果一个被序列化的对象拥有 toJSON 方法，那么该 toJSON 方法就会覆盖该对象默认的序列化行为：不是那个对象被序列化，而是调用 toJSON 方法后的返回值会被序列化，例如：