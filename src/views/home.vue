<template>
  <div class="home">
    <h1>vue项目中集成 pdf 和 office 预览功能</h1>

    <div class="nav">
      <router-link  :to="{ name: 'pdf' }">pdf预览</router-link>
      <router-link :to="{ name: 'office' }">office预览</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style lang="scss" scoped>
.nav {
  a {
    margin-left: 20px;
  }
}
</style>
