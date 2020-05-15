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
    path: '/admin',
    name: 'Admin',
    component: () => import("@/views/admin/index.vue"),
    children: [
      {
        path: "/admin/login",
        component: () => import("@/components/login/AdminLogin.vue")
      },
      {
        path: "/admin/main",
        component: () => import("@/components/main/TheAdmin.vue"),
        children: [
          {
            path: "/admin/main/userlist",
            component: () => import("@/components/admin/UserList.vue")
          },
          {
            path: "/admin/main/companylist",
            component: () => import("@/components/admin/companyList.vue")
          },
          {
            path: "/admin/main/trucklist",
            component: () => import("@/components/admin/TruckList.vue")
          },
          {
            path: "/admin/main/tasklist",
            component: () => import("@/components/admin/TaskList.vue")
          }
        ]
      }
    ]
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import("@/views/main/index.vue"),
    children: [
      {
        path: "/main/boss",
        component: () => import("@/components/main/TheBoss.vue")
      },
      {
        path: "/main/buyer",
        component: () => import("@/components/main/TheBuyer.vue")
      },
      {
        path: "/main/driver",
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
