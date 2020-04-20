# Vue项目解决方案合集

### 集成 pdf 和 office 预览功能

目前很多项目都有 pdf 和 office 文件预览功能，有一些服务商也提供专业的在线预览服务，但是如果你的项目只是需要实现简单的预览需求，那么自己集成是一个不错的选择，毕竟免费啊，不香嘛。

#### 预览pdf

##### 工具

pdf.js，去官网[下载](http://mozilla.github.io/pdf.js/)之后解压，解压之后的文件夹放到 static 文件夹中

> 官网访问很慢，打不开的同学直接使用本项目中的pdf.js也是一样的

##### 组件

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

##### 预览

本地文件预览

可以把文件放在 static 文件夹中，然后把路径传到组件中就可以了

```js
<c-pdf-preview :url="'/static/ts.pdf'"></c-pdf-preview>
```

远程文件预览

如果预览的是远程文件，有两个地方需要注意：

1. 解决跨域问题，对于跨域问题，有两种解决方案，第一种是配置CORS，设置一下 `Access-Control-Allow-Origin`；第二种让后台返回一个流的形式的pdf，pdf.js插件是可以识别的，也不会报跨域问题。这两种方式都需要后端配合。
2. 远程文件和服务器不在一个域名下时，例如远程文件是一个 OSS 地址，会出现下面的报错：

```js
Error: file origin does not match viewer's

# 解决办法：注释掉这个抛错的代码就可以了
if (origin !== viewerOrigin && protocol !== 'blob:') {
    // 处理跨域问题
    // throw new Error('file origin does not match viewer\'s');
}
```

#### 预览 office 文件

##### 工具

对于 office 文件，需要借助微软的 Office Online 在线预览Office文档

##### 组件

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

##### 预览

```js
// 下面是在网上找的几个地址，可以预览试试
word: 'http://officeweb365.com/viewfile/关于加快临时设施建设速度和保证建设标准的通知.docx',
excel: 'http://officeweb365.com/viewfile/在线预览Office服务费用说明（预览示例文件）.xlsx',
ppt: 'http://officeweb365.com/viewfile/深入浅出HTML5游戏开发.pptx'
```

这里要注意的是，需要保证你提供的文件地址是开放的，你如果你给的地址是需要访问权限的，那么是预览不了的。另外，文件的大小超过 10M 也预览不了，所有大家看具体情况去考虑是否满足需求。

#### 总结

参考上面的说明和示例代码，你已经可以在项目里面实现 pdf 和 office 预览，组件里面也有一些我个人在项目中的额外处理，也许对大家有一些借鉴作用。有其他问题大家可以提 Issue 或者私信我 1018017334@qq.com，我也很乐意和大家一起讨论。后期会把在工作中遇到的一些解决方案陆续和大家一起分享。