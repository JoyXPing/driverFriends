<template>
    <div class="list">
        <el-table class="table-content" :data="userList" border stripe height="100%" style="width: 100%">
            <el-table-column prop="userName" label="姓名" width="180">
            </el-table-column>
            <el-table-column
                prop="userRole"
                label="部门"
                width="180"
            ></el-table-column>
            <el-table-column prop="userMobile" label="电话" width="250"> </el-table-column>
            <el-table-column prop="userState" label="当前状态" width="200" :formatter="stateName">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
                <template slot-scope="scope">
                <el-button
                    @click="handleAgree(scope.row)"
                    size="mini"
                    type="primary"
                    v-if="
                    scope.row.userState == 'Unaudited' || scope.row.userState == 'Off'
                    "
                >
                    启用
                </el-button>
                <el-button
                    @click="handleDel(scope.$index, scope.row)"
                    size="mini"
                    type="danger"
                    v-if="scope.row.userState == 'Unaudited'"
                >
                    拒绝
                </el-button>
                <el-button
                    @click="handleDel(scope.$index, scope.row)"
                    size="mini"
                    type="danger"
                    v-if="scope.row.userState == 'On' || scope.row.userState == 'Off'"
                >
                    删除
                </el-button>
                <el-button
                    @click="handleOff(scope.row)"
                    size="mini"
                    type="warning"
                    v-if="scope.row.userState == 'On'"
                >
                    封号
                </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
   import axios from "axios";
import Qs from "qs";
import { getToken } from "@/utils/index.js";
export default {
  data() {
    return {
      userList: []
    };
  },
  mounted() {
    var _self = this;
    let data = {};
    axios.post('/admin/user/list', Qs.stringify(data),{
        headers: { Token: getToken("Token") }
    }).then(function(response) {
        _self.userList = response.data.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    stateName(row) {
      if (row.userState == "On") {
        return "已启用";
      } else if (row.userState == "Unaudited") {
        return "未审核";
      } else if (row.userState == "Off") {
        return "已封号";
      } else if (row.userState == "Del") {
        return "已删除";
      }
    },
    changeState(row, state) {
      var _self = this;
      let data = {
        userId: row.userId,
        toBeState: state
      };
      axios.post('/admin/changeUserState', Qs.stringify(data),{
        headers: { Token: getToken("Token") }
      }).then(function(response) {
          let messgae = _self.stateName(row);
          if (response.data.code === 0) {
            _self.$message({
              showClose: true,
              message: messgae,
              type: "success"
            });
          } else {
            _self.$message({
              showClose: true,
              message: response.data.msg,
              type: "error"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleAgree(row) {
      row.userState = "On";
      this.changeState(row, row.userState);
    },
    handleDel(index, row) {
      this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
					row.userState = "Del";
          this.changeState(row, row.userState);
          this.userList.splice(index, 1);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    handleOff(row) {
      row.userState = "Off";
      this.changeState(row, row.userState);
    }
  }
};
</script>

<style scoped>
.list {
  height: 83vh;
} 
.table-content {
    border-radius: 0 10px 10px 0;
    height: 100%;
}
</style>