<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
</script>
<script lang="ts">
export default {
  name: 'Logo',
}
</script>
<style scoped lang="scss">
.logo {
  display: flex;
  align-items: center;
  height: $logoHight;
  width: 100%;
  color: white;
  padding: 10px;

  img {
    height: 40px;
    width: 40px;
  }

  p {
    font-size: $logoFontSize;
    margin-left: 15px;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
