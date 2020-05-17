<template>
    <div class="home">
        <div class="count-info">
            <van-button color="linear-gradient(to left, #4bb0ff, #6149f6)">
                <div class="btn-text">已发布任务</div>
                <div class="btn-text">{{viewInfo.sumIssuedTasks}}</div>
            </van-button>
            <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)">
                <div class="btn-text">已发布商品</div>
                <div class="btn-text">{{viewInfo.sumIssuedGoods}}</div>
            </van-button>
        </div>
        <div class="home-info">
            <div class="home-info-title">
                公司信息
            </div>
            <van-cell-group>
                <van-cell :border="false" title="公司名称" :value="viewInfo.companyName" />
                <van-cell :border="false" title="公司电话" :value="viewInfo.companyMobile" />
                <van-cell :border="false" title="公司所在城市" :value="viewInfo.companyCity" />
                <van-cell :border="false" title="公司详细地址" :value="viewInfo.companyAddress" />
            </van-cell-group>
        </div>
        <div class="need-info">
            <div class="home-info-title">
                需求信息
            </div>
            <div v-if="viewInfo.demand != ''">
                <van-collapse 
                    v-model="activeName" 
                    accordion 
                    v-for="(item,index) in viewInfo.demand" 
                    :key="item.demandId"
                    @change="itemInfo(item,index)"
                >
                    <van-collapse-item :title="item.demandName" :value="taskState(item)" :name="index" >
                        <template #title>
                            <div>
                                {{item.demandName}} 
                                <van-tag mark type="success" v-if="item.issueType === 'Driver'">司机</van-tag>
                                <van-tag mark type="warning" v-else-if="item.issueType === 'Buyer'">买家</van-tag>
                            </div>
                        </template>
                        <van-cell-group>
                            <van-cell title="发布人姓名" :value="itemDetail.issueName" />
                            <van-cell title="发布人手机号" :value="itemDetail.issueMobile" />
                            <van-cell title="需求名称" :value="itemDetail.demandName" />
                            <van-cell title="需求重量(t)" :value="itemDetail.demandWeight" />
                            <van-cell title="需求始发地" :value="itemDetail.demandStart" />
                            <van-cell title="需求目的地" :value="itemDetail.demandDestination" />
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
            itemDetail: '',
            activeName: ''
        }
    },
    mounted() {
        axios.post('/boss/overview',qs.stringify(),{
            headers: { Token: getToken("Token") }
        }).then(res => {
            if(res.data.code === 0) {
                this.viewInfo = res.data.data;
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
        },
        itemInfo(item) {
            let params = {
                demandId : item.demandId
            }
            axios.post('/task/demand/detail',qs.stringify(params),{
                headers: { Token: getToken("Token") }
            }).then(res => {
                if(res.data.code === 0) {
                    this.itemDetail = res.data.data;
                }
            })
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
    height: 5rem;
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