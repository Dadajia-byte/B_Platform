<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <!-- 顶部左侧静态 -->
      <el-icon style="margin-right: 10px" @click="LayoutSettingStore.changeIcon">
        <component :is="LayoutSettingStore.iconName"></component>
      </el-icon>
      <!-- 左侧面包屑 -->
      <el-breadcrumb separator-icon="ArrowRight" active-text-color="yellowgreen">
        <!-- 面包屑动态展示路由名字与标题 -->
        <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" v-show="item.meta.title" :to="item.path">
          <!-- 图标 -->
          <el-icon style="margin: 0px 2px; vertical-align: middle">
            <component :is="item.meta.icon"></component>
          </el-icon>
          <!-- 面包屑展示匹配路由的标题 -->
          <span>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tabbar_right">
      <el-button size="small" icon="Refresh" circle
        @click="LayoutSettingStore.refresh = !LayoutSettingStore.refresh"></el-button>
      <el-button size="small" icon="FullScreen" circle @click="fullScreen"></el-button>
      <el-button size="small" icon="Setting" circle></el-button>
      <img :src="userStore.avatar" style="width: 24px; height: 24px; margin: 0px 10px; border-radius: 12px" />
      <!-- 下拉菜单 -->
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userStore.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="Logout">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/setting'
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'
let userStore = useUserStore()
let $router = useRouter()
let $route = useRoute()
let LayoutSettingStore = useLayOutSettingStore()
const fullScreen = () => {
  // DOM对象的一个属性，可以判断当前是不是全屏模式（全屏：true）
  let full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
const Logout = async () => {
  await userStore.userLogout()
  $router.push({ path: '/login', query: { redirect: $route.path } })
}

</script>
<script lang="ts">
export default {
  name: 'Tabbar',
}
</script>
<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;

  .tabbar_left {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }

  .tabbar_right {
    display: flex;
    align-items: center;
  }
}
</style>
