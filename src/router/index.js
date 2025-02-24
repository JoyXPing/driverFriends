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
          },
          {
            path: "/admin/main/goodslist",
            component: () => import("@/components/admin/GoodsList.vue")
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
        path: "/main/Boss",
        component: () => import("@/components/main/TheBoss.vue"),
        children: [
          {
            path: "/main/Boss/addCompany",
            component: () => import("@/components/boss/AddCompany.vue")
          },
          {
            path: "/main/Boss/Home",
            component: () => import("@/components/boss/BossHome.vue")
          },
          {
            path: "/main/Boss/Task",
            component: () => import("@/components/boss/BossTask.vue"),
            children: [
              {
                path: "/main/Boss/Task/addTask",
                component: () => import("@/components/boss/task/addTask.vue"),
              }
            ]
          },
          {
            path: "/main/Boss/Goods",
            component: () => import("@/components/boss/BossGoods.vue")
          },
          {
            path: "/main/Boss/Center",
            component: () => import("@/components/boss/BossCenter.vue")
          }
        ]
      },
      {
        path: "/main/Buyer",
        component: () => import("@/components/main/TheBuyer.vue"),
        children: [
          {
            path: "/main/Buyer/home",
            component: () => import("@/components/buyer/BuyerHome.vue")
          },
          {
            path: "/main/Buyer/demand",
            component: () => import("@/components/buyer/BuyerDemand.vue")
          },
          {
            path: "/main/Buyer/center",
            component: () => import("@/components/buyer/BuyerCenter.vue")
          }
        ]
      },
      {
        path: "/main/Driver",
        component: () => import("@/components/main/TheDriver.vue"),
        children: [
          {
            path: "/main/Driver/home",
            component: () => import("@/components/driver/DriverHome.vue")
          },
          {
            path: "/main/Driver/demand",
            component: () => import("@/components/driver/DriverDemand.vue")
          },
          {
            path: "/main/Driver/task",
            component: () => import("@/components/driver/DriverTask.vue")
          },
          {
            path: "/main/Driver/center",
            component: () => import("@/components/driver/DriverCenter.vue")
          }
        ]
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
