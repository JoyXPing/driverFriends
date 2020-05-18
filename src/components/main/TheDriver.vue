<template>
    <div>
        <van-tabbar v-model="active">
            <van-tabbar-item  replace to="/main/Driver/home" icon="home-o">主页</van-tabbar-item>
            <van-tabbar-item  replace to="/main/Driver/task" icon="orders-o">任务</van-tabbar-item>
            <van-tabbar-item  replace to="/main/Driver/demand" icon="goods-collect-o">需求</van-tabbar-item>
            <van-tabbar-item  replace to="/main/Driver/center" icon="user-o">个人中心</van-tabbar-item>
        </van-tabbar>
        <div>
            <router-view/>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                active: 0
            }
        }
    }
</script>

<style scoped>

</style>