<template>
  <div class="pdf">
    <div class="item">
      <h2>预览本地文件</h2>
      <c-pdf-preview :url="local"></c-pdf-preview>
    </div>

    <div class="item">
      <h2>预览服务器文件</h2>
      <c-pdf-preview :url="urlAccess"></c-pdf-preview>
    </div>
  </div>
</template>

<script>
import CPdfPreview from '../components/CPdfPreview'
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
    CPdfPreview
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
</style>
