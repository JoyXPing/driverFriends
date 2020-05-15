<template>
    <div>
        <el-table class="table-content" :data="truckList" border stripe height="550" style="width: 100%">
            <el-table-column prop="truckNumber" label="车牌号" width="200">
            </el-table-column>
            <el-table-column prop="truckOwnerName" label="拥有者姓名" width="200">
            </el-table-column>
            <el-table-column prop="maxLaden" label="最大载货量" width="200"> </el-table-column>
            <el-table-column prop="truckState" label="当前状态" width="200" :formatter="stateName">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
                <template slot-scope="scope">
                <el-button
                    @click="handleAgree(scope.row)"
                    size="mini"
                    type="primary"
                    v-if="
                    scope.row.truckState == 'Unaudited' || scope.row.truckState == 'Off'
                    "
                >
                    启用
                </el-button>
                <el-button
                    @click="handleDel(scope.$index, scope.row)"
                    size="mini"
                    type="danger"
                    v-if="scope.row.truckState == 'Unaudited'"
                >
                    拒绝
                </el-button>
                <el-button
                    @click="handleDel(scope.$index, scope.row)"
                    size="mini"
                    type="danger"
                    v-if="scope.row.truckState == 'On' || scope.row.truckState == 'Off'"
                >
                    删除
                </el-button>
                <el-button
                    @click="handleOff(scope.row)"
                    size="mini"
                    type="warning"
                    v-if="scope.row.truckState == 'On'"
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
      truckList: []
    };
  },
  mounted() {
    var _self = this;
    let data = {};
    axios.post('/admin/truck/list', Qs.stringify(data),{
        headers: { Token: getToken("Token") }
    }).then(function(response) {
        _self.truckList = response.data.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    stateName(row) {
      if (row.truckState == "On") {
        return "已启用";
      } else if (row.truckState == "Unaudited") {
        return "未审核";
      } else if (row.truckState == "Off") {
        return "已封号";
      } else if (row.truckState == "Del") {
        return "已删除";
      }
    },
    changeState(row, state) {
      var _self = this;
      let data = {
        truckId: row.truckId,
        toBeState: state
      };
      axios.post('/admin/truck/state', Qs.stringify(data),{
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
      row.truckState = "On";
      this.changeState(row, row.truckState);
    },
    handleDel(index, row) {
			this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
					row.truckState = "Del";
					this.changeState(row, row.truckState);
					this.truckList.splice(index, 1);
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});          
			});
    },
    handleOff(row) {
      row.truckState = "Off";
      this.changeState(row, row.truckState);
    }
  }
};
</script>

<style scoped>
.table-content {
    border-radius: 0 10px 10px 0;
}
</style>