<template>
    <div>
        <van-overlay :show="show">
            <div class="wrapper" @click.stop>
                <div class="block">
                    <van-form @submit="onSubmit">
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
                            :rules="[
                                { required: true, message: '请填写商品重量' },
                                { pattern: /^[0-9.]*$/, message: '请填写数字' }
                            ]"
                        />
                        <van-field
                            readonly
                            clickable
                            v-model="taskdeadline"
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
                            :value="goodscity"
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
                            v-model="goodsaddress"
                            name="goodsaddress"
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
                            <van-button plain type="info" class="i-btn-r" @click="cancel">
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
import { getToken } from "@/utils/index.js";
import adress from '@/utils/areaList.js'
    export default {
        data() {
            return {
                show: true,
                showCityPicker: false,
                showDatePicker: false,
                areaList: adress,
                goodscity: '',
                goodsname: '',
                goodsweight: '',
                goodsaddress: '',
                remark: '',
                taskdeadline: '',
                minDate: new Date(),
                maxDate: new Date(2025, 10, 1)
            }
        },
        methods: {
            onCityConfirm(value) {
                this.goodscity = value[1].name + '-' + value[0].name;
                this.showCityPicker = false;
            },
            onDateConfirm(value) {
                this.taskdeadline = this.formatTime(value);
                this.showDatePicker = false;
            },
            onSubmit() {
                let params = {
                    cargoKind: this.goodsname,
                    cargoWeight: this.goodsweight,
                    taskDeadline: this.taskdeadline + ":00",
                    destinationCity: this.goodscity,
                    destinationAddress: this.goodsaddress,
                    remark: this.remark
                }
                axios.post('/task/add',qs.stringify(params),{
                    headers: { Token: getToken("Token") }
                }).then(res => {
                    if(res.data.code === 0) {
                        this.$router.push('/main/Boss/Task')
                    }
                })
            },
            cancel() {
                this.show = false
                this.$router.push('/main/Boss/Task')
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
        },
    }
</script>

<style scoped>
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
.i-btn-l {
    width: 6rem;
    border-radius: 2rem 0 0 2rem;
}
.i-btn-r {
    width: 6rem;
    border-radius: 0 2rem 2rem 0;
}
</style>