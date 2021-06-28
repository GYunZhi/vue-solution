<template>
  <div>
    <div class="pdf">
      <div class="item">
        <h2>预览本地文件</h2>
        <pdf-preview :url="local"></pdf-preview>
      </div>

      <div class="item">
        <h2>预览服务器文件</h2>
        <pdf-preview :url="urlAccess"></pdf-preview>
      </div>
    </div>
    <div class="pdf">
      <div class="item">
        <h2>PDF 渲染组件</h2>
        <pdf-viewer :url="urlAccess"></pdf-viewer>
      </div>
      <div class="item">
        <h2>PDF 渲染组件(分页模式)</h2>
        <pdf-viewer :isPagination="true" :url="urlAccess"></pdf-viewer>
      </div>
    </div>
  </div>
</template>

<script>
import PdfPreview from '../components/PdfPreview'
import PdfViewer from '../components/PdfViewer.vue'
export default {
  name: 'pdf',
  data () {
    return {
      local: '/static/ts.pdf', // 本地资源
      urlAccess: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf', // 远程资源，跨域可访问
      urlUnAccess: 'https://gongyz.oss-cn-shenzhen.aliyuncs.com/files/TypeScript语法.pdf' // 远程资源，跨域不可访问
    }
  },
  components: {
    PdfPreview,
    PdfViewer
  }
}
</script>

<style lang="scss" scoped>
.pdf {
  display: flex;
  justify-content: space-around;
  .item {
    flex: 1;
  }
  .item+.item {
    margin-left: 20px;
  }
}
.pdf + .pdf {
  margin-top: 20px;
}
</style>
