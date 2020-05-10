import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import("@/views/login/index.vue"),
    children: [
      {
        path: "/user/login",
        component: () => import("@/components/login/TheLogin.vue")
      },
      {
        path: "/register",
        component: () => import("@/components/login/TheRegister.vue")
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
