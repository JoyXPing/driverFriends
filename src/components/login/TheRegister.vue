<template>
    <div>
        <van-form @submit="onSubmit">
            <van-field
                v-model="username"
                name="username"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="mobile"
                name="mobile"
                label="手机号码"
                placeholder="手机号码"
                :rules="[
                    { required: true, message: '请填写手机号码' },
                    { pattern: /^1[3456789]\d{9}$/, message: '请填写11位合法手机号码' }
                ]"
            />
            <van-field
                v-model="password"
                type="password"
                name="password"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <van-field
                readonly
                clickable
                name="role"
                :value="role"
                label="用户身份"
                placeholder="点击选择身份"
                @click="showPicker = true"
                :rules="[{ required: true, message: '请选择身份' }]"
            />
            <van-popup v-model="showPicker" position="bottom">
                <van-picker
                    show-toolbar
                    :columns="columns"
                    @confirm="onConfirm"
                    @cancel="showPicker = false"
                />
            </van-popup>
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                注册
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
                username: '',
                mobile: '',
                password: '',
                role: '',
                roleKey: '',
                columns: [
                    {
                        "key": "Boss",
                        "text": "商家"
                    },
                    {
                        "key": "Driver",
                        "text": "司机"
                    },
                    {
                        "key": "Buyer",
                        "text": "买家"
                    }
                ],
                showPicker: false,
            };
        },
        methods: {
            onConfirm(value) {
                this.role = value.text;
                this.roleKey = value.key,
                this.showPicker = false;
            },
            onSubmit(values) {
                console.log(values)
                let params = {
                        userName: values.username,
                        userMobile: values.mobile,
                        userPassword: values.password,
                        userRole: this.roleKey
                    }
                axios.post('/register', qs.stringify(params))
                    .then(res => {
                        if(res.data.code === 0) {
                            this.$router.push("/user/login");
                            this.$message({
                                showClose: true,
                                message: '注册成功',
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
            }

        }
    }
</script>

<style scoped>
.el-button {
    width: 70%;
    margin-top: 5%;
}
</style>