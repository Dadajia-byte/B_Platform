// 创建用户相关的小仓库
import { defineStore } from 'pinia'
import { ref } from 'vue'
// 引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
// 引入数据类型
import type { loginFormData, loginResponseData, userInfoResponseData } from '@/api/user/type'
import type { RouteRecordRaw } from 'vue-router'
// 引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'

// 引入路由（常量路由）
import { constantRoutes } from '@/routers/routes'
const useUserStore = defineStore('User', () => {
  // 小仓库存储数据的地方
  let token = ref(GET_TOKEN())
  let username = ref('')
  let avatar = ref('')
  // 异步|逻辑的地方
  const userLogin = async (data: loginFormData) => {
    // 登陆请求
    let result: loginResponseData = await reqLogin(data)

    // 登陆请求：成功200 -> token
    if (result.code == 200) {
      //pinia仓库存储一下token
      //由于pinia|vuex存储数据其实利用js对象
      token.value = result.data as string
      //本地存储持久化一份
      SET_TOKEN(token.value as string)
      // 保证async返回一个成功的promis
      return 'ok'
    } else {
      // 登陆请求：失败201 -> 登陆失败错误的信息
      return Promise.reject(new Error(result.data as any))
    }
  }
  // 获取用户信息
  const userInfo = async () => {
    // 用于获取用户信息进行存储仓库中的数据
    let result: userInfoResponseData = await reqUserInfo()
    // 判断是否携带token
    if (result.code == 200) {
      username.value = result.data.name
      avatar.value = result.data.avatar
      return 'OK'
    } else {
      return Promise.reject(new Error(result.message))
    }

  }

  // 退出登录
  const userLogout = async () => {
    // 退出登录请求
    let result: any = await reqLogout();
    if (result.code == 200) {
      token.value = ''
      username.value = ''
      avatar.value = ''
      REMOVE_TOKEN()
      return 'OK';
    } else {
      return Promise.reject(new Error(result.message))
    }
  }

  return {
    avatar,
    username,
    token,
    menuRoutes: constantRoutes as RouteRecordRaw[],
    userLogout,
    userLogin,
    userInfo,
  }
})

// 暴露
export default useUserStore
