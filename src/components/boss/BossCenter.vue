<template>
<div>
    <div class="user-info">
        <van-card
            :tag="userole()"
            :desc="userInfo.userMobile"
            :title="userInfo.userName"
            thumb="https://i.loli.net/2020/05/17/fsIFBLrEUHAgbv3.png"
        />
        <van-cell title="修改密码" @click="changePassword"/>
    </div>
    <van-overlay :show="ischange">
        <div class="wrapper" @click.stop>
            <div class="block" >
                <van-form @submit="onChange">
                <van-field
                    v-model="oldPassword"
                    name="oldPassword"
                    label="旧密码"
                    placeholder="旧密码"
                    :rules="[{ required: true, message: '请填写旧密码' }]"
                />
                <van-field
                    v-model="newPassword1"
                    type="password"
                    name="newPassword1"
                    label="新密码"
                    placeholder="新密码"
                    :rules="[{ required: true, message: '请填写新密码' }]"
                />
                <van-field
                    v-model="newPassword2"
                    type="password"
                    name="newPassword2"
                    label="确认密码"
                    placeholder="确认密码"
                    :rules="[{ required: true, message: '请重新输入密码' }]"
                />
                <div class="change-btn">
                    <van-button plain type="primary" class="i-btn-l" @click="editTask">
                        提交
                    </van-button>
                    <van-button plain type="info" class="i-btn-r" @click="changeState" :disabled="ischange">
                        取消
                    </van-button>
                </div>
                </van-form>
            </div>
        </div>
    </van-overlay>
</div>
</template>

<script>
import axios from "axios";
import qs from "qs"
import { getToken  } from "@/utils/index.js";
import { Notify } from 'vant';
    export default {
        data() {
            return {
                userInfo: '',
                ischange: false,
                oldPassword: '',
                newPassword1: '',
                newPassword2: ''
            }
        },
        mounted() {
            axios.post('/user/detail',qs.stringify(),{
                headers: { Token: getToken("Token") }
            }).then(res => {
                if(res.data.code === 0) {
                    this.userInfo = res.data.data;
                }
            })
        },
        methods: {
            userole() {
                if (this.userInfo.userRole == "Driver") {
                    return "司机";
                } else if (this.userInfo.userRole == "Buyer") {
                    return "买家";
                }else if (this.userInfo.userRole == "Boss") {
                    return "商家";
                }
            },
            changePassword() {
                this.ischange = true
            },
            onChange() {
                let params ={
                    oldPassword: this.oldPassword,
                    newPassword1: this.newPassword1,
                    newPassword2: this.newPassword2
                }
                axios.post('/user/changepsw',qs.stringify(params),{
                    headers: { Token: getToken("Token") }
                }).then(res => {
                    if(res.data.code === 0) {
                        Notify({ type: 'success', message: '更改成功' });
                        this.ischange = false
                    }else {
                        Notify({ type: 'danger', message: res.data.msg });
                    }
                })
            }
        }
    }
</script>

<style scoped>
.user-info {
    margin: 5rem 1rem;
    border-radius: 1rem;
    background-color: #ffffff;
    padding: 0.3rem;
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
.change-btn {
    /* display: flex; */
    margin: 1rem;
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
<style>
.van-card__content {
    text-align: left;
}
.van-card__title {
    font-size: 24px;
    line-height: 30px;
    margin: 0.5rem 0;
}
.van-card__desc {
    font-size: 20px;
    line-height: 24px;
}
</style>