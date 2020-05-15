<template>
    <div class="the-admin">
      <div class="admin-left">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @select="handleSelect">
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
        <router-view/>
      </div>
    </div>
    
</template>

<script>
  export default {
    methods: {
      handleSelect(key) {
        if (this.$route.path != "/admin/main/userlist" && key == 1) {
          this.$router.push("/admin/main/userlist");
        }else if (this.$route.path != "/admin/main/companylist" && key == 2) {
          this.$router.push("/admin/main/companylist");
        }else if (this.$route.path != "/admin/main/trucklist" && key == 3) {
          this.$router.push("/admin/main/trucklist");
        }else if (this.$route.path != "/admin/main/tasklist" && key == 4) {
          this.$router.push("/admin/main/tasklist");
        }
      }
    }
  }
</script>

<style scoped>
.the-admin {
  display: flex;
}
.admin-left {
  width: 20%;
  height: 450px;
}
.el-menu-vertical-demo {
  padding: 5px;
  border-radius: 10px 0 0 10px;
  height: 540px;
}
.admin-right {
  width: 80%;
}
</style>