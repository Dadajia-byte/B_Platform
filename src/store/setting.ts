// 小仓库：layout相关配置仓库

import { defineStore } from "pinia";
import { ref } from "vue";

let useLayOutSettingStore = defineStore('SettingStore', () => {
    let iconName = ref('Expand')
    let changeIcon = () => {
        iconName.value = iconName.value === 'Fold' ? 'Expand' : 'Fold'
    }
    return {
        iconName,
        changeIcon
    }
})

export default useLayOutSettingStore