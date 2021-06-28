<template>
  <div class="pdf-viewer">
    <div v-if="isPagination" class="tools">
      <button @click="prev">上一页</button>
      <button @click="next">下一页</button>
      <span>{{ this.pageNumber + '/' + this.total }}</span>

      <button @click="zoomOut">放大</button>
      <button @click="zoomIn">缩小</button>
      <span>{{ this.scale }} %</span>
    </div>
    <div :id='id'></div>
  </div>
</template>

<script>
import pdfjsLib from '../../static/pdf/build/pdf'
import pdfjsWorker from '../../static/pdf1/build/pdf.worker'
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker

export default {
  name: 'PdfViewer',
  props: {
    url: {
      type: String
    },
    isPagination: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      id: new Date().getTime() + Math.random() * 100,
      singleCanvasId: 'single-' + new Date().getTime() + Math.random() * 100,
      pdf: null,
      pageNumber: 1,
      total: 0,
      scale: 100
    }
  },
  mounted () {
    this.renderPdf()
  },
  methods: {
    prev () {
      this.pageNumber--
      if (this.pageNumber <= 0) {
        this.pageNumber = this.total
      }
      this.renderSinglePage(this.pdf, this.pageNumber)
    },
    next () {
      this.pageNumber++
      if (this.pageNumber >= this.total) {
        this.pageNumber = 1
      }
      this.renderSinglePage(this.pdf, this.pageNumber)
    },
    zoomOut () {
      if (this.scale === 180) return
      this.scale += 20
      document.getElementById(this.singleCanvasId).style.width = this.scale + '%'
    },
    zoomIn () {
      if (this.scale === 20) return
      this.scale -= 20
      document.getElementById(this.singleCanvasId).style.width = this.scale + '%'
    },
    renderSinglePage (pdf, pageNumber) {
      this.pdf = pdf
      let container = document.getElementById(this.id)
      pdf.getPage(pageNumber).then((page) => {
        let scale = (container.offsetWidth / page.view[2])
        let viewport = page.getViewport(scale)

        let canvas = document.createElement('canvas')
        canvas.id = this.singleCanvasId
        canvas.width = viewport.width
        canvas.height = viewport.height

        // 分页模式
        let oldCanvas = document.getElementById(this.singleCanvasId)
        if (oldCanvas) {
          container.replaceChild(canvas, oldCanvas)
        } else {
          container.appendChild(canvas)
        }

        let ctx = canvas.getContext('2d')
        var renderContext = {
          canvasContext: ctx,
          transform: [1, 0, 0, 1, 0, 0],
          viewport: viewport,
          intent: 'print'
        }
        page.render(renderContext)
      })
    },
    renderAllPage (pdf, pageNumber, numPages) {
      let container = document.getElementById(this.id)
      let _this = this
      pdf.getPage(pageNumber).then((page) => {
        let scale = (container.offsetWidth / page.view[2])
        let viewport = page.getViewport(scale)
        let canvas = document.createElement('canvas')
        canvas.width = viewport.width
        canvas.height = viewport.height
        container.appendChild(canvas)
        let ctx = canvas.getContext('2d')
        var renderContext = {
          canvasContext: ctx,
          transform: [1, 0, 0, 1, 0, 0],
          viewport: viewport,
          intent: 'print'
        }
        page.render(renderContext).then(() => {
          pageNumber += 1
          if (pageNumber <= numPages) {
            _this.renderAllPage(pdf, pageNumber, numPages)
          }
        })
      })
    },
    renderPdf () {
      const loadingTask = pdfjsLib.getDocument(this.url)
      loadingTask.promise.then((pdf) => {
        let numPages = this.total = pdf.numPages
        let pageNumber = 1
        // 判断是否分页显示
        console.log(this.isPagination)
        if (this.isPagination) {
          this.renderSinglePage(pdf, pageNumber)
        } else {
          this.renderAllPage(pdf, pageNumber, numPages)
        }
      }, function (reason) {
        console.error('Error: ' + reason)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.pdf-viewer {
  width: 100%;
  overflow: auto;
}
</style>
