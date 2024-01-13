import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import App from '@/App.vue'

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn, // element-plus 中文版
})

// svg插件需要配置代码
import 'virtual:svg-icons-register'

import globalComponent from '@/components'
app.use(globalComponent)

// 测试代码测试假的结构能否使用
import axios from 'axios'
// 登录接口
/* axios({
  url: '/api/user/login',
  method: 'post',
  data: {
    username: 'admin',
    password: '111111',
  },
}) */
app.mount('#app')
