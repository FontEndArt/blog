# 透过3D立方体深入理解perspective和translateZ的关系

## 前言
对于js全景图向往已久，貌似从16年开始看到的。当时自己还是一个小菜鸡（虽然现在也不是大佬），由于工作原因前端的很多方面都没有及时了解，现在恶补中。。。

## 准备工作
了解transform中的一些基本概念，比如：

[rotate](https://developer.mozilla.org/zh-CN/docs/Web/CSS/rotate) 旋转

[translate](https://developer.mozilla.org/zh-CN/docs/Web/CSS/translate) 定义 2D 转换

[translateZ](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translateZ) 定义 3D 转换

[perspective](https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective) 为 3D 转换元素定义透视视图。

[transform-style: preserve-3d;](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-style) 指定子元素定位在三维空间内。另外，该属性是非继承的。

## 要开始讲咯~
有一个立方体的demo放在我的github中，如图：

![](https://user-gold-cdn.xitu.io/2019/4/11/16a0a5b4bcab2ca1?w=1735&h=928&f=png&s=53754)

[demo链接在这里](https://fontendart.github.io/%E5%89%8D%E7%AB%AF/demo/%E7%AB%8B%E6%96%B9%E4%BD%93%E5%85%A8%E6%99%AF/index.html)

[源码链接](https://github.com/FontEndArt/FontEndArt.github.io/blob/master/%E5%89%8D%E7%AB%AF/demo/%E7%AB%8B%E6%96%B9%E4%BD%93%E5%85%A8%E6%99%AF/index.html)

---
## 立方体原理
立方体我们大家都知道，是由六个的正方形组成的正多面体。如下图：
![](https://user-gold-cdn.xitu.io/2019/4/11/16a0a5f986cac9d6?w=198&h=220&f=png&s=58040)

---
## 全景图
这里我们用全景图来举例，帮助我们理解perspective和translateZ。

全景图的组成方式有两种，分别是 立方体、球体（棱柱），我们这里使用的是立方体来举例。

> 这里我还没有搞明白**球体**和**棱柱**的区别, 所以等我理解以后，咱们后面再说

---
## 制作立方体
### 一、制作6个面
因为立方体是由6个正方形组成，所以我们先来制作它的组成部分，最后再进行组装。

我们这里用face来当做面，而top、bottom、left、right、after、first来分别代表上、下、左、右、前、后几个面。

> 这里我们的视角正对着first

我们定义了一个窗口stage、透视盒子ctx 和 立方体容器facelist。

我们先将窗口定义为800*800相对页面垂直居中

我们先将立方体定义为宽高为800px;
接下来将每个面的宽高也定义为800px, 并给予每个面一个不同的颜色用以区分。

代码如下：
```
<!DOCTYPE html>
<html lang="zh">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>立方体全景</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    html,
    body {
      height: 100%;
      overflow: hidden;
    }
    
    .stage {
      width: 800px;
      height: 800px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    
    .face {
      width: 800px;
      height: 800px;
    }
    
    .top {
      background: green;
    }

    .bottom {
      background: yellow;
    }

    .after {
      background: red;
    }

    .left {
      background: black;
    }

    .right {
      background: blue;
    }

    .first {
      background: blueviolet;
    }
  </style>
</head>

<body>
  <div class='stage'>
    <div class='ctx'>
      <div class='facelist'>
        <div class='face top'>1</div>
        <div class='face bottom'>2</div>
        <div class='face after'>3</div>
        <div class='face left'>4</div>
        <div class='face right'>5</div>
        <div class='face first'>6</div>
      </div>
    </div>
  </div>

  <script>

  </script>
</body>

</html>
```

### 二、组合
到这里我们立方体的6个面制作完成，但是他们是一次排列在页面中，并不是我们想要的；

接下来让我们将他们先放在一起。给face添加position: absolute;

这样他们是重合在一起的，我们需要这样操作：

#### 1. 把它们旋转到对应的角度

    比如：
    
    .top的面我们将它绕X轴旋转90度；
    
    .left的面我们将它绕Y轴旋转90度；
    
    ···
![](https://user-gold-cdn.xitu.io/2019/4/11/16a0b05043eb5dc2?w=423&h=424&f=png&s=83759)
图片摘自[思否](https://segmentfault.com/a/1190000006880856)
```
<!DOCTYPE html>
<html lang="zh">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>立方体全景</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    html,
    body {
      height: 100%;
      overflow: hidden;
    }

    .stage {
      width: 800px;
      height: 800px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .face {
      width: 800px;
      height: 800px;
      position: absolute;
    }

    .top {
      background: green;
      transform: rotateX(90deg);
    }

    .bottom {
      background: yellow;
      transform: rotateX(90deg);
    }

    .after {
      background: red;
      transform: rotateX(0deg);
    }

    .left {
      background: black;
      transform: rotateY(90deg);
    }

    .right {
      background: blue;
      transform: rotateY(90deg);
    }

    .first {
      background: blueviolet;
      transform: rotateY(0deg);
    }
  </style>
</head>

<body>
  <div class='stage'>
    <div class='ctx'>
      <div class='facelist'>
        <div class='face top'>1</div>
        <div class='face bottom'>2</div>
        <div class='face after'>3</div>
        <div class='face left'>4</div>
        <div class='face right'>5</div>
        <div class='face first'>6</div>
      </div>
    </div>
  </div>

  <script>

  </script>
</body>

</html>

```

旋转后的图形  应该是这样的
![](https://user-gold-cdn.xitu.io/2019/4/11/16a0af8709b2c5b4?w=504&h=457&f=png&s=5729)

这样看起来好像什么都没有变化，我们来看看这个图：
![](https://user-gold-cdn.xitu.io/2019/4/11/16a0afcc8fc39262?w=1260&h=565&f=png&s=27642)

把每个面都重叠在黑色的原点就是他的实际模样，也就是说现在还不是一个立方体 

因为他们的中心都是重合的，如何将它们变成立方体呢？看下面的步骤


#### 2. 将他们按照对应的边长通过translateZ推开
    
    由于我们这里是立方体，所以直接就是正方形的边长  在这里也就是±400px

    给它们设置上对应的translateZ值，让多个面往不同方向平移，直到组成一个完整的立方体。
```
<!DOCTYPE html>
<html lang="zh">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>立方体全景</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    html,
    body {
      height: 100%;
      overflow: hidden;
    }

    .stage {
      width: 800px;
      height: 800px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .face {
      width: 800px;
      height: 800px;
      position: absolute;
    }

    .top {
      background: green;
      transform: rotateX(90deg) translateZ(400px);
    }

    .bottom {
      background: yellow;
      transform: rotateX(90deg) translateZ(-400px);
    }

    .after {
      background: red;
      transform: rotateX(0deg) translateZ(-400px);
    }

    .left {
      background: black;
      transform: rotateY(90deg) translateZ(-400px);
    }

    .right {
      background: blue;
      transform: rotateY(90deg) translateZ(400px);
    }

    .first {
      background: blueviolet;
      transform: rotateY(0deg) translateZ(400px);
    }
  </style>
</head>

<body>
  <div class='stage'>
    <div class='ctx'>
      <div class='facelist'>
        <div class='face top'>1</div>
        <div class='face bottom'>2</div>
        <div class='face after'>3</div>
        <div class='face left'>4</div>
        <div class='face right'>5</div>
        <div class='face first'>6</div>
      </div>
    </div>
  </div>

  <script>

  </script>
</body>

</html>
```

#### 3. 加上3D效果

我们给ctx盒子加上3D属性 让3D变得立体化
```
···
    .ctx {
      /* 3d视角 */
      transform-style: preserve-3d;
    }
···
```

#### **4.将我们的视角推到中心点**

先调整stage的视距，将我们的眼睛（视角）调整到ctx的first面的位置  

这个时候我们距离after面有800px的距离 离ctx的面有400px的距离

然后我们将ctx这个透视盒子向外推1/2width的距离 也就是400px，将我们的眼睛（视角）置于中心

不理解的童鞋 请注意看下面的单独讲解；

```
  .stage {
      width: 800px;
      height: 800px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      /* 从何处（哪里）查看一个元素的角度 */
      /* 从当前视角到对应面的距离  在这里是 stage到ctx的距离 */
      perspective: 400px;
      /* 调整角度 */
      /* perspective-origin: 50% 100%; */
    }

    .ctx {
      /* 3d视角 */
      transform-style: preserve-3d;

      /* 把视角推到中心 */
      transform: translateZ(400px) rotateY(0deg);
    }
```
### 三、完事

这样我们已经将一个3D立方体做出来了  并且把我们的视角放在了这个立方体内部的中心点。

我们可以通过 改变 **perspective-origin** 的值来观察整个立方体

调整角度，在不同角度看到的立方体，有助于更快的理解perspective。


## 单独讲解perspective和translateZ

我呢找到了一个帮助我理解的图片：

![](https://user-gold-cdn.xitu.io/2019/4/11/16a0b0e14020f01c?w=593&h=587&f=png&s=86945)

这里Z指的就是 translateZ ，d指的是 perspective

这里我们要知道，Z轴向外为正值。

所以总结下就是：

* perspective是指 **从当前视角到所看平面的距离**
* translateZ指的是 **从所看平面到推进视角之间的距离，大白话就是从当前距离 把你看的拉进或者拉远的距离**
* 人的视角在3D投影效果中是 **近大远小**

---
## 重中之重
理解 **近大远小** 和 **眼睛与平面的透视关系** 也就是上面那张图！！！

## 结语
这些东西对于初学css 3D的人来说可能理解起来比较吃力；

对于大部分人来说，其实只靠读文章是不可能完全理解的；

所以还有一句名言警句送给大家：

实践是检验真理的唯一标准
---

希望大家可以一直以实践为主、阅读为辅，自己真正理解的才是自己的。谢谢！
