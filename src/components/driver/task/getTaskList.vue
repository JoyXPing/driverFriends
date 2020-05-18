<template>
    <div class="task-list">
        <div v-if="taskList != ''">
            <van-collapse 
                v-model="activeName" 
                accordion 
                v-for="(item,index) in taskList" 
                :key="item.taskId"
                @change="itemInfo(item,index)"
            >
                <van-collapse-item :title="item.cargoKind" :value="taskState(item)" :name="index" >
                    <van-cell-group>
                        <van-cell title="商品重量" :value="itemDetail.cargoWeight" />
                        <van-cell title="商品所在城市" :value="itemDetail.destinationCity" />
                        <van-cell title="详细地址" :value="itemDetail.destinationAddress" />
                        <van-cell title="截止时间" :value="itemDetail.taskDeadline" />
                        <van-cell title="备注" :value="itemDetail.remark" />
                        <div style="margin: 16px;" v-if="item.taskState === 'Wait'">
                            <van-button round block type="info" @click="gotTask(item)">
                            接收任务
                            </van-button>
                        </div>
                        <div style="margin: 16px;" v-if="item.taskState === 'Got'">
                            <van-button round block type="info" @click="gotgoods(item)">
                            已收货
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
import { Notify } from 'vant';
export default {
    data() {
        return {
            taskList: [],
            itemDetail: '',
            activeName: ''
        }
    },
    mounted() {
        axios.post('/task/list',qs.stringify(),{
            headers: { Token: getToken("Token") }
        }).then(res => {
            if(res.data.code === 0) {
                this.taskList = res.data.data
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
            if(item.taskId !== this.itemDetail.taskId) {
                let params = {
                    taskId : item.taskId
                }
                axios.post('/task/detail',qs.stringify(params),{
                    headers: { Token: getToken("Token") }
                }).then(res => {
                    if(res.data.code === 0) {
                        this.itemDetail = res.data.data;
                    }
                })
            }
        },
        gotTask(item) {
            let params = {
                taskId : this.itemDetail.taskId
            }
            axios.post('/driver/gettask',qs.stringify(params),{
                    headers: { Token: getToken("Token") }
                }).then(res => {
                    if(res.data.code === 0) {
                        item.taskState = 'Got';
                        Notify({ type: 'success', message: '领取任务成功' });
                    }else {
                        Notify({ type: 'danger', message: res.data.msg });
                    }
                })
        },
        gotgoods(item) {
            let params = {
                taskId : this.itemDetail.taskId
            }
            axios.post('/driver/totransit',qs.stringify(params),{
                    headers: { Token: getToken("Token") }
                }).then(res => {
                    if(res.data.code === 0) {
                        item.taskState = 'Transiting';
                        Notify({ type: 'success', message: '已收货' });
                    }else {
                        Notify({ type: 'danger', message: res.data.msg });
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