<template>
  <div id="app">
    <div id="nav">
      <div class="title">友货平台系统</div>
    </div>
    <router-view/>
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  color: #fff;
  background: url(assets/bg.png) no-repeat;
  background-size:100%;
  padding: 20px;
  min-height: 750px;
}
.title {
  padding-top: 50px;
  height: 100px;
  line-height: 100px;
  font-size: 40px;
  font-weight: 800;
}
</style>
