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
                        <van-cell title="商品重量" :value="itemDetail.cargoWeight" />
                        <van-cell title="商品所在城市" :value="itemDetail.destinationCity" />
                        <van-cell title="详细地址" :value="itemDetail.destinationAddress" />
                        <van-cell title="截止时间" :value="itemDetail.taskDeadline" />
                        <van-cell title="备注" :value="itemDetail.remark" />
                        <!-- <van-cell class="item-btn">
                            <van-button plain type="primary" class="i-btn-l" @click="editTask">
                                编辑商品
                            </van-button>
                            <van-button plain type="info" class="i-btn-r" @click="changeState">
                                修改状态
                            </van-button>
                            <van-action-sheet
                                v-model="stateChange"
                                :actions="actions"
                                cancel-text="取消"
                                @cancel="stateCancel"
                                @select="stateSelect(index)"
                            />
                        </van-cell> -->
                    </van-cell-group>
                    <van-form @submit="changeInfo(item)" v-else>
                        <van-field
                            v-model="itemDetail.goodsName"
                            name="goodsName"
                            label="商品名称"
                            placeholder="商品名称"
                            :rules="[{ required: true, message: '请填写商品名称' }]"
                        />
                        <van-field
                            v-model="itemDetail.goodsWeight"
                            name="goodsWeight"
                            label="商品重量(t)"
                            placeholder="商品重量"
                            type="number"
                            :rules="[{ required: true, message: '请填写商品重量' }]"
                        />
                        <van-field
                            v-model="itemDetail.goodsPrice"
                            name="goodsPrice"
                            label="价格(元/t)"
                            placeholder="商品价格"
                            type="number"
                            :rules="[{ required: true, message: '请填写商品价格' }]"
                        />
                        <van-field
                            v-model="itemDetail.goodsDesc"
                            rows="2"
                            autosize
                            label="商品描述"
                            type="textarea"
                            maxlength="100"
                            placeholder="商品描述"
                            show-word-limit
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
                添加商品
            </van-button>
        </div>
        <div v-else>
            <van-empty description="尚无发布商品">
                <van-button round type="danger" class="bottom-button" @click="addTask">
                    添加商品
                </van-button>
            </van-empty>
        </div>
        <van-overlay :show="isadd">
            <div class="wrapper" @click.stop>
                <div class="block">
                    <van-form @submit="addGoods">
                        <van-field
                            v-model="goodsname"
                            name="goodsname"
                            label="商品名称"
                            placeholder="商品名称"
                            :rules="[{ required: true, message: '请填写商品名称' }]"
                        />
                        <van-field
                            v-model="goodsweight"
                            name="goodsweight"
                            label="商品重量(t)"
                            placeholder="商品重量"
                            type="number"
                            :rules="[{ required: true, message: '请填写商品重量' }]"
                        />
                        <van-field
                            v-model="goodsprice"
                            name="goodsprice"
                            label="价格(元/t)"
                            placeholder="商品价格"
                            type="number"
                            :rules="[{ required: true, message: '请填写商品价格' }]"
                        />
                        <van-field
                            v-model="goodsdesc"
                            rows="2"
                            autosize
                            label="商品描述"
                            type="textarea"
                            maxlength="100"
                            placeholder="商品描述"
                            show-word-limit
                        />
                        <van-cell class="item-btn">
                            <van-button plain type="primary" class="i-btn-l" native-type="submit">
                                提交
                            </van-button>
                            <van-button plain type="info" class="i-btn-r" @click="addCancel">
                                取消
                            </van-button>
                        </van-cell>
                    </van-form>
                </div>
            </div>
        </van-overlay>
        <van-overlay :show="tobetask">
            <div class="wrapper" @click.stop>
                <div class="block">
                    <van-form @submit="toBeTask">
                        <van-field
                            readonly
                            clickable
                            v-model="taskDeadline"
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
                            :value="destinationCity"
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
                            v-model="destinationAddress"
                            name="destinationAddress"
                            label="详细地址"
                            placeholder="详细地址"
                            :rules="[{ required: true, message: '请填写详细地址' }]"
                        />
                        <van-field
                            v-model="remark"
                            name="remark"
                            label="备注"
                            placeholder="备注"
                        />
                        <van-cell class="item-btn">
                            <van-button plain type="primary" class="i-btn-l" native-type="submit">
                                提交
                            </van-button>
                            <van-button plain type="info" class="i-btn-r" @click="toBeTaskCancel">
                                取消
                            </van-button>
                        </van-cell>
                    </van-form>
                </div>
            </div>
        </van-overlay>
    </div>
</template>

<script>
import axios from "axios";
import qs from "qs"
import { getToken } from "@/utils/index.js"
import {   Dialog, Notify } from 'vant';
import adress from '@/utils/areaList.js'
export default {
    data() {
        return {
            taskList: [],
            itemDetail: '',
            activeName: '',
            isadd: false,
            isedit: false,
            tobetask: false,
            stateChange: false,
            actions: [],
            goodsname: '',
            goodsweight: '',
            goodsprice: '',
            goodsdesc: '',
            showCityPicker: false,
            showDatePicker: false,
            areaList: adress,
            minDate: new Date(),
            maxDate: new Date(2025, 10, 1),
            taskDeadline: '',
            destinationCity: '',
            destinationAddress: '',
            remark: ''
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
                        // this.actions = [
                        //     { name: '删除商品', state: 'Del', index},
                        //     { name: '转为任务', state: 'ToTask', index}
                        // ]
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
            if(item.state == 'Del') {
                Dialog.confirm({
                    title: '提示',
                    message: '确认删除该商品吗？',
                    })
                    .then(() => {
                        let params = {
                            goodsId: this.itemDetail.goodsId
                        }
                        axios.post('/boss/goods/delete',qs.stringify(params),{
                            headers: { Token: getToken("Token") }
                        }).then(res => {
                            if(res.data.code === 0) {
                                this.goodsList.splice(item.index, 1);
                                this.stateChange = false
                                Notify({ type: 'success', message: '删除商品成功' });
                            }else {
                                Notify({ type: 'danger', message: res.data.msg });
                            }
                        })
                    })
                    .catch(() => {
                        this.stateChange = false
                });
            }else {
                this.stateChange = false
                this.tobetask = true
            } 
        },
        stateCancel() {
            this.stateChange = false;
        },
        cancel() {
            this.isedit = false
        },
        addTask() {
            this.isadd = true
        },
        changeInfo(item) {
            if( this.itemDetail.goodsName !== item.goodsName) {
                item.goodsName = this.itemDetail.goodsName
            }
            let params = {
                goodsId: this.itemDetail.goodsId,
                goodsName: this.itemDetail.goodsName,
                goodsWeight: this.itemDetail.goodsWeight,
                goodsPrice: this.itemDetail.goodsPrice,
                goodsDesc: this.itemDetail.goodsDesc
            }
            axios.post('/boss/goods/change',qs.stringify(params),{
                headers: { Token: getToken("Token") }
            }).then(res => {
                if(res.data.code === 0) {
                    // this.$router.push('/main/Boss/Task')
                    this.isedit = false
                    Notify({ type: 'success', message: '修改商品信息成功' });
                }else {
                    Notify({ type: 'danger', message: res.data.msg });
                }
            })
        },
        addGoods() {
            let params = {
                goodsName: this.goodsname,
                goodsWeight: this.goodsweight,
                goodsPrice: this.goodsprice,
                goodsDesc: this.goodsdesc
            }
            axios.post('/boss/goods/add',qs.stringify(params),{
                headers: { Token: getToken("Token") }
            }).then(res => {
                if(res.data.code === 0) {
                    this.isadd = false
                    Notify({ type: 'success', message: '添加商品成功' });
                }else {
                    Notify({ type: 'danger', message: res.data.msg });
                }
            })
        },
        addCancel() {
            this.isadd = false
        },
        onCityConfirm(value) {
            this.destinationCity = value[1].name + '-' + value[0].name;
            this.showCityPicker = false;
        },
        onDateConfirm(value) {
            this.taskDeadline = this.formatTime(value);
            this.showDatePicker = false;
        },
        toBeTaskCancel() {
            console.log(123)
            this.tobetask = false
        },
        toBeTask() {
            let params = {
                goodsId: this.itemDetail.goodsId,
                taskDeadline: this.taskDeadline + ":00",
                destinationCity: this.destinationCity,
                destinationAddress: this.destinationAddress,
                remark: this.remark
            }
            axios.post('/boss/goods/task',qs.stringify(params),{
                headers: { Token: getToken("Token") }
            }).then(res => {
                if(res.data.code === 0) {
                    this.tobetask = false
                    Notify({ type: 'success', message: '已为您转为任务' });
                }else {
                    Notify({ type: 'danger', message: res.data.msg });
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