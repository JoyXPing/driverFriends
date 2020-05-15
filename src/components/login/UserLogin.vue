<template>
    <div class="the-login">
        <div class="title">友货平台系统</div>
        <van-form @submit="onSubmit">
            <van-field
                v-model="mobile"
                name="手机号码"
                label="手机号码"
                placeholder="手机号码"
                :rules="[{ required: true, message: '请填写手机号码' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="密码"
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
    export default {
        data() {
            return {
                mobile: '',
                password: ''
            }
        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = {
                        mobile: this.form.mobile,
                        password: this.form.password
                    }
                    axios.post('/user/login', qs.stringify(params))
                        .then(res => {
                            if(res.data.code === 0) {
                                this.$router.push("/main/"+ res.data.data.role);
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
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            adminLogin() {
                this.$router.push('/admin/login')
            }
        }
    }
</script>

<style scoped>

</style>