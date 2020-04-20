<template>
  <div class="pdf">
    <div class="item">
      <h2>word预览</h2>
      <c-office-preview :url="word"></c-office-preview>
    </div>

    <div class="item">
      <h2>excel预览</h2>
      <c-office-preview :url="excel"></c-office-preview>
    </div>

    <div class="item">
      <h2>ppt预览</h2>
      <c-office-preview :url="ppt"></c-office-preview>
    </div>
  </div>
</template>

<script>
import COfficePreview from '../components/COfficePreview'
export default {
  name: 'pdf',
  data () {
    return {
      word: 'http://officeweb365.com/viewfile/关于加快临时设施建设速度和保证建设标准的通知.docx',
      excel: 'http://officeweb365.com/viewfile/在线预览Office服务费用说明（预览示例文件）.xlsx',
      ppt: 'http://officeweb365.com/viewfile/深入浅出HTML5游戏开发.pptx'
    }
  },
  components: {
    COfficePreview
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
