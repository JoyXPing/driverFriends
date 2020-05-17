<template>
    <div class="list">
        <el-table class="table-content" :data="goodsList" border stripe height="550" style="width: 100%">
            <el-table-column prop="goodsName" label="商品名" width="200">
            </el-table-column>
            <el-table-column prop="bossLocation" label="所在城市" width="200">
            </el-table-column>
            <el-table-column prop="goodsWeight" label="货物重量(t)" width="200"> </el-table-column>
            <el-table-column prop="goodsPrice" label="商品价格(元/t)" width="200"></el-table-column>
            <el-table-column prop="goodsState" label="操作" width="200" :formatter="stateName">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
                <template slot-scope="scope">
                <el-button
                    @click="handleDel(scope.$index, scope.row)"
                    size="mini"
                    type="danger"
                    v-if="scope.row.goodsState == 'Wait' || scope.row.goodsState == 'Finished'"
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
      goodsList: []
    };
  },
  mounted() {
    var _self = this;
    let data = {};
    axios.post('/admin/goods/list', Qs.stringify(data),{
        headers: { Token: getToken("Token") }
    }).then(function(response) {
        _self.goodsList = response.data.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    stateName(row) {
      if (row.goodsState == "Wait") {
        return "未出售";
      } else if (row.goodsState == "Unaudited") {
        return "已出售";
      } else if (row.goodsState == "Del") {
        return "已删除";
      }
    },
    changeState(row, state) {
      var _self = this;
      let data = {
        goodsId: row.goodsId,
        toBeState: state
      };
      axios.post('/admin/goods/state', Qs.stringify(data),{
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
    handleDel(index, row) {
			this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
					row.goodsState = "Del";
					this.changeState(row, row.goodsState);
					this.goodsList.splice(index, 1);
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
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