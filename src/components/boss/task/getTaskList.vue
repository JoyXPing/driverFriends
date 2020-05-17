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
                    <van-cell-group v-if="isedit == false">
                        <van-cell title="货物重量(t)" :value="itemDetail.cargoWeight" />
                        <van-cell title="任务最后期限" :value="itemDetail.taskDeadline" />
                        <van-cell title="目的城市" :value="itemDetail.destinationCity" />
                        <van-cell title="目的地详细地址" :value="itemDetail.destinationAddress" />
                        <van-cell title="备注" :value="itemDetail.remark" />
                        <van-cell class="item-btn">
                            <van-button plain type="primary" class="i-btn-l" @click="editTask">
                                编辑任务
                            </van-button>
                            <van-button plain type="info" class="i-btn-r" @click="changeState" :disabled="ischange">
                                修改状态
                            </van-button>
                            <van-action-sheet
                                v-model="stateChange"
                                :actions="actions"
                                cancel-text="取消"
                                @cancel="stateCancel"
                                @select="stateSelect"
                            />
                        </van-cell>
                    </van-cell-group>
                    <van-form @submit="changeInfo(item)" v-else>
                        <van-field
                            v-model="itemDetail.cargoKind"
                            name="goodsname"
                            label="商品名称"
                            placeholder="商品名称"
                            :rules="[{ required: true, message: '请填写商品名称' }]"
                        />
                        <van-field
                            v-model="itemDetail.cargoWeight"
                            name="goodsweight"
                            label="商品重量(t)"
                            placeholder="商品重量"
                            :rules="[
                                { required: true, message: '请填写商品重量' },
                                { pattern: /^[0-9.]*$/, message: '请填写数字' }
                            ]"
                        />
                        <van-field
                            readonly
                            clickable
                            v-model="itemDetail.taskDeadline"
                            name="taskdeadline"
                            label="截止时间"
                            placeholder="截止时间"
                            :rules="[{ required: true, message: '请选择截止时间' }]"
                            @click="showDatePicker = true"
                        />
                        <van-popup v-model="showDatePicker" round position="bottom">
                            <van-datetime-picker
                                type="datetime"
                                title="选择完整时间"
                                :min-date="minDate"
                                :max-date="maxDate"
                                @confirm="onDateConfirm"
                                @cancel="showDatePicker = false"
                            />
                        </van-popup>
                        <van-field
                            readonly
                            clickable
                            label="城市"
                            placeholder="选择城市"
                            :value="itemDetail.destinationCity"
                            :rules="[{ required: true, message: '请选择城市' }]"
                            @click="showCityPicker = true"
                        />
                        <van-popup v-model="showCityPicker" round position="bottom">
                            <van-area
                                :area-list="areaList"
                                :columns-num="2"
                                @confirm="onCityConfirm"
                                @cancel="showCityPicker = false"
                            />
                        </van-popup>
                        <van-field
                            v-model="itemDetail.destinationAddress"
                            name="goodsaddress"
                            label="详细地址"
                            placeholder="详细地址"
                            :rules="[{ required: true, message: '请填写详细地址' }]"
                        />
                        <van-field
                            v-model="itemDetail.remark"
                            name="remark"
                            label="备注"
                            placeholder="备注"
                        />
                        <van-cell class="item-btn">
                            <van-button plain type="primary" class="i-btn-l" native-type="submit">
                                提交
                            </van-button>
                            <van-button plain type="info" class="i-btn-r" @click="cancel">
                                取消
                            </van-button>
                        </van-cell>
                    </van-form>
                </van-collapse-item>
            </van-collapse>
            <van-button round type="danger" class="bottom-button list-add" @click="addTask">
                添加任务
            </van-button>
        </div>
        <div v-else>
            <van-empty description="尚无发布任务">
                <van-button round type="danger" class="bottom-button" @click="addTask">
                    添加任务
                </van-button>
            </van-empty>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import qs from "qs"
import { getToken } from "@/utils/index.js";
import adress from '@/utils/areaList.js'
export default {
    data() {
        return {
            taskList: [],
            itemDetail: '',
            activeName: '',
            isedit: false,
            show: true,
            showCityPicker: false,
            showDatePicker: false,
            areaList: adress,
            minDate: new Date(),
            maxDate: new Date(2025, 10, 1),
            ischange:true,
            stateChange: false,
            actions: [],
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
        itemInfo(item, index) {
            if(item.taskId !== this.itemDetail.taskId) {
                if(this.isedit == true) {
                    this.isedit = false
                }
                let params = {
                    taskId : item.taskId
                }
                axios.post('/task/detail',qs.stringify(params),{
                    headers: { Token: getToken("Token") }
                }).then(res => {
                    if(res.data.code === 0) {
                        this.itemDetail = res.data.data;
                        this.itemDetail.taskDeadline = this.itemDetail.taskDeadline.split('T')[0]
                                     + ' ' + this.itemDetail.taskDeadline.split('T')[1].slice(0,5)
                        if(this.itemDetail.taskState == 'Wait') {
                            this.actions = [
                                { name: '取消任务' , state: 'Canceled', index},
                                { name: '删除任务', state: 'Del', index}
                            ],
                            this.ischange = false
                        }else if(this.itemDetail.taskState == 'Transiting') {
                            this.actions = [
                               { name: '完结任务', state: 'Finished', index }
                            ],
                            this.ischange = false
                        }else if(this.itemDetail.taskState == 'Finished') {
                            this.actions = [
                                { name: '删除任务', state: 'Del', index }
                            ],
                            this.ischange = false
                        }else {
                            this.ischange = true
                        }
                    }
                })
            }
        },
        editTask() {
            this.isedit = true
        },
        changeState() {
            this.stateChange = true
        },
        stateSelect(item) {
            let params = {
                taskId: this.itemDetail.taskId,
                toBeState: item.state
            }
            axios.post('/task/state',qs.stringify(params),{
                headers: { Token: getToken("Token") }
            }).then(res => {
                if(res.data.code === 0) {
                    this.taskList[item.index].taskState = item.state;
                    this.itemDetail.taskState = item.state;
                    this.stateChange = false
                    if(item.state == 'Del') {
                        this.taskList.splice(item.index, 1);
                        console.log(item)
                    }else 
                    if(this.itemDetail.taskState == 'Finished') {
                        this.actions = [
                            { name: '删除任务', state: 'Del', index: item.index }
                        ]
                    } else {
                        this.ischange = true
                    }
                }
            })
        },
        stateCancel() {
            this.stateChange = false;
        },
        cancel() {
            this.isedit = false
        },
        addTask() {
            this.$router.push('/main/Boss/Task/addTask')
        },
        onCityConfirm(value) {
            this.itemDetail.destinationCity = value[1].name + '-' + value[0].name;
            this.showCityPicker = false;
        },
        onDateConfirm(value) {
            this.itemDetail.taskDeadline = this.formatTime(value);
            this.showDatePicker = false;
        },
        changeInfo(item) {
            if( this.itemDetail.cargoKind !== item.cargoKind) {
                item.cargoKind = this.itemDetail.cargoKind
            }
            let params = {
                taskId: this.itemDetail.taskId,
                cargoKind: this.itemDetail.cargoKind,
                cargoWeight: this.itemDetail.cargoWeight,
                taskDeadline: this.itemDetail.taskDeadline + ":00",
                destinationCity: this.itemDetail.destinationCity,
                destinationAddress: this.itemDetail.destinationAddress,
                remark: this.itemDetail.remark
            }
            axios.post('/task/change',qs.stringify(params),{
                headers: { Token: getToken("Token") }
            }).then(res => {
                if(res.data.code === 0) {
                    // this.$router.push('/main/Boss/Task')
                    this.isedit = false
                }
            })
        },
        formatTime(value) {
            var year = value.getFullYear();
            var month = value.getMonth()+1;
            var date = value.getDate();
            var h = value.getHours();
            var m = value.getMinutes();
            var now = year + '-' + this.getMakeZero(month) + "-" + this.getMakeZero(date) + " " 
                    + this.getMakeZero(h) + ':' + this.getMakeZero(m);
            return now;
        },
        getMakeZero(s) {
            return s < 10 ? '0' + s : s;
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
</style>
<style>
.van-cell__title {
    text-align: left;
}
.van-cell__value--alone  {
    text-align: center;
}
</style>