# Vue项目解决方案合集

在集成过程中有其他问题大家可以提 Issue 或者私信我 1018017334@qq.com，我也很乐意和大家一起讨论，后期会把在工作中遇到的一些解决方案陆续和大家一起分享。

**走过路过的童鞋，觉得下面的方案对你有帮助麻烦伸出你的小手，点个 stare 哦！！！**

## 集成 pdf 和 office 预览功能

目前很多项目都有 pdf 和 office 文件预览功能，有一些服务商也提供专业的在线预览服务，但是如果你的项目只是需要实现简单的预览需求，那么自己集成是一个不错的选择，毕竟免费啊，不香嘛。

### 预览 pdf 文件

#### 工具

pdf.js，去官网[下载](http://mozilla.github.io/pdf.js/)之后解压，解压之后的文件夹放到 static 文件夹中

> 官网访问很慢，打不开的同学直接使用本项目中的pdf.js也是一样的

#### 组件

使用起来很简单，通过 iframe 引用 viewer.html 这个文件，传入你想要预览的文件地址就可以了，但是我建议把它封装成一个组件，这样用起来方便。

> 项目里面有一个写好的组件，可以直接使用：CPdfPreview

```js
<iframe 
  id="iframe" 
  width="100%" 
  height="760" 
  scrolling="no" 
  :src='"/static/pdf/web/viewer.html?file=" + url'>
</iframe>
```

#### 预览

**本地文件预览**

可以把文件放在 static 文件夹中，然后把路径传到组件中就可以了。

```js
<c-pdf-preview :url="'/static/ts.pdf'"></c-pdf-preview>
```

**远程文件预览**

如果预览的是远程文件，需要注意跨域问题，解决跨域问题有两种方案：

1、第一种是配置CORS，设置一下 `Access-Control-Allow-Origin`，并注释 viewer.js 中的代码；

```js
// viewer.js
if (origin !== viewerOrigin && protocol !== 'blob:') {
    // 处理跨域问题
    // throw new Error('file origin does not match viewer\'s');
}
```

> 不注释 viewer.js 中的代码会报错：Error: file origin does not match viewer's

2、第二种让后台返回一个流的形式的 pdf，pdf.js插件是可以识别的，也不会报跨域问题。

这两种方式都需要后端配合。

### 预览 office 文件

#### 工具

对于 office 文件，需要借助微软的 Office Online 在线预览Office文档。

> 如果是内部项目，可以自己在内网部署 [Office Online Server](https://docs.microsoft.com/zh-cn/officeonlineserver/deploy-office-online-server)

#### 组件

和 pdf.js 一样，Office Online使用起来也很简单，通过 iframe 引用官方提供的预览地址，传入需要预览的文件地址就可以了。当然同样也建议封装成组件，用起来更方便、

> 项目里面有一个写好的组件，可以直接使用：COfficePreview
>

```js
<iframe
  id="iframe"
  :src="'https://view.officeapps.live.com/op/view.aspx?src=' + url"
  frameborder="0"
  width="100%"
  height="870px"
  allowfullscreen="true">
 </iframe>
```

#### 预览

```js
// 下面是在网上找的几个地址，可以预览试试
word: 'http://officeweb365.com/viewfile/关于加快临时设施建设速度和保证建设标准的通知.docx',
excel: 'http://officeweb365.com/viewfile/在线预览Office服务费用说明（预览示例文件）.xlsx',
ppt: 'http://officeweb365.com/viewfile/深入浅出HTML5游戏开发.pptx'
```

这里要注意的是，需要保证你提供的文件地址是开放的，你如果你给的地址是需要访问权限的，那么是预览不了的。另外，文件的大小超过 10M 也预览不了，所有大家看具体情况去考虑是否满足需求。

### 总结

参考上面的说明和示例代码，你已经可以在项目里面实现 pdf 和 office 预览，组件里面也有一些我个人在项目中的额外处理，也许对大家有一些借鉴作用。

## 集成 MathJax 显示数学公式

### 简介

MathJax是一款运行在浏览器中的开源的数学符号渲染引擎，使用MathJax可以方便的在浏览器中显示数学公式，不需要使用图片。目前，MathJax可以解析Latex、MathML和ASCIIMathML的标记语言。

### 引入 MathJax

官方的CDN在国内访问慢，所以我们一般引入的是国内的公共资源 BootCDN 提供的 js

```js
// 配置 dns-prefetch，用于网页加速
<link rel="dns-prefetch" href="//cdn.bootcss.com" />

// 外联 config
<script type="text/x-mathjax-config">
    MathJax.Hub.Config({
      showProcessingMessages: false, // 关闭js加载过程信息
      messageStyle: "none", // 不显示信息
      extensions: ["tex2jax.js"],
      jax: ["input/TeX", "output/HTML-CSS"],
      tex2jax: {
        inlineMath: [ ['$','$'], ["\\(","\\)"] ], // 行内公式选择符
        displayMath: [ ['$$','$$'], ["\\[","\\]"] ], // 段内公式选择符
        skipTags: [
          'script', 
          'noscript', 
          'style', 
          'textarea', 
          'pre',
          'code',
          'a'
        ], // 避开某些标签
        ignoreClass: "comment-content" // 避开含该class的标签
      },
      "HTML-CSS": {
        availableFonts: ["STIX", "TeX"], // 可选字体
      },
      showMathMenu:false // 关闭右击菜单显示
  })
</script>

// 内联 config
<script 
	src="https://cdn.bootcss.com/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML" 
	async>
</script>
```

### 配置

MathJax提供了一个让用户自定义配置的功能，很简单就是使用`script标签对，但注意的是需要声明类型type="text/x-mathjax-config"`，要想让这个内联配置生效，需要把它放在加载 MathJax.js 之前。

```js
<script type="text/x-mathjax-config">
    MathJax.Hub.Config({
      showProcessingMessages: false, // 关闭js加载过程信息
      messageStyle: "none", // 不显示信息
      extensions: ["tex2jax.js"],
      jax: ["input/TeX", "output/HTML-CSS"],
      tex2jax: {
        inlineMath: [ ['$','$'], ["\\(","\\)"] ], // 行内公式选择符
        displayMath: [ ['$$','$$'], ["\\[","\\]"] ], // 段内公式选择符
        skipTags: [
          'script', 
          'noscript', 
          'style', 
          'textarea', 
          'pre',
          'code',
          'a'
        ], // 避开某些标签
        ignoreClass: "comment-content" // 避开含该class的标签
      },
      "HTML-CSS": {
        availableFonts: ["STIX", "TeX"], // 可选字体
      },
      showMathMenu:false // 关闭右击菜单显示
  })
</script>
```

### 美化

MathJax有一些默认的样式，例如右键点击该公式时周围有一圈蓝色的边框，我们可以覆盖这些默认样式，从而美化数学公式。

```scss
<style lang="scss">
// 覆盖MathJax默认样式

// 去掉蓝框
.MathJax{
  outline:0;
}
// 改变字体大小
.MathJax span{
  font-size:14px;
}
// 处理公式过长溢出问题
.MathJax_Display{
  overflow-x:auto;overflow-y:hidden;
}
</style>
```

### 渲染数学公式

MathJax提供了`MathJax.Hub.Queue(["Typeset",MathJax.Hub])`来执行渲染。

默认情况下，`MathJax.Hub.Queue(["Typeset",MathJax.Hub])`是对整个DOM树进行识别的，如果需要约束识别范围，可以传入第三个参数，官方文档告诉我们`MathJax.Hub.Queue`的第三个参数就是识别范围，下面的代码就是告诉我们要在id为`app`的标签内去做公式识别。

```js
// 如果，不传入第三个参数，则渲染整个document
// 因为使用的Vuejs，所以指明#app，以提高速度
window.MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById('app')]);
```

另外需要注意的一点是，在SPA单页应用中，数据是动态获取的，所以我们需要在获取数据后，再执行渲染。下面是我总结的，常用的两个地方，可以根据具体的项目需求，选择在哪个钩子函数中执行渲染。

```js
mounted () {
  // 渲染数学公式
  this.$nextTick(() => {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, document.getElementById('app')])
  })
}

updated () {
  // 渲染数学公式
  this.$nextTick(() => {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, document.getElementById('app')])
  })
}
```

### 温馨提示

上面我们是通过 BootCDN 加载 MathJax，一般来说问题不大。**但是，重点来了，BootCDN 有时候不稳定，毕竟是免费的，要求不能太高啊**，如果你的网站访问量比较大，建议去[官网](https://github.com/mathjax/MathJax)下载 MathJax 压缩包，解压后放在自己公司的 CDN 或者 OSS 上。

