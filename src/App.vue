<template>
  <div>
    <h1>Hello World</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { reqLogin } from './api/user'

// 当你组件挂载完毕测试发一个请求
onMounted(() => {
  reqLogin({ username: 'admin', password: '111111' })
})
</script>

<style scoped lang="scss">
div {
  color: $color;
}
</style>
