<template>
  <div class="pdf-preview">
    <iframe id="iframe" width="100%" height="760" scrolling="no" :src='"/static/pdf/web/viewer.html?file=" + url'></iframe>
  </div>
</template>

<script>
export default {
  name: 'PdfPreview',
  props: {
    url: {
      type: String
    }
  },
  // 如果 props 是一个文件信息，可以在下面拼接好资源的URL再加载
  // computed: {
  //   url () {
  //     return resourceUrl + `api/documents/${this.file.id}/preview/${this.file.name}.pdf`
  //   }
  // },
  mounted () {
    // 不需要的工具可以在iframe加载完成之后隐藏
    this.$nextTick(() => {
      let iframe = document.getElementById('iframe')
      iframe.onload = function () {
        // 隐藏部分工具
        iframe.contentWindow.document.getElementById('openFile').style.display = 'none'
        iframe.contentWindow.document.getElementById('print').style.display = 'none'
        iframe.contentWindow.document.getElementById('download').style.display = 'none'
        iframe.contentWindow.document.getElementById('viewBookmark').style.display = 'none'
        iframe.contentWindow.document.getElementById('secondaryToolbarToggle').style.display = 'none'
      }
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
