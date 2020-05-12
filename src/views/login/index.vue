<template>
    <div>
        <div class="title">友货平台系统</div>
        <div class="login">
            <van-tabs @click="checkActive">
                <van-tab title="登录" name="1"></van-tab>
                <van-tab title="注册" name="2"></van-tab>
            </van-tabs>
            <div class="login-info">
                <router-view></router-view>
            </div>
        </div>
        
    </div>
</template>

<script>
    export default {
        data() {
            return {
                active: '1'
            };
        },
        // created() {
        //     if(this.$route.path === '/register') {
        //         this.active = '2'
        //     }
        // },
        watch:{
            $route(to,from){
                if(to.path === from.path){
                    return
                }else
                if(from.path === '/register') {
                    this.active = '1'
                }
            }

        },
        methods: {
            checkActive(name){
                if(this.active === name){
                    return
                }else {
                    this.active = name;
                    if(this.active === '1'){
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
.title {
  /* padding-top: 50px; */
  height: 3em;
  line-height: 3em;
  font-size: 1.5rem;
  font-weight: 800;
}
.login {
    width: 80%;
    margin: 5em auto;
    padding: 0.5em;
    background-color: #fff;
    border-radius: 0.5em;
    box-shadow: 0.3em 0.3em 0.5em #eee;
}
.login-info{
    padding: 1.5em 0;
    
}
</style>