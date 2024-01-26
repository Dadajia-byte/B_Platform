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

// 使用全局组件
import globalComponent from '@/components'
app.use(globalComponent)

// 引入路由
import routers from './routers'
app.use(routers)

// 引入pinia
import pinia from './store'


app.use(pinia).mount('#app')
