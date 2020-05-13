<template>
    <div class="the-admin">
      <div class="admin-left">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <el-menu-item index="1">
              <i class="el-icon-user-solid"></i>
              <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="2">
              <i class="el-icon-s-cooperation"></i>
              <span slot="title">公司列表</span>
          </el-menu-item>
          <el-menu-item index="3">
              <i class="el-icon-truck"></i>
              <span slot="title">卡车列表</span>
          </el-menu-item>
          <el-menu-item index="4">
              <i class="el-icon-s-order"></i>
              <span slot="title">任务管理</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="admin-right">
        
      </div>
    </div>
    
</template>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
.the-admin {
  display: flex;
}
.admin-left {
  width: 30%;
}
</style>