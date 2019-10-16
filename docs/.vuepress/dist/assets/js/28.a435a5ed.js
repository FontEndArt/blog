(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{340:function(n,s,e){"use strict";e.r(s);var t=e(38),a=Object(t.a)({},function(){var n=this,s=n.$createElement,e=n._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[e("h1",{attrs:{id:"深入理解圣杯布局和双飞翼布局"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#深入理解圣杯布局和双飞翼布局","aria-hidden":"true"}},[n._v("#")]),n._v(" 深入理解圣杯布局和双飞翼布局")]),n._v(" "),e("h2",{attrs:{id:"前言"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#前言","aria-hidden":"true"}},[n._v("#")]),n._v(" 前言")]),n._v(" "),e("p",[n._v("最近我朋友在群里发了一张图，说为什么main的宽度100%了，sub还是可以覆盖它呢？看来是时候带他回忆一波经典的圣杯布局和双飞翼布局了。正好最近看到好多面试题都有提到。 /笑哭")]),n._v(" "),e("p",[n._v("群内链接如下图：")]),n._v(" "),e("p",[e("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2019/4/11/16a0c9554c172710?w=1280&h=381&f=png&s=54512",alt:""}})]),n._v(" "),e("h2",{attrs:{id:"字面意思"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#字面意思","aria-hidden":"true"}},[n._v("#")]),n._v(" 字面意思")]),n._v(" "),e("p",[n._v("圣呗布局和双飞翼布局从字面意思来看是这样的：")]),n._v(" "),e("blockquote",[e("p",[n._v("一个像圣杯或者像展翅的禽类这样的布局")])]),n._v(" "),e("p",[e("strong",[n._v("通俗的来说就是左右两栏固定宽度，中间部分自适应的三栏布局。")])]),n._v(" "),e("h2",{attrs:{id:"两者本质"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#两者本质","aria-hidden":"true"}},[n._v("#")]),n._v(" 两者本质")]),n._v(" "),e("p",[e("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2019/4/12/16a101259cada47c?w=1147&h=643&f=png&s=53266",alt:""}})]),n._v(" "),e("h2",{attrs:{id:"圣杯布局"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#圣杯布局","aria-hidden":"true"}},[n._v("#")]),n._v(" 圣杯布局")]),n._v(" "),e("ol",[e("li",[n._v("首先把left、middle、right都放出来")]),n._v(" "),e("li",[n._v("给它们三个设置上float: left, 脱离文档流；")]),n._v(" "),e("li",[n._v("一定记得给container设置上overflow: hidden; 可以形成BFC撑开文档")]),n._v(" "),e("li",[n._v("left、right设置上各自的宽度")]),n._v(" "),e("li",[n._v("middle设置width: 100%;")])]),n._v(" "),e("p",[e("strong",[n._v("接下来比较重要了：")])]),n._v(" "),e("ol",{attrs:{start:"6"}},[e("li",[n._v("给left、middle、right设置position: relative;")]),n._v(" "),e("li",[n._v("left设置 left: -leftWidth, right设置 right: -rightWidth;")]),n._v(" "),e("li",[n._v("container设置padding: 0, rightWidth, 0, leftWidth;")])]),n._v(" "),e("hr"),n._v(" "),e("p",[n._v("我注意到圣杯布局的left、middle、right都有position: relative;")]),n._v(" "),e("p",[n._v("设:")]),n._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v(".left width:200px\n.right width:220px\n")])]),n._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[n._v("1")]),e("br"),e("span",{staticClass:"line-number"},[n._v("2")]),e("br")])]),e("p",[n._v("那么下面的这些属性为什么要存在？")]),n._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v(".container上面的paddind\n.left 的left: -200px;\n.right 的right: -220px;\n")])]),n._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[n._v("1")]),e("br"),e("span",{staticClass:"line-number"},[n._v("2")]),e("br"),e("span",{staticClass:"line-number"},[n._v("3")]),e("br")])]),e("p",[e("strong",[n._v("因为不这样设置  会遮挡middle的内容")])]),n._v(" "),e("p",[n._v("可以自己尝试一下下")]),n._v(" "),e("hr"),n._v(" "),e("p",[n._v("圣杯布局示例代码如下：")]),n._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v('<!DOCTYPE html>\n<html lang="zh">\n\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <meta http-equiv="X-UA-Compatible" content="ie=edge">\n  <title>圣杯布局</title>\n  <style>\n    * {\n      margin: 0;\n      padding: 0;\n    }\n\n    .header,\n    .footer {\n      height: 100px;\n      line-height: 100px;\n      background-color: green;\n      text-align: center;\n      font-size: 30px;\n      font-weight: bolder;\n    }\n\n    .footer {\n      background-color: goldenrod;\n    }\n\n    .container {\n      padding: 0 220px 0 200px;\n      overflow: hidden;\n    }\n\n    .left,\n    .middle,\n    .right {\n      position: relative;\n      float: left;\n      min-height: 130px;\n      word-break: break-all;\n    }\n\n    .left {\n      margin-left: -100%;\n      left: -200px;\n      width: 200px;\n      background-color: red;\n    }\n\n    .right {\n      margin-left: -220px;\n      right: -220px;\n      width: 220px;\n      background-color: green;\n    }\n\n    .middle {\n      width: 100%;\n      background-color: blue;\n    }\n  </style>\n</head>\n\n<body>\n  <div class="header">header</div>\n  <div class="container">\n    <div class="middle">\n      <h4>middle</h4>\n      <p>\n        middlemiddlemiddlemiddlemiddlemiddlemiddlemiddle\n        middlemiddlemiddlemiddlemiddlemiddlemiddlemiddle\n        middlemiddlemiddlemiddlemiddlemiddlemiddlemiddle\n        middlemiddlemiddlemiddlemiddlemiddlemiddlemiddle\n        middlemiddlemiddlemiddlemiddlemiddlemiddlemiddle\n        middlemiddlemiddlemiddlemiddle\n      </p>\n    </div>\n    <div class="left">\n      <h4>left</h4>\n      <p>\n        leftleftleftleftleftleftleftleftleftleftleftleft\n        leftleftleftleftleftleftleftleftleftleftleftleft\n        leftleftleftleftleftleftleftleftleftleftleftleft\n      </p>\n    </div>\n    <div class="right">\n      <h4>right</h4>\n      <p>\n        rightrightrightrightrightrightrightrightrightright\n        rightrightrightrightrightrightrightrightrightright\n        rightrightrightrightrightrightright\n      </p>\n    </div>\n  </div>\n  <div class="footer">footer</div>\n</body>\n\n</html>\n')])]),n._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[n._v("1")]),e("br"),e("span",{staticClass:"line-number"},[n._v("2")]),e("br"),e("span",{staticClass:"line-number"},[n._v("3")]),e("br"),e("span",{staticClass:"line-number"},[n._v("4")]),e("br"),e("span",{staticClass:"line-number"},[n._v("5")]),e("br"),e("span",{staticClass:"line-number"},[n._v("6")]),e("br"),e("span",{staticClass:"line-number"},[n._v("7")]),e("br"),e("span",{staticClass:"line-number"},[n._v("8")]),e("br"),e("span",{staticClass:"line-number"},[n._v("9")]),e("br"),e("span",{staticClass:"line-number"},[n._v("10")]),e("br"),e("span",{staticClass:"line-number"},[n._v("11")]),e("br"),e("span",{staticClass:"line-number"},[n._v("12")]),e("br"),e("span",{staticClass:"line-number"},[n._v("13")]),e("br"),e("span",{staticClass:"line-number"},[n._v("14")]),e("br"),e("span",{staticClass:"line-number"},[n._v("15")]),e("br"),e("span",{staticClass:"line-number"},[n._v("16")]),e("br"),e("span",{staticClass:"line-number"},[n._v("17")]),e("br"),e("span",{staticClass:"line-number"},[n._v("18")]),e("br"),e("span",{staticClass:"line-number"},[n._v("19")]),e("br"),e("span",{staticClass:"line-number"},[n._v("20")]),e("br"),e("span",{staticClass:"line-number"},[n._v("21")]),e("br"),e("span",{staticClass:"line-number"},[n._v("22")]),e("br"),e("span",{staticClass:"line-number"},[n._v("23")]),e("br"),e("span",{staticClass:"line-number"},[n._v("24")]),e("br"),e("span",{staticClass:"line-number"},[n._v("25")]),e("br"),e("span",{staticClass:"line-number"},[n._v("26")]),e("br"),e("span",{staticClass:"line-number"},[n._v("27")]),e("br"),e("span",{staticClass:"line-number"},[n._v("28")]),e("br"),e("span",{staticClass:"line-number"},[n._v("29")]),e("br"),e("span",{staticClass:"line-number"},[n._v("30")]),e("br"),e("span",{staticClass:"line-number"},[n._v("31")]),e("br"),e("span",{staticClass:"line-number"},[n._v("32")]),e("br"),e("span",{staticClass:"line-number"},[n._v("33")]),e("br"),e("span",{staticClass:"line-number"},[n._v("34")]),e("br"),e("span",{staticClass:"line-number"},[n._v("35")]),e("br"),e("span",{staticClass:"line-number"},[n._v("36")]),e("br"),e("span",{staticClass:"line-number"},[n._v("37")]),e("br"),e("span",{staticClass:"line-number"},[n._v("38")]),e("br"),e("span",{staticClass:"line-number"},[n._v("39")]),e("br"),e("span",{staticClass:"line-number"},[n._v("40")]),e("br"),e("span",{staticClass:"line-number"},[n._v("41")]),e("br"),e("span",{staticClass:"line-number"},[n._v("42")]),e("br"),e("span",{staticClass:"line-number"},[n._v("43")]),e("br"),e("span",{staticClass:"line-number"},[n._v("44")]),e("br"),e("span",{staticClass:"line-number"},[n._v("45")]),e("br"),e("span",{staticClass:"line-number"},[n._v("46")]),e("br"),e("span",{staticClass:"line-number"},[n._v("47")]),e("br"),e("span",{staticClass:"line-number"},[n._v("48")]),e("br"),e("span",{staticClass:"line-number"},[n._v("49")]),e("br"),e("span",{staticClass:"line-number"},[n._v("50")]),e("br"),e("span",{staticClass:"line-number"},[n._v("51")]),e("br"),e("span",{staticClass:"line-number"},[n._v("52")]),e("br"),e("span",{staticClass:"line-number"},[n._v("53")]),e("br"),e("span",{staticClass:"line-number"},[n._v("54")]),e("br"),e("span",{staticClass:"line-number"},[n._v("55")]),e("br"),e("span",{staticClass:"line-number"},[n._v("56")]),e("br"),e("span",{staticClass:"line-number"},[n._v("57")]),e("br"),e("span",{staticClass:"line-number"},[n._v("58")]),e("br"),e("span",{staticClass:"line-number"},[n._v("59")]),e("br"),e("span",{staticClass:"line-number"},[n._v("60")]),e("br"),e("span",{staticClass:"line-number"},[n._v("61")]),e("br"),e("span",{staticClass:"line-number"},[n._v("62")]),e("br"),e("span",{staticClass:"line-number"},[n._v("63")]),e("br"),e("span",{staticClass:"line-number"},[n._v("64")]),e("br"),e("span",{staticClass:"line-number"},[n._v("65")]),e("br"),e("span",{staticClass:"line-number"},[n._v("66")]),e("br"),e("span",{staticClass:"line-number"},[n._v("67")]),e("br"),e("span",{staticClass:"line-number"},[n._v("68")]),e("br"),e("span",{staticClass:"line-number"},[n._v("69")]),e("br"),e("span",{staticClass:"line-number"},[n._v("70")]),e("br"),e("span",{staticClass:"line-number"},[n._v("71")]),e("br"),e("span",{staticClass:"line-number"},[n._v("72")]),e("br"),e("span",{staticClass:"line-number"},[n._v("73")]),e("br"),e("span",{staticClass:"line-number"},[n._v("74")]),e("br"),e("span",{staticClass:"line-number"},[n._v("75")]),e("br"),e("span",{staticClass:"line-number"},[n._v("76")]),e("br"),e("span",{staticClass:"line-number"},[n._v("77")]),e("br"),e("span",{staticClass:"line-number"},[n._v("78")]),e("br"),e("span",{staticClass:"line-number"},[n._v("79")]),e("br"),e("span",{staticClass:"line-number"},[n._v("80")]),e("br"),e("span",{staticClass:"line-number"},[n._v("81")]),e("br"),e("span",{staticClass:"line-number"},[n._v("82")]),e("br"),e("span",{staticClass:"line-number"},[n._v("83")]),e("br"),e("span",{staticClass:"line-number"},[n._v("84")]),e("br"),e("span",{staticClass:"line-number"},[n._v("85")]),e("br"),e("span",{staticClass:"line-number"},[n._v("86")]),e("br"),e("span",{staticClass:"line-number"},[n._v("87")]),e("br"),e("span",{staticClass:"line-number"},[n._v("88")]),e("br"),e("span",{staticClass:"line-number"},[n._v("89")]),e("br"),e("span",{staticClass:"line-number"},[n._v("90")]),e("br"),e("span",{staticClass:"line-number"},[n._v("91")]),e("br"),e("span",{staticClass:"line-number"},[n._v("92")]),e("br"),e("span",{staticClass:"line-number"},[n._v("93")]),e("br"),e("span",{staticClass:"line-number"},[n._v("94")]),e("br"),e("span",{staticClass:"line-number"},[n._v("95")]),e("br"),e("span",{staticClass:"line-number"},[n._v("96")]),e("br"),e("span",{staticClass:"line-number"},[n._v("97")]),e("br"),e("span",{staticClass:"line-number"},[n._v("98")]),e("br")])]),e("hr"),n._v(" "),e("h2",{attrs:{id:"双飞翼布局"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#双飞翼布局","aria-hidden":"true"}},[n._v("#")]),n._v(" 双飞翼布局")]),n._v(" "),e("p",[n._v("双飞翼布局和圣杯布局很类似，不过是在middle的div里又插入一个div，通过调整内部div的margin值，实现中间栏自适应，内容写到内部div中。")]),n._v(" "),e("p",[n._v("这样可以先做好主体部分，然后再将附属部分放到合适的位置！")]),n._v(" "),e("ol",[e("li",[n._v("首先把left、middle、right都放出来, middle中增加inner")]),n._v(" "),e("li",[n._v("给它们三个设置上float: left, 脱离文档流；")]),n._v(" "),e("li",[n._v("一定记得给container设置上overflow: hidden; 可以形成BFC撑开文档")]),n._v(" "),e("li",[n._v("left、right设置上各自的宽度")]),n._v(" "),e("li",[n._v("middle设置width: 100%;")])]),n._v(" "),e("p",[e("strong",[n._v("接下来与圣杯布局不一样的地方：")])]),n._v(" "),e("ol",{attrs:{start:"6"}},[e("li",[n._v("left设置 margin-left: -100%, right设置 right: -rightWidth;")]),n._v(" "),e("li",[n._v("container设置padding: 0, rightWidth, 0, leftWidth;")])]),n._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v('<!DOCTYPE html>\n<html lang="zh">\n\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <meta http-equiv="X-UA-Compatible" content="ie=edge">\n  <title>双飞翼布局</title>\n  <style>\n    * {\n      margin: 0;\n      padding: 0;\n    }\n\n    .header,\n    .footer {\n      height: 100px;\n      line-height: 100px;\n      background-color: green;\n      text-align: center;\n      font-size: 30px;\n      font-weight: bolder;\n    }\n\n    .footer {\n      background-color: goldenrod;\n    }\n\n    .container {\n      overflow: hidden;\n    }\n\n    .left,\n    .middle,\n    .right {\n      float: left;\n      min-height: 130px;\n      word-break: break-all;\n    }\n\n    .left {\n      margin-left: -100%;\n      width: 200px;\n      background-color: red;\n    }\n\n    .right {\n      margin-left: -220px;\n      width: 220px;\n      background-color: green;\n    }\n\n    .middle {\n      width: 100%;\n      height: 100%;\n      background-color: blue;\n    }\n\n    .inner {\n      margin: 0 220px 0 200px;\n      min-height: 130px;\n      background: blue;\n      word-break: break-all;\n    }\n  </style>\n</head>\n\n<body>\n  <div class="header">header</div>\n  <div class="container">\n    <div class="middle">\n      <div class="inner">\n        <h4>middle</h4>\n        <p>\n          middlemiddlemiddlemiddlemiddlemiddlemiddlemiddle\n          middlemiddlemiddlemiddlemiddlemiddlemiddlemiddle\n          middlemiddlemiddlemiddlemiddlemiddlemiddlemiddle\n          middlemiddlemiddlemiddlemiddlemiddlemiddlemiddle\n          middlemiddlemiddlemiddlemiddlemiddlemiddlemiddle\n          middlemiddlemiddlemiddlemiddle\n        </p>\n      </div>\n    </div>\n    <div class="left">\n      <h4>left</h4>\n      <p>\n        leftleftleftleftleftleftleftleftleftleftleftleft\n        leftleftleftleftleftleftleftleftleftleftleftleft\n        leftleftleftleftleftleftleftleftleftleftleftleft\n      </p>\n    </div>\n    <div class="right">\n      <h4>right</h4>\n      <p>\n        rightrightrightrightrightrightrightrightrightright\n        rightrightrightrightrightrightrightrightrightright\n        rightrightrightrightrightrightright\n      </p>\n    </div>\n  </div>\n  <div class="footer">footer</div>\n</body>\n\n</html>\n')])]),n._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[n._v("1")]),e("br"),e("span",{staticClass:"line-number"},[n._v("2")]),e("br"),e("span",{staticClass:"line-number"},[n._v("3")]),e("br"),e("span",{staticClass:"line-number"},[n._v("4")]),e("br"),e("span",{staticClass:"line-number"},[n._v("5")]),e("br"),e("span",{staticClass:"line-number"},[n._v("6")]),e("br"),e("span",{staticClass:"line-number"},[n._v("7")]),e("br"),e("span",{staticClass:"line-number"},[n._v("8")]),e("br"),e("span",{staticClass:"line-number"},[n._v("9")]),e("br"),e("span",{staticClass:"line-number"},[n._v("10")]),e("br"),e("span",{staticClass:"line-number"},[n._v("11")]),e("br"),e("span",{staticClass:"line-number"},[n._v("12")]),e("br"),e("span",{staticClass:"line-number"},[n._v("13")]),e("br"),e("span",{staticClass:"line-number"},[n._v("14")]),e("br"),e("span",{staticClass:"line-number"},[n._v("15")]),e("br"),e("span",{staticClass:"line-number"},[n._v("16")]),e("br"),e("span",{staticClass:"line-number"},[n._v("17")]),e("br"),e("span",{staticClass:"line-number"},[n._v("18")]),e("br"),e("span",{staticClass:"line-number"},[n._v("19")]),e("br"),e("span",{staticClass:"line-number"},[n._v("20")]),e("br"),e("span",{staticClass:"line-number"},[n._v("21")]),e("br"),e("span",{staticClass:"line-number"},[n._v("22")]),e("br"),e("span",{staticClass:"line-number"},[n._v("23")]),e("br"),e("span",{staticClass:"line-number"},[n._v("24")]),e("br"),e("span",{staticClass:"line-number"},[n._v("25")]),e("br"),e("span",{staticClass:"line-number"},[n._v("26")]),e("br"),e("span",{staticClass:"line-number"},[n._v("27")]),e("br"),e("span",{staticClass:"line-number"},[n._v("28")]),e("br"),e("span",{staticClass:"line-number"},[n._v("29")]),e("br"),e("span",{staticClass:"line-number"},[n._v("30")]),e("br"),e("span",{staticClass:"line-number"},[n._v("31")]),e("br"),e("span",{staticClass:"line-number"},[n._v("32")]),e("br"),e("span",{staticClass:"line-number"},[n._v("33")]),e("br"),e("span",{staticClass:"line-number"},[n._v("34")]),e("br"),e("span",{staticClass:"line-number"},[n._v("35")]),e("br"),e("span",{staticClass:"line-number"},[n._v("36")]),e("br"),e("span",{staticClass:"line-number"},[n._v("37")]),e("br"),e("span",{staticClass:"line-number"},[n._v("38")]),e("br"),e("span",{staticClass:"line-number"},[n._v("39")]),e("br"),e("span",{staticClass:"line-number"},[n._v("40")]),e("br"),e("span",{staticClass:"line-number"},[n._v("41")]),e("br"),e("span",{staticClass:"line-number"},[n._v("42")]),e("br"),e("span",{staticClass:"line-number"},[n._v("43")]),e("br"),e("span",{staticClass:"line-number"},[n._v("44")]),e("br"),e("span",{staticClass:"line-number"},[n._v("45")]),e("br"),e("span",{staticClass:"line-number"},[n._v("46")]),e("br"),e("span",{staticClass:"line-number"},[n._v("47")]),e("br"),e("span",{staticClass:"line-number"},[n._v("48")]),e("br"),e("span",{staticClass:"line-number"},[n._v("49")]),e("br"),e("span",{staticClass:"line-number"},[n._v("50")]),e("br"),e("span",{staticClass:"line-number"},[n._v("51")]),e("br"),e("span",{staticClass:"line-number"},[n._v("52")]),e("br"),e("span",{staticClass:"line-number"},[n._v("53")]),e("br"),e("span",{staticClass:"line-number"},[n._v("54")]),e("br"),e("span",{staticClass:"line-number"},[n._v("55")]),e("br"),e("span",{staticClass:"line-number"},[n._v("56")]),e("br"),e("span",{staticClass:"line-number"},[n._v("57")]),e("br"),e("span",{staticClass:"line-number"},[n._v("58")]),e("br"),e("span",{staticClass:"line-number"},[n._v("59")]),e("br"),e("span",{staticClass:"line-number"},[n._v("60")]),e("br"),e("span",{staticClass:"line-number"},[n._v("61")]),e("br"),e("span",{staticClass:"line-number"},[n._v("62")]),e("br"),e("span",{staticClass:"line-number"},[n._v("63")]),e("br"),e("span",{staticClass:"line-number"},[n._v("64")]),e("br"),e("span",{staticClass:"line-number"},[n._v("65")]),e("br"),e("span",{staticClass:"line-number"},[n._v("66")]),e("br"),e("span",{staticClass:"line-number"},[n._v("67")]),e("br"),e("span",{staticClass:"line-number"},[n._v("68")]),e("br"),e("span",{staticClass:"line-number"},[n._v("69")]),e("br"),e("span",{staticClass:"line-number"},[n._v("70")]),e("br"),e("span",{staticClass:"line-number"},[n._v("71")]),e("br"),e("span",{staticClass:"line-number"},[n._v("72")]),e("br"),e("span",{staticClass:"line-number"},[n._v("73")]),e("br"),e("span",{staticClass:"line-number"},[n._v("74")]),e("br"),e("span",{staticClass:"line-number"},[n._v("75")]),e("br"),e("span",{staticClass:"line-number"},[n._v("76")]),e("br"),e("span",{staticClass:"line-number"},[n._v("77")]),e("br"),e("span",{staticClass:"line-number"},[n._v("78")]),e("br"),e("span",{staticClass:"line-number"},[n._v("79")]),e("br"),e("span",{staticClass:"line-number"},[n._v("80")]),e("br"),e("span",{staticClass:"line-number"},[n._v("81")]),e("br"),e("span",{staticClass:"line-number"},[n._v("82")]),e("br"),e("span",{staticClass:"line-number"},[n._v("83")]),e("br"),e("span",{staticClass:"line-number"},[n._v("84")]),e("br"),e("span",{staticClass:"line-number"},[n._v("85")]),e("br"),e("span",{staticClass:"line-number"},[n._v("86")]),e("br"),e("span",{staticClass:"line-number"},[n._v("87")]),e("br"),e("span",{staticClass:"line-number"},[n._v("88")]),e("br"),e("span",{staticClass:"line-number"},[n._v("89")]),e("br"),e("span",{staticClass:"line-number"},[n._v("90")]),e("br"),e("span",{staticClass:"line-number"},[n._v("91")]),e("br"),e("span",{staticClass:"line-number"},[n._v("92")]),e("br"),e("span",{staticClass:"line-number"},[n._v("93")]),e("br"),e("span",{staticClass:"line-number"},[n._v("94")]),e("br"),e("span",{staticClass:"line-number"},[n._v("95")]),e("br"),e("span",{staticClass:"line-number"},[n._v("96")]),e("br"),e("span",{staticClass:"line-number"},[n._v("97")]),e("br"),e("span",{staticClass:"line-number"},[n._v("98")]),e("br"),e("span",{staticClass:"line-number"},[n._v("99")]),e("br"),e("span",{staticClass:"line-number"},[n._v("100")]),e("br"),e("span",{staticClass:"line-number"},[n._v("101")]),e("br"),e("span",{staticClass:"line-number"},[n._v("102")]),e("br"),e("span",{staticClass:"line-number"},[n._v("103")]),e("br"),e("span",{staticClass:"line-number"},[n._v("104")]),e("br")])]),e("h2",{attrs:{id:"总结"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#总结","aria-hidden":"true"}},[n._v("#")]),n._v(" 总结")]),n._v(" "),e("p",[n._v("圣杯布局在DOM结构上显得更加直观和自然；")]),n._v(" "),e("p",[n._v("双飞翼布局省去了很多css，而且由于不用使用定位，可以获得比圣杯布局更小最小宽度；")]),n._v(" "),e("p",[n._v("说到这里需要注意一下  由于双飞翼布局会一直随着浏览器可视区域宽度减小从而不断挤压中间部分宽度。")]),n._v(" "),e("p",[n._v("所以需要设置给页面一个min-width > LeftWidth + RightWidth；")]),n._v(" "),e("hr"),n._v(" "),e("p",[n._v("还有一件事就是他们在单独部分内容扩充的时候，童鞋们可能发现了 底部会参差不齐。")]),n._v(" "),e("p",[n._v("在我的老师那里知道了最简单的解决办法 / 笑哭")]),n._v(" "),e("blockquote",[e("p",[n._v("给left、middle、right设置上 padding-bottom: 9999px; margin-bottom: -9999px;")])]),n._v(" "),e("p",[n._v("就让他变得无限高，但是又给他送回去了。真的是让我脑洞大开！！！")])])},[],!1,null,null,null);s.default=a.exports}}]);