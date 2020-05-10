<template>
    <div>
        <el-form 
            :model="ruleForm" 
            status-icon 
            :rules="rules" 
            ref="ruleForm" 
            label-width="90px"
            label-position="left"
        >
            <el-form-item label="用户名:" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号码:" prop="mobile">
                <el-input v-model="ruleForm.mobile"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码:" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户身份:" prop="role">
                 <el-radio-group v-model="ruleForm.role">
                    <el-radio label="Boss">商家</el-radio>
                    <el-radio label="Driver">司机</el-radio>
                    <el-radio label="Buyer">买家</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        </el-form>
    </div>
</template>

<script>
import axios from "axios";
import qs from "qs"
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    name: '',
                    mobile: '',
                    pass: '',
                    checkPass: '',
                    role: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    mobile: [
                        { required: true, message: '请输入手机号码', trigger: 'blur' },
                        // { pattern: /^1[3456789]\d{9}$/ ,message: "请输入合法号码"}
                    ],
                    pass: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { required: true, message: '请再次输入密码', trigger: 'blur' },
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    role: [
                        { required: true, message: '请输入用户身份', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = {
                        userName: this.ruleForm.name,
                        userMobile: this.ruleForm.mobile,
                        userPassword: this.ruleForm.pass,
                        userRole: this.ruleForm.role
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
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
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