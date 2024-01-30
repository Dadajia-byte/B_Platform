// 路由鉴权
import router from '@/routers'
import NProgress from 'nprogress'

import setting from './setting'
// 引入nprogress样式
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })
// 获取用户相关小仓库token判断用户是否登录成功
// 因为在外面所以要重新引入大仓库pinia
import pinia from './store'
import useUserStore from './store/modules/user'
let userStore = useUserStore(pinia)

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
    NProgress.start();
    document.title = `${setting.title}-${to.meta.title}`
    // 获取token
    let token = userStore.token;
    // 获取用户名
    let username = userStore.username;
    if (token) {
        // 登录成功但是想访问login
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            // 登录成功但是访问其他路由
            // 有用户信息
            if (username) {
                // 放行
                next()
            } else {
                // 没有用户信息，在守卫这里发请求得到用户信息
                try {
                    await userStore.userInfo();
                    next()
                } catch (error) {
                    // token过期：获取不到用户信息
                    // 用户手动修改信息
                    await userStore.userLogout();
                    next({ path: '/login', query: { redirect: to.path } })
                }

            }

        }
    } else {
        // 用户未登录判断
        if (to.path === '/login') {
            next()
        } else {
            next({ path: '/login', query: { redirect: to.path } })
        }
    }
})

// 全局后置守卫
router.afterEach((to, from) => {
    NProgress.done()
})

// 第一个问题：任意路由切换实现进度条业务 ——— nprogress
// 第二个问题：路由鉴权（路由组件访问权限的设置）
// 全部路由组件：登录|404|任意路由|首页|数据大屏|权限管理（三个子路由）|商品管理（四个子路由）

/**
 * 1.用户未登录：只能访问login
 * 2.用户登陆成功：不可以访问login，其余组件都可以访问
 * 
 */