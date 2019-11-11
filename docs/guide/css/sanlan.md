# 深入理解圣杯布局和双飞翼布局

## 前言

最近我朋友在群里发了一张图，说为什么main的宽度100%了，sub还是可以覆盖它呢？看来是时候带他回忆一波经典的圣杯布局和双飞翼布局了。正好最近看到好多面试题都有提到。 /笑哭

群内链接如下图：

![](https://raw.githubusercontent.com/FontEndArt/blog/master/images/juejin/16a0c9554c172710.png)

## 字面意思

圣呗布局和双飞翼布局从字面意思来看是这样的：

> 一个像圣杯或者像展翅的禽类这样的布局

**通俗的来说就是左右两栏固定宽度，中间部分自适应的三栏布局。**

## 两者本质

![](https://raw.githubusercontent.com/FontEndArt/blog/master/images/juejin/16cfefeb90d9ec0b.png)

## 圣杯布局

1. 首先把left、middle、right都放出来
2. 给它们三个设置上float: left, 脱离文档流；
3. 一定记得给container设置上overflow: hidden; 可以形成BFC撑开文档
4. left、right设置上各自的宽度
5. middle设置width: 100%;

**接下来比较重要了：**

6. 给left、middle、right设置position: relative;
7. left设置 left: -leftWidth, right设置 right: -rightWidth;
8. container设置padding: 0, rightWidth, 0, leftWidth;
---
我注意到圣杯布局的left、middle、right都有position: relative;

设:
```css
.left width:200px
.right width:220px
``` 

那么下面的这些属性为什么要存在？
```css
.container 上面的paddind
.left 的left: -200px;
.right 的right: -220px;
```

**因为不这样设置  会遮挡middle的内容**

可以自己尝试一下下

---

圣杯布局示例代码如下：

```html
<!DOCTYPE html>
<html lang="zh">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>圣杯布局</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    .header,
    .footer {
      height: 100px;
      line-height: 100px;
      background-color: green;
      text-align: center;
      font-size: 30px;
      font-weight: bolder;
    }

    .footer {
      background-color: goldenrod;
    }

    .container {
      padding: 0 220px 0 200px;
      overflow: hidden;
    }

    .left,
    .middle,
    .right {
      position: relative;
      float: left;
      min-height: 130px;
      word-break: break-all;
    }

    .left {
      margin-left: -100%;
      left: -200px;
      width: 200px;
      background-color: red;
    }

    .right {
      margin-left: -220px;
      right: -220px;
      width: 220px;
      background-color: green;
    }

    .middle {
      width: 100%;
      background-color: blue;
    }
  </style>
</head>

<body>
  <div class="header">header</div>
  <div class="container">
    <div class="middle">
      <h4>middle</h4>
      <p>
        middlemiddlemiddlemiddlemiddlemiddlemiddlemiddle
        middlemiddlemiddlemiddlemiddlemiddlemiddlemiddle
        middlemiddlemiddlemiddlemiddlemiddlemiddlemiddle
        middlemiddlemiddlemiddlemiddlemiddlemiddlemiddle
        middlemiddlemiddlemiddlemiddlemiddlemiddlemiddle
        middlemiddlemiddlemiddlemiddle
      </p>
    </div>
    <div class="left">
      <h4>left</h4>
      <p>
        leftleftleftleftleftleftleftleftleftleftleftleft
        leftleftleftleftleftleftleftleftleftleftleftleft
        leftleftleftleftleftleftleftleftleftleftleftleft
      </p>
    </div>
    <div class="right">
      <h4>right</h4>
      <p>
        rightrightrightrightrightrightrightrightrightright
        rightrightrightrightrightrightrightrightrightright
        rightrightrightrightrightrightright
      </p>
    </div>
  </div>
  <div class="footer">footer</div>
</body>

</html>
```
---

## 双飞翼布局

双飞翼布局和圣杯布局很类似，不过是在middle的div里又插入一个div，通过调整内部div的margin值，实现中间栏自适应，内容写到内部div中。

这样可以先做好主体部分，然后再将附属部分放到合适的位置！

1. 首先把left、middle、right都放出来, middle中增加inner
2. 给它们三个设置上float: left, 脱离文档流；
3. 一定记得给container设置上overflow: hidden; 可以形成BFC撑开文档
4. left、right设置上各自的宽度
5. middle设置width: 100%;

**接下来与圣杯布局不一样的地方：**

6. left设置 margin-left: -100%, right设置 right: -rightWidth;
7. container设置padding: 0, rightWidth, 0, leftWidth;

```html
<!DOCTYPE html>
<html lang="zh">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>双飞翼布局</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    .header,
    .footer {
      height: 100px;
      line-height: 100px;
      background-color: green;
      text-align: center;
      font-size: 30px;
      font-weight: bolder;
    }

    .footer {
      background-color: goldenrod;
    }

    .container {
      overflow: hidden;
    }

    .left,
    .middle,
    .right {
      float: left;
      min-height: 130px;
      word-break: break-all;
    }

    .left {
      margin-left: -100%;
      width: 200px;
      background-color: red;
    }

    .right {
      margin-left: -220px;
      width: 220px;
      background-color: green;
    }

    .middle {
      width: 100%;
      height: 100%;
      background-color: blue;
    }

    .inner {
      margin: 0 220px 0 200px;
      min-height: 130px;
      background: blue;
      word-break: break-all;
    }
  </style>
</head>

<body>
  <div class="header">header</div>
  <div class="container">
    <div class="middle">
      <div class="inner">
        <h4>middle</h4>
        <p>
          middlemiddlemiddlemiddlemiddlemiddlemiddlemiddle
          middlemiddlemiddlemiddlemiddlemiddlemiddlemiddle
          middlemiddlemiddlemiddlemiddlemiddlemiddlemiddle
          middlemiddlemiddlemiddlemiddlemiddlemiddlemiddle
          middlemiddlemiddlemiddlemiddlemiddlemiddlemiddle
          middlemiddlemiddlemiddlemiddle
        </p>
      </div>
    </div>
    <div class="left">
      <h4>left</h4>
      <p>
        leftleftleftleftleftleftleftleftleftleftleftleft
        leftleftleftleftleftleftleftleftleftleftleftleft
        leftleftleftleftleftleftleftleftleftleftleftleft
      </p>
    </div>
    <div class="right">
      <h4>right</h4>
      <p>
        rightrightrightrightrightrightrightrightrightright
        rightrightrightrightrightrightrightrightrightright
        rightrightrightrightrightrightright
      </p>
    </div>
  </div>
  <div class="footer">footer</div>
</body>

</html>
```
## 总结

圣杯布局在DOM结构上显得更加直观和自然；

双飞翼布局省去了很多css，而且由于不用使用定位，可以获得比圣杯布局更小最小宽度；

说到这里需要注意一下  由于双飞翼布局会一直随着浏览器可视区域宽度减小从而不断挤压中间部分宽度。

所以需要设置给页面一个min-width > LeftWidth + RightWidth；

---

还有一件事就是他们在单独部分内容扩充的时候，童鞋们可能发现了 底部会参差不齐。

在我的老师那里知道了最简单的解决办法 / 笑哭

> 给left、middle、right设置上 padding-bottom: 9999px; margin-bottom: -9999px; 

就让他变得无限高，但是又给他送回去了。真的是让我脑洞大开！！！

--- 

作者：前端小然子

链接：[https://xiaoranzife.com/guide/css/sanlan.html](https://xiaoranzife.com/guide/css/sanlan.html)

来源：前端进阶与被虐笔记

著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

---