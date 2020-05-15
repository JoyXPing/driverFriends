<template>
    <div>
       <van-tabbar v-model="active"  @change="onChange">
        <van-tabbar-item  replace to="/main/Boss/Home" icon="home-o">主页</van-tabbar-item>
        <van-tabbar-item  replace to="/main/Boss/Task" icon="orders-o">任务</van-tabbar-item>
        <van-tabbar-item  replace to="/main/Boss/Goods" icon="goods-collect-o">商品</van-tabbar-item>
        <van-tabbar-item  replace to="/main/Boss/Center" icon="user-o">个人中心</van-tabbar-item>
      </van-tabbar>
      <div>
        <router-view/>
      </div>
    </div>
</template>

<script>
    export default {
  data () {
    return {
      active: 0,
    }
  },
  methods: {
     onChange(index) {
      console.log({ type: 'primary', message: index });
    },
  }
}
</script>

<style scoped>

</style>