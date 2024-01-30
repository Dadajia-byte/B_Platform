/* // 登录接口需要携带的ts的类型
export interface loginForm {
  username: string
  password: string
}

// 登录接口返回的ts的类型
interface dataType {
  token?: string
  message?: string
}

export interface loginResponseData {
  code: number
  data: dataType
}

// 定义服务器返回用户信息相关的数据类型
interface userInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}

interface user {
  checkUser: userInfo
}

export interface userResponseData {
  code: number
  data: user
} */
// 定义用户相关数据的ts数据
// 用户登录接口携带参数ts类型
export interface loginFormData {
  username: string
  password: string
}

// 定义全部接口返回都有的数据类型
export interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}

// 定义登录接口返回的数据类型
export interface loginResponseData extends ResponseData {
  data: string
}

// 定义获取用户信息返回数据类型
export interface userInfoResponseData extends ResponseData {
  data: {
    avatar: string,
    name: string,
    roles: string[],
    buttons: string[],
    routes: string[],
  }
}
