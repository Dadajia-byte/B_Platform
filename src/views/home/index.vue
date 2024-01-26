<template>
  <div>我是一级路由home组件{{ userStore.username }}</div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user';
let userStore = useUserStore()
import { onMounted } from 'vue';


// 首页挂载完毕发请求要用户信息
onMounted(async () => {
  await userStore.userInfo();

  console.log(userStore);


})

</script>

<style scoped></style>
