// 该文件专门用于创建整个应用的路由器
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
Vue.use(VueRouter)
//引入组件
let originPush = VueRouter.prototype.push
Vue.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this.location, resolve, reject)
    } else {
        originPush.call(this.location, () => { }, () => { })
    }
}
let originReplace = VueRouter.prototype.replace
Vue.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this.location, resolve, reject)
    } else {
        originReplace.call(this.location, () => { }, () => { })
    }
}
//创建并暴露一个路由器
const router = new VueRouter({
    // mode: "history",
    routes: [
        {
            path: '/center',
            component: () => import('@/pages/Center'),
            redirect: '/myorder',
            children: [
                {
                    path: '/myorder',
                    component: () => import('@/pages/Center/myOrder')
                },
                {
                    path: "/grouporder",
                    component: () => import('@/pages/Center/groupOrder')

                },

            ]
        },
        {
            path: '/paysucess',
            component: () => import('@/pages/PaySuccess')
        },
        {
            path: '/pay',
            component: () => import('@/pages/Pay')
        },
        {
            path: '/trade',
            component: () => import('@/pages/Trade')

        },
        {
            path: '/shopcart',
            component: () => import('@/pages/ShopCart')


        },
        {
            path: '/addcart/:skuid/:skunum',
            component: () => import('@/pages/AddCartSuccess')


        },
        {
            path: '/detail/:skuid',
            component: () => import('@/pages/Detail')


        },
        {
            path: '/home',
            component: () => import('@/pages/Home')


        },
        {
            path: '/login',
            component: () => import('@/pages/Login')


        },
        {
            path: "/register",
            component: () => import('@/pages/Register')


        },
        {
            name: 'search',
            path: '/search/:keyword?',
            component: () => import('@/pages/Search'),
            props: ($route) => ({ keyword: $route.params.keyword })
        },
        // 重新定向
        {
            path: '/',
            redirect: '/home'
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})
export default router
router.beforeEach(async (to, from, next) => {
    //设置路由全局守卫，to是去哪，from从哪作为起点，next是放行函数
    let token = localStorage.getItem('TOKEN')
    let name = store.state.User.name

    if (token) {
        if (to.path == '/login' || to.path == '/register') {
            next('/home')
        } else {
            //不排除token会有过期的可能，所以验证服务器返回的name
            if (name) {
                next()
            } else {
                try {
                    await store.dispatch('getUser')
                    next()
                }
                catch (error) {
                    store.dispatch('loginOut')
                    next('/login')
                }
            }
        }
    }
    else {
        let path = to.path
        if (path.indexOf('/myorder') != -1 || path.indexOf('/shopcart') != -1 || path.indexOf('/pay') != -1) {
            next('/login?redirect=' + to.path)
        } else {
            next()
        }

    }
})