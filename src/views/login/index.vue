<template>
    <div class="login">
        <el-menu 
            :default-active="activeIndex" 
            class="el-menu-demo" 
            mode="horizontal" 
            @select="handleSelect"
        >
            <el-menu-item index="1">登录</el-menu-item>
            <el-menu-item index="2">注册</el-menu-item>
        </el-menu>
        <div class="login-info">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeIndex: '1'
            };
        },
        created() {
            if(this.$route.path === '/register') {
                this.activeIndex = '2'
            }
        },
        watch:{
            $route(to,from){
                if(to.path === from.path){
                    return
                }else
                if(from.path === '/register') {
                    this.activeIndex = '1'
                }
            }

        },
        methods: {
            handleSelect(key) {
                if(this.activeIndex === key){
                    return
                }else {
                    this.activeIndex = key;
                    if(this.activeIndex === '1'){
                        this.loginIn()
                    }else {
                        this.regist()
                    }
                }
            },
            loginIn() {
                this.$router.push('/user/login')
            },
            regist() {
                this.$router.push('/register')
            }
        }
    }
</script>

<style scoped>
.login {
    width: 30%;
    /* height: 500px; */
    margin: 7% auto;
    background-color: #fff;
    padding: 10px;
}
span {
    height: 100%;
}
.el-menu-item {
    width: 50%;
}
.login-info {
    margin: 20px;
    margin-top: 10%;
}
</style>