import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    redirect: '/user/login',
    component: () => import("@/views/login/index.vue"),
    children: [
      {
        path: "/user/login",
        component: () => import("@/components/login/UserLogin.vue")
      },
      {
        path: "/register",
        component: () => import("@/components/login/TheRegister.vue")
      }
    ]
  },
  {
    path: '/admin/login',
    name: 'Admin',
    component: () => import("@/components/login/AdminLogin.vue"),
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import("@/views/main/index.vue"),
    children: [
      {
        path: "/boss",
        component: () => import("@/components/main/TheBoss.vue")
      },
      {
        path: "/buyer",
        component: () => import("@/components/main/TheBuyer.vue")
      },
      {
        path: "/driver",
        component: () => import("@/components/main/TheDriver.vue")
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
