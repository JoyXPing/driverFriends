<template>
    <div>
        <div class="admin-login">
            <el-menu mode="horizontal">
                <el-menu-item>登录</el-menu-item>
            </el-menu>
            <div class="login-info">
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
                    <el-button class="loginIn" type="primary" @click="onSubmit('form')">管理员登陆</el-button>
                    <el-button class="loginIn" @click="cancel">取消</el-button>
                </el-form>
            </div>
        </div>
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
                    axios.post('/admin/login', qs.stringify(params))
                        .then(res => {
                            if(res.data.code === 0) {
                                this.$router.push("/admin/main");
                                this.$message({
                                    showClose: true,
                                    message: '登录成功',
                                    type: 'success'
                                });
                                localStorage.setItem("userToken", res.data.data.token)
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
            cancel() {
                this.$router.push('/user/login')
            }
        }
    }
</script>

<style scoped>
.admin-login {
    width: 30%;
    margin: 7% auto;
    background-color: #fff;
    padding: 10px;
    color: #000;
    border-radius: 10px;
    box-shadow: 6px 6px 5px rgb(168, 193, 240);
}
.el-menu-item {
    width: 100%;
}
.login-info {
    margin: 20px;
    margin-top: 10%;
}
.loginIn {
    width: 40%;
    margin-top: 5%;
}
</style>