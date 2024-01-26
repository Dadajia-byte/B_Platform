<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div
      class="layout_slider"
      :class="{ fold: LayoutSettingStore.iconName === 'Fold' }"
    >
      <!-- logo组件 -->

      <Logo></Logo>
      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
      <el-scrollbar>
        <!-- 菜单组件 -->
        <el-menu
          :default-active="$route.path"
          background-color="#001529"
          text-color="white"
          router
          active-text-color="yellowgreen"
          :collapse="LayoutSettingStore.iconName === 'Fold'"
          style="border-right: 0px"
        >
          <!-- 根据路由动态生成菜单 -->
          <Menu :menuList="userStore.menuRoutes" text-color="white"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div
      class="layout_tabbar"
      :class="{ fold: LayoutSettingStore.iconName === 'Fold' }"
    >
      <Tabbar></Tabbar>
    </div>
    <!-- 内容区 -->
    <div
      class="layout_content"
      :class="{ fold: LayoutSettingStore.iconName === 'Fold' }"
      style="border-left: 0px"
    >
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入右侧内容展示区域
import Main from './main/index.vue'
// 引入左侧菜单logo组件
import Logo from './logo/index.vue'
// 引入左侧路由菜单组件
import Menu from './menu/index.vue'

// 引入顶部导航
import Tabbar from './tabbar/index.vue'

// 获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()

// 获取layout配置仓库
import useLayOutSettingStore from '@/store/setting'
let LayoutSettingStore = useLayOutSettingStore()
</script>
<script lang="ts">
export default {
  name: 'Layout',
}
</script>
<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    width: $leftMenuWidth;
    height: 100vh;
    background-color: $leftMenuBgc;
    color: white;
    transition: all 0.8s;

    el-scrollbar {
      height: calc(100vh -logoHight);
      width: 100%;
    }

    &.fold {
      width: $leftMenuMinWidth;
    }
  }

  .layout_tabbar {
    position: fixed;
    height: $topMenuHeight;
    width: calc(100% - $leftMenuWidth);
    background-image: linear-gradient(to left, #f6f7f9, #ffffff);
    top: 0px;
    left: $leftMenuWidth;
    padding: 20px;
    transition: all 0.8s;

    &.fold {
      width: calc(100vw - $leftMenuMinWidth);
      left: $leftMenuMinWidth;
    }
  }

  .layout_content {
    position: absolute;
    height: calc(100vh - $topMenuHeight);
    width: calc(100% - $leftMenuWidth);
    top: $topMenuHeight;
    left: $leftMenuWidth;
    background-color: yellow;
    overflow: auto;
    transition: all 0.8s;

    &.fold {
      width: calc(100vw - $leftMenuMinWidth);
      left: $leftMenuMinWidth;
    }
  }
}
</style>
