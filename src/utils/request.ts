// 进行对axios的二次封装
import axios from 'axios'
import { ElMessage } from 'element-plus'
// 第一步：利用axios对象的create方法，去创建axios实例（其他的配置：基础路径、超时的时间等）
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // 基础路径上会携带/api
  timeout: 5000, // 超时时间设置
})

// 第二步：request实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
  //config 配置对象，headers属性请求头，经常给服务器携带公共参数
  return config
})

// 第三步：响应拦截器
request.interceptors.response.use(
  (response) => {
    // 成功的回调
    //简化数据
    return response.data
  },
  (err) => {
    // 失败的回调：处理http网络错误
    // 定义一个变量：存储网络错误信息
    let message = ''
    // http状态码
    const status = err.response.status
    switch (status) {
      case 401:
        message = 'TOKEN过期'
        break
      case 403:
        message = '无权限访问'
        break
      case 404:
        message = '请求的资源不存在'
        break
      case 500:
        message = '服务器内部错误'
        break
      default:
        message = '网络问题'
    }
    // 提示错误信息
    ElMessage({
      message,
      type: 'error',
    })
  },
)

// 对外暴露
export default request
