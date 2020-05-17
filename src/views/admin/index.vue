<template>
    <div>
        <div class="title">友货平台系统</div>
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
.title {
  height: 100px;
  line-height: 100px;
  font-size: 40px;
  font-weight: 800;
}
.content {
    padding: 0 20px;
}
</style>