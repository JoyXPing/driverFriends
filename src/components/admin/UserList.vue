<template>
    <div>
        <el-table class="table-content" :data="userList" border stripe height="450" style="width: 100%">
            <el-table-column prop="userName" label="姓名" width="180">
            </el-table-column>
            <el-table-column
                prop="userRole"
                label="部门"
                width="180"
            ></el-table-column>
            <el-table-column prop="userMobile" label="电话" width="230"> </el-table-column>
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
                <!-- <div v-else-if="scope.row.docState === 'On'"> -->
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
                <!-- </div> -->
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
        console.log(_self.userList);
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
      row.userState = "Del";
      this.changeState(row, row.userState);
      this.userList.splice(index, 1);
    },
    handleOff(row) {
      row.userState = "Off";
      this.changeState(row, row.userState);
    }
  }
};
</script>

<style scoped>
.table-content {
    padding-left: 10px;
    border-radius: 0 10px 10px 0;
}
</style>