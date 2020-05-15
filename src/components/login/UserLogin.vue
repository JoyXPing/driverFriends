<template>
    <div class="the-login">
        <div class="title">友货平台系统</div>
        <van-form @submit="onSubmit">
            <van-field
                v-model="mobile"
                name="mobile"
                label="手机号码"
                placeholder="手机号码"
                :rules="[{ required: true, message: '请填写手机号码' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="password"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                登录
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import axios from "axios";
import qs from "qs"
import { setToken, getToken, setLocalStorage } from "@/utils/index.js";
    export default {
        data() {
            return {
                mobile: '',
                password: ''
            }
        },
        methods: {
            onSubmit(values) {
                let params = {
                        mobile: values.mobile,
                        password: values.password
                    }
                axios.post('/user/login', qs.stringify(params))
                    .then(res => {
                        if(res.data.code === 0) {
                            setToken("Token", res.data.data.token);
                            setLocalStorage("mobileAndPassword", JSON.stringify(params));
                            // this.$router.push("/main/"+ res.data.data.role + "/Home");
                            if(res.data.data.role === 'Boss') {
                                this.ishavecompany()
                            }else {
                                this.$router.push("/main/"+ res.data.data.role + "/Home");
                            }
                            this.$message({
                                showClose: true,
                                message: '登录成功',
                                type: 'success'
                            });
                        }else {
                            this.$message({
                                showClose: true,
                                message: res.data.msg,
                                type: 'error'
                            });
                        }
                    })
            },
            ishavecompany() {
                axios.post('/company/ishave',qs.stringify(),{
                    headers: { Token: getToken("Token") }
                }).then(res => {
                    console.log(res.data.data)
                    if(res.data.data === false) {
                        this.$router.push("/main/Boss/addCompany");
                    }else {
                        this.$router.push("/main/Boss/Home");
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>