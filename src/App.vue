<template>
  <div id="app">
    <el-page-header @back="goBack" content="详情页面"></el-page-header>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    goBack () {
      console.log('go back')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
