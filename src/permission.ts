// 路由鉴权
import router from '@/routers'
import NProgress from 'nprogress'
// 引入nprogress样式
import 'nprogress/nprogress.css'
// 全局前置守卫
router.beforeEach((to, from, next) => {
    NProgress.start()
})

// 全局后置守卫
router.afterEach((to, from) => {
    NProgress.done()
})

// 第一个问题：任意路由切换实现进度业务 ——— nprogress