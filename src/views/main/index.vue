<template>
    <div>
        <van-nav-bar title="友货平台系统" />
        <div class="content">
            <router-view/>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.content {
    margin: 6rem 1rem;
}
</style>
<style>
.van-nav-bar {
    background-color: rgba(0,0,0,0); 
}
.van-nav-bar .van-icon {
    color: #fff;
}
.van-nav-bar__text {
    color: #fff;
}
.van-nav-bar__title {
    font-weight: 800;
    color: #fff;
    font-size: 18px;
}
</style>