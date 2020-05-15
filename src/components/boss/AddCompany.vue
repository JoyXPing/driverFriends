<template>
    <div>
        <van-overlay :show="show">
            <div class="wrapper" @click.stop>
                <div class="block">
                    <van-form @submit="onSubmit">
                        <van-field
                            v-model="companyname"
                            name="companyname"
                            label="公司名"
                            placeholder="公司名称"
                            :rules="[{ required: true, message: '请填写公司名称' }]"
                        />
                        <van-field
                            v-model="companymobile"
                            name="companymobile"
                            label="公司电话"
                            placeholder="公司电话"
                            :rules="[{ required: true, message: '请填写公司电话' }]"
                        />
                        <van-field
                            readonly
                            clickable
                            label="城市"
                            placeholder="选择城市"
                            :value="value"
                            :rules="[{ required: true, message: '请选择城市' }]"
                            @click="showPicker = true"
                        />
                        <van-popup v-model="showPicker" round position="bottom">
                            <van-area
                                :area-list="areaList"
                                :columns-num="2"
                                @confirm="onConfirm"
                                @cancel="show = false"
                            />
                        </van-popup>
                        <van-field
                            v-model="companyaddress"
                            name="companyaddress"
                            label="详细地址"
                            placeholder="详细地址"
                            :rules="[{ required: true, message: '请填写详细地址' }]"
                        />
                        <div style="margin: 16px;">
                            <van-button round block type="info" native-type="submit">
                            提交
                            </van-button>
                        </div>
                    </van-form>
                </div>
            </div>
        </van-overlay>
    </div>
</template>

<script>
import adress from '@/utils/areaList.js'
    export default {
        data() {
            return {
                show: true,
                value: '',
                showPicker: false,
                areaList: adress,
                companyname: '',
                companymobile: '',
                companyaddress: ''
            }
        },
        methods: {
            onConfirm(value) {
                this.value = value[0].name + '-' +value[1].name;
                this.showPicker = false;
            },
            onSubmit() {

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
</style>