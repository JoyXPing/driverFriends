<template>
    <div class="list">
        <el-table class="table-content" :data="companyList" border stripe height="100%" style="width: 100%">
            <el-table-column fixed prop="companyName" label="公司名称" width="180">
            </el-table-column>
            <el-table-column prop="companyBossName" label="老板姓名" width="180">
            </el-table-column>
            <el-table-column prop="companyMobile" label="电话" width="250"> </el-table-column>
            <el-table-column prop="companyCity" label="所在城市" width="250"> </el-table-column>
            <el-table-column prop="companyAddress" label="详细地址" width="250"> </el-table-column>
            <el-table-column prop="userState" label="当前状态" width="200" :formatter="stateName">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
                <template slot-scope="scope">
                <el-button
                    @click="handleAgree(scope.row)"
                    size="mini"
                    type="primary"
                    v-if="
                    scope.row.companyState == 'Unaudited' || scope.row.companyState == 'Off'
                    "
                >
                    启用
                </el-button>
                <el-button
                    @click="handleDel(scope.$index, scope.row)"
                    size="mini"
                    type="danger"
                    v-if="scope.row.companyState == 'Unaudited'"
                >
                    拒绝
                </el-button>
                <el-button
                    @click="handleDel(scope.$index, scope.row)"
                    size="mini"
                    type="danger"
                    v-if="scope.row.companyState == 'On' || scope.row.companyState == 'Off'"
                >
                    删除
                </el-button>
                <el-button
                    @click="handleOff(scope.row)"
                    size="mini"
                    type="warning"
                    v-if="scope.row.companyState == 'On'"
                >
                    禁用
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
      companyList: []
    };
  },
  mounted() {
    var _self = this;
    let data = {};
    axios.post('/admin/company/list', Qs.stringify(data),{
        headers: { Token: getToken("Token") }
    }).then(function(response) {
        _self.companyList = response.data.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    stateName(row) {
      if (row.companyState == "On") {
        return "已启用";
      } else if (row.companyState == "Unaudited") {
        return "未审核";
      } else if (row.companyState == "Off") {
        return "已禁用";
      } else if (row.companyState == "Del") {
        return "已删除";
      }
    },
    changeState(row, state) {
      var _self = this;
      let data = {
        companyBoss: row.companyBoss,
        companyId: row.companyId,
        toBeState: state
      };
      axios.post('/admin/company/state', Qs.stringify(data),{
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
      row.companyState = "On";
      this.changeState(row, row.companyState);
    },
    handleDel(index, row) {
			this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
					row.companyState = "Del";
					this.changeState(row, row.companyState);
					this.companyList.splice(index, 1);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    handleOff(row) {
      row.companyState = "Off";
      this.changeState(row, row.companyState);
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