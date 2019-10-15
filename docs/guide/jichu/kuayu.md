# 对前端跨域方案的认知总结

## 什么是跨域？ -> 灵魂问题！！！ 
跨域呢 就是在一个域的文档或者**脚本**试图去请求另一个域的资源。

---
### 敲键盘、划重点了啊
1、首先肯定是两个域之间的通信

2、重点要记住**脚本**这两个字

最近的一个项目中，做一个公用的后台的壳子（多个后台/域名），然后呢我团队里面的一个小美女做的时候发现一个问题：

    在这个域名下请求同一个接口
    这个项目内请求没问题，然而这个壳子中请求的却是无权限访问
示例图如下
![跨域](https://user-gold-cdn.xitu.io/2019/4/10/16a05a4a93fe5a2a?w=1440&h=1080&f=jpeg&s=89902)

这里我们可以看到是a.com加载的b.com下的common.js

然后通过common.js请求的api.com返回的false

**所以通过一个域下的脚本去请求另一个域的资源也是跨域**

我们通常说的跨域是由浏览器的**同源策略**限制的一类请求场景

说到这里，不得不提一下 **广义的跨域** 和 **同源策略**

---
## 广义的跨域
```
1.) 资源跳转： A链接、重定向、表单提交
2.) 资源嵌入： <link>、<script>、<img>、<frame>等dom标签，
    还有样式中background:url()、@font-face()等文件外链
3.) 脚本请求： js发起的ajax请求、dom和js对象的跨域操作等
```
---

## 同源策略

#### 含义：
> A网页设置的Cookie， B网页不能打开，除非这两个网页“同源”

#### 目的：
> 为了保证用户信息安全，防止恶意的网站窃取数据

#### 同源策略是指三个相同:
* 协议相同
* 域名相同
* 端口相同

#### 同源策略的限制范围
* Cookie、LocalStorage、和IndexDB 无法获取
* DOM 无法获得
* AJAX 请求不能发送

---
### 下面说一下怎么突破跨域

1. 通过jsonp跨域
2. iframe跨域
3. postMessage跨域
4. CORS跨域
5. Nginx代理跨域
6. nodejs中间件代理跨域
7. 利用WebSocket跨域
 
## 一、通过jsonp跨域
jsonp跨域的本质是通过动态的创建script，再请求一个带参数的网址实现跨域通信。

1. 原生实现方法示例如下：
```
<script>
var src = "https://xxx.com/xxx.php?a=jsonpTest&callback=onback";

var script = document.createElement("script");
script.type = 'type/javascript';
script.src = src;

document.head.appendChild(script);

// 定义回调函数
function onBack(res) {
    console.log(res);
}
<script>
```
服务端返回：
```
onBack({state: true})
```

2. 通过jquery ajax实现：
```
$.ajax({
    url: 'https://xxx.com/xxx.php',
    type: 'get',
    dataType: 'jsonp',  // 请求方式为jsonp
    jsonpCallback: "onBack",    // 自定义回调函数名
    data: {a: jsonpTest},
    success: function () {
        console.log(res);
    }
});
```
其他框架的方法原理一致 可根据不同的request模块自行调整

后端php代码示例：
```
<?php
$callback = $_GET['callback'];
if (empty($callback)) {
    echo json_encode([
        state => false,
        errMsg => "请求方式不正确"
    ]);
    return;
}
$data = json_encode([
    state => true,
    errMsg => ""
]);

echo "{$callback}({$data})";
```

## 二、iframe跨域
### 1. document.domain + iframe跨域

    仅在主域相同，子域不同的情况下有效

实现原理：两个页面都通过js强制设置document.domain为基础主域，也就实现了同域。

1.) 父页面(http://n.xxx.com/a.html)
```
<iframe id="iframe" src="http://m.xxx.com/b.html"></iframe>
<script>
    document.domain = 'xxx.com';
    var user = 'admin';
</script>
```
2.) 子页面(http://m.xxx.com/b.html)
```
<script>
    document.domain = 'xxx.com';
    // 获取父窗口中变量
    console.log(window.parent.user);
</script>
```
### 2. location.hash + iframe跨域
实现原理：增加中间页面来实现。三个页面，不同域之间利用iframe的location.hash传值，相同域之间直接js通信。

具体实现如图：

![](https://user-gold-cdn.xitu.io/2019/4/10/16a05cb9ab0c05d8?w=2272&h=1056&f=jpeg&s=724100)

主要方法 **onhashchange**

代码实现：
1) a.html
```
<iframe id="iframe" src="http://www.b.com/b.html" style="display:none;"></iframe>
<script>
    var iframe = document.getElementById('iframe');

    // 向b.html传hash值
    setTimeout(function() {
        iframe.src = iframe.src + '#user=admin';
    }, 1000);
    
    // 开放给同域c.html的回调方法
    function onCallback(res) {
        console.log(res);
    }
</script>
```
2) b.html
```
<iframe id="iframe" src="http://www.a.com/c.html" style="display:none;"></iframe>
<script>
    var iframe = document.getElementById('iframe');

    // 监听a.html传来的hash值，再传给c.html
    window.onhashchange = function () {
        iframe.src = iframe.src + location.hash;
    };
</script>
```
3) c.html
```
<script>
    // 监听b.html传来的hash值
    window.onhashchange = function () {
        // 通过操作同域a.html的js回调，将结果传回去
        window.parent.parent.onCallback('hello: ' + location.hash.replace('#user=', ''));
    };
</script>
```

### 3. window.name + iframe跨域
window.name属性的特性：
* name值在不同的页面（甚至不同域名）加载后依旧存在
* 可以支持非常长的 name 值（2MB）
 
1）a.html
```
<script>
var proxy = function(url, callback) {
    var state = 0;
    var iframe = document.createElement("iframe");
    iframe.src = url;
    
    iframe.onload = function() {
        if (state === 0) {
            // 第一次onload成功后 切换到代理页面
            iframe.contentWindow.location = 'http://xxx.com/proxy.html';
            state = 1;
        } else if (state === 1) {
            // 第二次onload成功后  读取数据 并销毁这个iframe
            // 1.释放内存
            // 2.保证不被其他域frame js访问
            callback(iframe.contentWindow.name);
            destoryFrame();
        }
    }
    
    document.body.appendChild(iframe);

    // 销毁这个iframe
    function destoryFrame() {
        iframe.contentWindow.document.write('');
        iframe.contentWindow.close();
        document.body.removeChild(iframe);
    }
}

// 请求跨域b页面数据
proxy('http://yyy.com/b.html', function(data){
    console.log(data);
});


</script>
```
2）b.html
```
<script>
    window.name = '在这里填写跨域数据';
</script>
```
3）proxy.html
代理页，要求与a.html同域，内容为空即可。

通过iframe的src属性从其他域转向本域，跨域数据就从iframe的window.name由其他域传递到本域。

一波操作666，完美绕过了浏览器的跨域访问限制，但是同时又是安全操作。

> 在阿里云看到过相关操作

## 三。postMessage跨域
postMessage是HTML5 level2里面的API，可以用来解决以下问题：
* 页面和这个页面打开的新窗口的消息传递
* 多个窗口之间的消息传递
* 页面与嵌套的iframe之间的消息传递
 
postMessage(data, origin)

data: 
> html5规范支持任意基本类型或可复制的对象，但部分浏览器只支持字符串，所以传参时最好用JSON.stringify()序列化。

origin:
> 协议+主机+端口号，也可以设置为"*"，表示可以传递给任意窗口，如果要指定和当前窗口同源的话设置为"/"。

示例如下：

a.html
```
<iframe id="iframe" src="http://yyy.com/b.html" style="display:none;"></iframe>
<script>       
    var iframe = document.getElementById('iframe');
    iframe.onload = function() {
        var data = {
            name: '我是xxx'
        };
        // 向yyy.com传送跨域数据
        iframe.contentWindow.postMessage(JSON.stringify(data), 'http://yyy.com');
    };

    // 接受yyy.com返回的数据
    window.addEventListener('message', function(e) {
        console.log(e.data);
    }, false);
</script>
```
b.html
```
<script>
    // 接收xxx.com的数据
    window.addEventListener('message', function(e) {
        console.log(e.data);

        var data = JSON.parse(e.data);
        if (data) {
            data.name2 = "我是yyyy";

            // 处理后再发回xxx.com
            window.parent.postMessage(JSON.stringify(data), 'http://xxx.com');
        }
    }, false);
</script>
```

## 四、CORS跨域
普通跨域请求：只服务端设置Access-Control-Allow-Origin即可，前端无须设置，若要带cookie请求：前后端都需要设置。

> 注：由于同源策略的限制，所读取的cookie为跨域请求接口所在域的cookie，而非当前页。

所有浏览器都支持该功能(IE8+：IE8/9需要使用XDomainRequest对象来支持CORS）)，CORS也已经成为常用的跨域解决方案。

1.通过前端设置
```
// 携带cookie
xhr.withCredentials = true;
```
2.服务端配置

设置header头
```

// 允许跨域访问的域名,若有端口需写全（协议+域名+端口）
// 若没有端口末尾不用加'/'
Access-Control-Allow-Origin *

// 允许前端带认证cookie
// 开启这个以后上面的不能使用通配符 必须指定具体域名
Access-Control-Allow-Credentials true

// 提示OPTIONS预检的时候，后端需要设置的两个常用头
Access-Control-Allow-Headers Content-Type,X-Requested-With

```
## 五、Nginx代理跨域
1）CORS的一种

示例：
```
location / {
  add_header Access-Control-Allow-Origin *;
}
```
其他配置与上述CORS类似

2）反向代理接口
通过nginx配置一个代理服务器做跳板机，反向代理访问接口，并**修改cookie中的domain信息**，方便当前域的cookie写入，实现跨域登录。

这波操作可以呀，老铁

## 六、nodejs中间件代理跨域
原理和nginx相同，通过代理服务器，实现数据的转发，也可以通过设置cookieDomainRewrite参数修改响应头中cookie的域名，实现当前域的cookie写入。

## 七、利用WebSocket跨域
WebSocket 是H5的一种新协议，实现了浏览器和服务器的全双工通信，同时允许跨域通讯。

通常我们会使用socket.io来简化操作；

直接建立ws/wss链接就行了


