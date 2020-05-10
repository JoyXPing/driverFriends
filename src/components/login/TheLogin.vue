<template>
    <div class="the-login">
        <el-form 
            status-icon 
            :rules="rules"  
            ref="form" 
            :model="form" 
            label-width="90px" 
            label-position="left"
        >
            <el-form-item label="手机号码:" prop="mobile">
                <el-input v-model="form.mobile"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
                <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>
            <el-button type="primary" @click="onSubmit('form')">登陆</el-button>
        </el-form>
    </div>
</template>

<script>
import axios from "axios";
import qs from "qs"
    export default {
        data() {
            return {
                form: {
                    mobile: '',
                    password: ''
                },
                rules: {
                    mobile: [
                        { required: true, message: '请输入手机号码', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
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
                                // this.$router.push("");
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
        }
    }
</script>

<style scoped>
.el-button {
    width: 70%;
    margin-top: 5%;
}
</style>