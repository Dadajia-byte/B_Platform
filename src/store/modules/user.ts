// 创建用户相关的小仓库
import { defineStore } from 'pinia'

// 引入接口
import { reqLogin } from '@/api/user'
// 引入数据类型
import type { loginForm, loginResponseData } from '@/api/user/type'
import type { RouteRecordRaw } from 'vue-router'
// 引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'

// 引入路由（常量路由）
import { constantRoutes } from '@/routers/routes'

const useUserStore = defineStore('User', () => {
  // 小仓库存储数据的地方
  let token: string | null = GET_TOKEN()

  // 异步|逻辑的地方
  const userLogin = async (data: loginForm) => {
    // 登陆请求
    let result: loginResponseData = await reqLogin(data)

    // 登陆请求：成功200 -> token
    if (result.code == 200) {
      //pinia仓库存储一下token
      //由于pinia|vuex存储数据其实利用js对象
      token = result.data.token as string
      //本地存储持久化一份
      SET_TOKEN(token as string)
      // 保证async返回一个成功的promis
      return 'ok'
    } else {
      // 登陆请求：失败201 -> 登陆失败错误的信息
      return Promise.reject(new Error(result.data.message))
    }
  }
  return {
    userLogin,
    token,
    menuRoutes: constantRoutes as RouteRecordRaw[],
  }
})

// 暴露
export default useUserStore
