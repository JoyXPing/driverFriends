<template>
    <div class="task-list">
        <div v-if="demandList != ''">
            <van-collapse 
                v-model="activeName" 
                accordion 
                v-for="(item,index) in demandList" 
                :key="item.taskId"
                @change="itemInfo(item,index)"
            >
                <van-collapse-item :title="item.demandName" :value="taskState(item)" :name="index" >
                    <van-cell-group>
                        <van-cell title="商品重量(t)" :value="itemDetail.demandWeight" />
                        <van-cell title="需求起点" :value="itemDetail.demandStart" />
                        <van-cell title="需求终点" :value="itemDetail.demandDestination" />
                        <van-cell title="发布人姓名" :value="itemDetail.issueName " />
                        <van-cell title="发布人手机号" :value="itemDetail.issueMobile" />
                        <div style="margin: 16px;">
                            <van-button round block type="danger" @click="delTask(item)">
                            删除
                            </van-button>
                        </div>
                    </van-cell-group>
                </van-collapse-item>
            </van-collapse>
        </div>
        <div v-else>
            <van-empty description="尚无发布商品">
            </van-empty>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import qs from "qs"
import { getToken } from "@/utils/index.js"
// import { Notify } from 'vant';
export default {
    data() {
        return {
            demandList: [],
            itemDetail: '',
            activeName: ''
        }
    },
    mounted() {
        axios.post('/task/demand/list',qs.stringify(),{
            headers: { Token: getToken("Token") }
        }).then(res => {
            if(res.data.code === 0) {
                this.demandList = res.data.data
            }
        })
    },
    methods: {
        taskState(item) {
            if (item.taskState == "Wait") {
                return "待领取";
            } else if (item.taskState == "Got") {
                return "已领取";
            }else if (item.taskState == "Transiting") {
                return "运送中";
            } else if (item.taskState == "Finished") {
                return "已完结";
            }else if (item.taskState == "Canceled") {
                return "已取消";
            }else if (item.taskState == "Del") {
                return "已删除";
            }
        },
        itemInfo(item) {
            if(item.demandId !== this.itemDetail.demandId) {
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
        },
        delTask(item) {
            let params = {
                demandId : item.demandId,
                state: 'Del'
            }
            axios.post('/task/demand/state',qs.stringify(params),{
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
.task-list {
    min-height: 60vh;
    background-color: #fff;
    border-radius: 1em;
    box-shadow: 0.3em 0.3em 0.5em #eee;
    padding: 1em;
}
.bottom-button {
    width: 12rem;
}
.i-btn-l {
    width: 6rem;
    border-radius: 2rem 0 0 2rem;
}
.i-btn-r {
    width: 6rem;
    border-radius: 0 2rem 2rem 0;
}
.list-add {
    margin: 1rem 0;
}
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
.block {
    width: 80%;
    background-color: #fff;
    border-radius: 20px;
    padding: 15px;
}
</style>
<style>
.van-cell__title {
    text-align: left;
}
.van-cell__value--alone  {
    text-align: center;
}
</style>