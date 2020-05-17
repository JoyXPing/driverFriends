<template>
    <div class="list">
        <el-table class="table-content" :data="taskList" border stripe height="100%" style="width: 100%">
            <el-table-column fixed prop="cargoKind" label="货物种类" width="200">
            </el-table-column>
            <el-table-column prop="cargoWeight" label="货物重量" width="200">
            </el-table-column>
            <el-table-column prop="destinationCity" label="目的地" width="200"> 
            </el-table-column>
            <el-table-column prop="taskDeadline" label="任务期限" width="200">
            </el-table-column>
            <el-table-column prop="companyName" label="公司名" width="200">
            </el-table-column>
            <el-table-column prop="issueName" label="发布人姓名" width="200">
            </el-table-column>
            <el-table-column prop="truckState" label="当前状态" width="200" :formatter="stateName">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="210">
                <template slot-scope="scope">
                <el-button
                    @click="handleFinish(scope.row)"
                    size="mini"
                    type="success"
                >
                    完结
                </el-button>
                <el-button
                    @click="handleCanel(scope.row)"
                    size="mini"
                    type="warning"
                >
                    取消
                </el-button>
                <el-button
                    @click="handleDel(scope.$index, scope.row)"
                    size="mini"
                    type="danger"
                >
                    删除
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
      taskList: []
    };
  },
  mounted() {
    var _self = this;
    let data = {};
    axios.post('/admin/task/list', Qs.stringify(data),{
        headers: { Token: getToken("Token") }
    }).then(function(response) {
        _self.taskList = response.data.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    stateName(row) {
      if (row.taskState == "Wait") {
        return "待领取";
      } else if (row.taskState == "Got") {
        return "已领取";
      }else if (row.taskState == "Transiting") {
        return "运送中";
      } else if (row.taskState == "Finished") {
        return "已完结";
      }else if (row.taskState == "Canceled") {
        return "已取消";
      }else if (row.taskState == "Del") {
        return "已删除";
      }
    },
    changeState(row, state) {
      var _self = this;
      let data = {
        taskId: row.taskId,
        toBeState: state
      };
      axios.post('/admin/task/state', Qs.stringify(data),{
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
    handleFinish(row) {
      row.taskState = "Finished";
      this.changeState(row, row.taskState);
    },
    handleDel(index, row) {
        this.$confirm('此操作将删除该条任务, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
                row.taskState = "Del";
                this.changeState(row, row.taskState);
                this.taskList.splice(index, 1);
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
        });
    },
    handleCanel(row) {
        this.$confirm('此操作将取消该任务, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            row.taskState = "Canceled";
            this.changeState(row, row.taskState);
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消操作'
            });          
        });
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