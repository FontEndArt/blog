---
sidebarDepth: 3
---
# TypeScript简单入门手册（未完）

## 前言

本文送给各位一个关于TS浅显的介绍。

## 安装

在全局安装javascirpt
```javascript
npm install -g typescript
```

与其他库中使用TypeScript，请移步 [Go!](https://www.tslang.cn/samples/index.html)

## 编译
```javascript
Syntax:   tsc [options] [file...]

Examples: tsc hello.ts
          tsc --outFile file.js file.ts
          tsc @args.txt
          tsc --build tsconfig.json
```

tsc 是直接将ts文件编译成js的命令。具体参数请全局安装typescript后执行 ```tsc -h``` / ```tsc --help``` 查看。

## tsconfig.json
```tsconfig.json``` 文件指定了用来编译这个项目的根文件和编译选项。

同时，如果这个目录中存在 ```tsconfig.json```，那么就意味着这个目录是TypeScript项目的根目录。

### 创建 ```tsconfig.json``` ：

- 手动创建，里面按要求进行配置。
- ```tsc --init``` 生成，会生成一个基础的 ```tsconfig.json``` 文件

### 使用 ```tsconfig.json``` ：
- 不带任何输入文件的情况下调用tsc，编译器会从当前目录开始去查找tsconfig.json文件，逐级向上搜索父目录。
- 不带任何输入文件的情况下调用tsc，且使用命令行参数--project（或-p）指定一个包含tsconfig.json文件的目录。

eg: 
```javascript
tsc

tsc --build tsconfig.json

tsc -p ts-project
```

几个基本的配置

```json
{
    "compilerOptions" : {
        "target" : "es5",   //编译成es5
        "lib": ["dom", "es7"],
        "module" : "commonjs",  //模块化用commonjs规范
        "outDir" : "out",       //编译生成的目录
        "sourceMap" : true      //是否启用sourceMap
    }
}
```

> 注意：配置 paths 的时候 必须要配置 baseUrl。如果后面带*，前面的也需要带*。

## 基础类型
TypeScript中的类型分为基础类型和高级类型，入门介绍中仅介绍基础类型。

TypeScript支持与JavaScript几乎相同的数据类型，此外还提供了实用的枚举类型方便我们使用。


### boolean
表示声明一个 ```boolean``` 类型的值。和其他语言一样，允许的值有 ```true``` / ```false```。

```TypeScript
let isBool: boolean;
let isBoolTrue: boolean = true;
let isBoolFalse: boolean = false;
```

### number
表示声明一个数字，和JavaScript一样，TypeScript里的所有数字都是浮点数。而且不仅支持十进制和十六进制字面量，还支持二进制和八进制字面量。

```TypeScript
let oneNumber : number;
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
```

### string
表示声明一个字符串。和JavaScript一样，可以使用双引号（```"```）或单引号（```'```）表示字符串。也可以使用模版字符串来表示，用来定义多行文本或内嵌表达式，使用反引号包围（``` ` ```），并且以```${ expr }```这种形式嵌入表达式。

```TypeScript
let str: string;
let str1: string = "str1";
let str2: string = 'str2';
let str3: string = `
    <div>
        ${str1}
    </div>
`;
```

### Array<>/[]
TypeScript像JavaScript一样可以操作数组元素。 有两种方式可以定义数组。

- []
- Array<元素类型>

```TypeScript
let arr1: number[] = [1, 2, 3]
let arr2: string[] = ['1', '2', '2']

let arr3: Array<number> = [1, 2, 3]

// 详见后面interface部分
interface person = {
    name: string;
    age?: number;
}

let arr4: Array<person> = [
    {
        name: "三儿",
        age: 23
    },
    {
        name: "狗蛋",
    }
]
```

### Tuple
元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。

比如：
```TypeScript
let x: [string, number];

x = ['123', 123]; // ok

x = [123, '123']; // Error
```

当访问一个越界的元素，会使用联合类型替代：

比如：
```TypeScript
x[5] = '234567890'; // ok 因为x[5]是越界元素（超出了我们所定义的元祖的类型），所以 它的类型就是 string|number

x[6] = true; // error 因为boolean并不属于 string | number 中的任何一种
```

> 联合类型共同拥有的方法是可以被调用的。


### enum

enum 枚举类型 是TypeScript对JavaScript标准数据类型的一个补充，像Java等其他语言一样，使用枚举类型可以为一组数值赋予一个友好的名字。

比如：
```TypeScript
enum Color {Red, Green, Blue}
```

在默认情况下，枚举类型中的数值从0开始为元素编号。 所以上面的如果用ES5来表示应该是下面这样。

```javascript
var Color;

(function(Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}))

console.log(Color[0]) // Red
console.log(Color['Red']) // 0
```

所以，枚举类型定义的 ```Color``` 中的值是一个相互映射的关系。

我们也可以自定义其中代表的值，比如：
```TypeScript
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;

console.log(c) // 2
```

::: tip 作用
枚举类型为我们提供了一个可以枚举它的值从而来获取它名字的功能。
:::

## TypeScript函数

函数是JavaScript应用程序的基础。TypeScript为JavaScript函数添加了额外的功能，让我们可以更容易地使用。比如：定义类型、可选参数和默认参数等。

## 参数类型与函数返回值

在JavaScript中，我们可以这样定义函数：
```javascript
function test(a,b) { return a + b; }
let test1 = function (a,b) { return a + b; }
```

虽然一般情况下，我们在TypeScript中也可以这样使用，但是我们为了代码可读性，或者为了通过lint检查，我们需要为函数定义行为，让我们为上面那个函数添加类型：

```TypeScript
function test(a:number, b:number): number { return a + b; }
let test1 = function (a:number, b:number): number { return a + b; }
```

如上面所示，我们可以给每个参数添加类型之后再为函数本身添加返回值类型。

::: tip 提示
官方说TypeScript能够根据返回语句自动推断出返回值类型，因此我们通常省略它。这在国内是不存在的，反正我是没见过多少省略的，倒是见过省略后，推断的返回值并不是自己业务想要的。emm... 个人建议哈，国内开发者还是带上返回值吧，any除外。
:::

在声明的时候也可以前面指定参数的具体意义：
```TypeScript
const myadd1:(name: string, age: number) => number = (n:string, a:number): number => 123;

// 或

const myadd1:(name: string, age: number) => number = (n, a) => 123;
```

### 可选参数和默认参数

TypeScript里的每个函数参数都是必须的。也就是说编译器会检测，形参和实参的个数是否一致。

```TypeScript
function buildName(firstName: string, lastName: string) {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // error, too few parameters
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");         // ah, just right
```

TypeScript中的可选参数是靠在参数名旁边使用 ```?``` 来实现参数是否可选的。

```TypeScript
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}

let result1 = buildName("Bob");  // works correctly now
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");  // ah, just right
```

::: tip 注意
可选参数必须跟在必须参数后面。 也就是可选参数后面不能出现确定参数。
```TypeScript
//这样是不可以的
function test( arg1: string, arg2?: number, arg3: number) {}
```
:::

和ES6类似，我们在TypeScript中也可以使用 **默认参数**，和我们在给变量赋值的时候类似。

```TypeScript
function test( arg1: string, arg2: number = 123 ) {}
```

### 可变参数

事实上我们在写代码的过程中，有不确定要传入函数的参数个数的场景，就可以使用可变参数。

使用剩余参数的形式，声明一个数组。

```TypeScript
const peopleName = ( firstName: string, ...names: string[] ) => firstName + names.join(' ');
let pn = peopleName('1','2','3'); 
```

::: tip
使用可变参数的时候，一定要注意剩余参数的类型。
:::

### TypeScript中的this

如果你要在TypeScript中使用this，需要你在函数参数中，显示的提供一个this参数。因为 this来自对象字面量里的函数表达式。this参数是个假的参数，它出现在参数列表的最前面：

```TypeScript {2}
function test (this: void) {
    // make sure `this` is unusable in this standalone function
}
```

::: tip 提示
在TypeScript写的某些业务中你可能需要更多的使用箭头函数来维护this
:::

### 函数的重载

TypeScript同样提供了函数的重载。

```TypeScript
function attr(name : string) : string;
function attr(age : number) : number;
function attr(nameAndAge : any) : any{
    if(nameAndAge && typeof nameAndAge === 'string'){
        console.log('姓名')
    } else{
        console.log('年龄');
    }
}
attr('wang');
attr(21);
```

为了让编译器能够选择正确的检查类型，它与JavaScript里的处理流程相似。 它查找重载列表，尝试使用第一个重载定义。 如果匹配的话就使用这个。 因此，在定义重载的时候，一定要把最精确的定义放在最前面。

::: tip 注意
```function attr(nameAndAge : any) : any```并不是重载列表的一部分，因此这里只有两个重载：一个是接收对象另一个接收数字。 以其它参数调用 ```attr``` 会产生错误。
:::

TypeScript 中的函数重载也只是多个函数的声明，具体的逻辑还需要自己去写，他并不会真的将你的多个重名 function 的函数体进行合并。

## TypeScript中的类

> 今天写不下去了，明天继续吧