<template>
    <div class="home">
        <div class="count-info">
            <van-button color="linear-gradient(to left, #4bb0ff, #6149f6)">
                <div class="btn-text">已接收任务</div>
                <div class="btn-text">{{viewInfo.sumGetTask}}</div>
            </van-button>
            <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)">
                <div class="btn-text">已发布需求</div>
                <div class="btn-text">{{viewInfo.sumIssueDemand}}</div>
            </van-button>
        </div>
        <div class="home-info">
            <div class="home-info-title">
                卡车信息
            </div>
            <van-cell-group>
                <van-cell :border="false" title="车牌号码" :value="truck.truckNumber" />
                <van-cell :border="false" title="司机姓名" :value="truck.truckOwnerName" />
                <van-cell :border="false" title="最大承载量(t)" :value="truck.maxLaden" />
            </van-cell-group>
        </div>
        <div class="need-info">
            <div class="home-info-title">
                正在进行的任务详情
            </div>
            <div v-if="viewInfo.task != ''">
                <van-collapse 
                    v-model="activeName" 
                    accordion 
                    v-for="(item,index) in viewInfo.task" 
                    :key="item.taskId"
                >
                    <van-collapse-item :title="item.cargoKind" :value="taskState(item)" :name="index" >
                        <van-cell-group>
                            <van-cell title="商品名称" :value="item.cargoKind" />
                            <van-cell title="商品重量(t)" :value="item.cargoWeight" />
                            <van-cell title="商品所在城市" :value="item.destinationCity" />
                            <van-cell title="商品详细地址" :value="item.destinationAddress" />
                            <van-cell title="截止时间" :value="item.taskDeadline" />
                            <van-cell title="备注" :value="item.remark" />
                        </van-cell-group>
                    </van-collapse-item>
                </van-collapse>
            </div>
            <div v-else>
                <van-empty description="尚无需求信息"> </van-empty>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import qs from "qs"
import { getToken } from "@/utils/index.js";
export default {
    data() {
        return {
            viewInfo: '',
            truck: '',
            itemDetail: '',
            activeName: ''
        }
    },
    mounted() {
        axios.post('/driver/overview',qs.stringify(),{
            headers: { Token: getToken("Token") }
        }).then(res => {
            if(res.data.code === 0) {
                this.viewInfo = res.data.data;
                this.truck = this.viewInfo.truck;
            }
        })
    },
    methods: {
        taskState(item) {
            if (item.demandState == "Wait") {
                return "待领取";
            } else if (item.demandState == "Got") {
                return "已领取";
            }else if (item.demandState == "Transiting") {
                return "运送中";
            } else if (item.demandState == "Finished") {
                return "已完结";
            }else if (item.demandState == "Canceled") {
                return "已取消";
            }else if (item.demandState == "Del") {
                return "已删除";
            }
        }
    }
}
</script>

<style scoped>
.home {
    color: #000;
    padding: 0 1rem;
}
.count-info {
    display: flex;
    justify-content: space-around;
    border-radius: 3rem;
}
.van-button {
    width: 35%;
    height: 4rem;
    border-radius: 1rem;
}
.btn-text {
    margin: 0.5rem 0;
}
.home-info {
    margin: 1rem 0;
    background-color: #fff;
    border-radius: 1em;
    box-shadow: 0.3em 0.3em 0.5em #eee;
    padding: 1em;
}
.need-info {
    margin-bottom: 3.5rem;
    min-height: 60vh;
    background-color: #fff;
    border-radius: 1em;
    box-shadow: 0.3em 0.3em 0.5em #eee;
    padding: 1em;
}
.home-info-title {
    margin-bottom: 1rem;
}
</style>
<style>
.van-cell__title {
    text-align: left;
}
</style>