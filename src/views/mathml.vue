<template>
  <div class="mathml">
    <h2>LaTex</h2>
    <div>$\alpha+\beta=\gamma$</div>
    <div>$$\alpha+\beta=\gamma$$</div>
    <div>$$\int_{0}^{1}f(x)dx \sum_{1}^{2}\int_{0}^{1}f(x)dx \sum_{1}^{2}\int_{0}^{1}f(x)dx \sum_{1}^{2}\int_{0}^{1}f(x)dx \sum_{1}^{2}\int_{0}^{1}f(x)dx \sum_{1}^{2}\int_{0}^{1}f(x)dx \sum_{1}^{2}\int_{0}^{1}f(x)dx \sum_{1}^{2}\int_{0}^{1}f(x)dx \sum_{1}^{2}\int_{0}^{1}f(x)dx \sum_{1}^{2}\int_{0}^{1}f(x)dx \sum_{1}^{2}$$</div>

    <h2>MathML</h2>
    <div>
       <math>
        <mroot>
          <mi>x</mi>
          <mn>3</mn>
        </mroot>
      </math>
    </div>
    <div>
      <math displaystyle="true">
      <msubsup>
        <mo> &#x222B;<!-- 积分 --> </mo>
        <mn> 0 </mn>
        <mn> 1 </mn>
      </msubsup>
    </math>
    </div>

    <h2>ASCIIMathML</h2>
    <div>`r=(1+i)/(1+p)-1`</div>
  </div>
</template>

<script>
export default {
  name: 'mathml',
  mounted () {
    // 渲染数学公式
    this.$nextTick(() => {
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, document.getElementById('app')])
    })
  }
}
</script>

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
