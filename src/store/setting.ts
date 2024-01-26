// 小仓库：layout相关配置仓库

import { defineStore } from 'pinia'
import { ref } from 'vue'

let useLayOutSettingStore = defineStore('SettingStore', () => {
  let iconName = ref('Expand') // 是否缩放左侧边框
  let refresh = ref(false) // 刷新
  let changeIcon = () => {
    iconName.value = iconName.value === 'Fold' ? 'Expand' : 'Fold'
  }
  return {
    iconName,
    changeIcon,
    refresh,
  }
})

export default useLayOutSettingStore
