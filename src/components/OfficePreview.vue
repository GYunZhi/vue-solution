<template>

  <div>
    <iframe
      id="iframe"
      :src="'https://view.officeapps.live.com/op/view.aspx?src=' + url"
      frameborder="0"
      width="100%"
      height="870px"
      allowfullscreen="true">
    </iframe>
  </div>

  <!-- 限制文件大小、隐藏部分 office 默认界面 -->
  <!-- <div :class="['office-preview', { 'ppt': isPPT }]">
    <div class="container-in clearfix">
      <div class="iframe-wrap">
        <iframe
          id="iframe"
          v-if="!isLarge"
          :src="'https://view.officeapps.live.com/op/view.aspx?' + url"
          frameborder="0"
          width="100%"
          height="870px"
          allowfullscreen="true">
        </iframe>
        <div class="max-size"  v-if="isLarge">文件过大，无法预览，请下载！</div>
      </div>
    </div>
  </div> -->
</template>

<script>
// import { resourceUrl } from '@/utils/constant'
export default {
  name: 'OfficePreview',
  props: {
    url: {
      type: String
    }
  },
  computed: {
    // 如果 props 是一个文件信息，可以在下面拼接好资源的URL再加载
    // url () {
    //   return `https://view.officeapps.live.com/op/view.aspx?src=` + resourceUrl + `api/documents/${this.file.id}/preview/${this.file.name}.${this.file.suffixType}`
    // },
    // 文件超过10M无法预览
    // isLarge () {
    //   if (this.file.size !== '') {
    //     if (this.file.size > 10 * 1024) {
    //       return true
    //     } else {
    //       return false
    //     }
    //   }
    // }
    // isPPT () {
    //   if (this.file.suffixType === 'ppt' || this.file.suffixType === 'pptx') {
    //     return true
    //   } else {
    //     return false
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.office-preview {
  position: relative;
  z-index: 10;
  height: 760px;
  overflow: hidden;
  background-color: #fff;
  border: 1px solid #e1e1e1;
}
.office-preview.ppt {
  height: 783px;
}
.iframe-wrap {
  position: relative;
  height: 720px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: -14px;
}
.max-size {
  font-size: 18px;
}
</style>
