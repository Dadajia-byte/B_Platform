<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider">
            <!-- logo组件 -->

            <Logo></Logo>
            <!-- 展示菜单 -->
            <!-- 滚动组件 -->
            <el-scrollbar>
                <!-- 菜单组件 -->
                <el-menu background-color="#001529" text-color="white" router>
                    <!-- 根据路由动态生成菜单 -->
                    <Menu :menuList="UserStore.menuRoutes" text-color="white"></Menu>
                </el-menu>

            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabber"></div>
        <!-- 内容区 -->
        <div class="layout_content">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang="ts">
// 引入左侧菜单logo组件
import Logo from './logo/index.vue'
// 引入左侧路由菜单组件
import Menu from './menu/index.vue'
// 引入右侧内容展示区域
import Main from './main/index.vue'
// 获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
let UserStore = useUserStore()
console.log(UserStore.menuRoutes);

</script>

<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;
    background-color: red;

    .layout_slider {
        width: $leftMenuWidth;
        height: 100vh;
        background-color: $leftMenuBgc;

        el-scrollbar {
            height: calc(100vh -logoHight);
            width: 100%;

            el-menu {
                border-right: none;
            }
        }
    }

    .layout_tabber {
        position: fixed;
        height: $topMenuHeight;
        width: calc(100% - $leftMenuWidth);
        background-color: blue;
        top: 0px;
        left: $leftMenuWidth;
        padding: 20px;
    }

    .layout_content {
        position: absolute;
        height: calc(100vh - $topMenuHeight);
        width: calc(100% - $leftMenuWidth);
        top: $topMenuHeight;
        left: $leftMenuWidth;
        background-color: yellow;
        overflow: auto;
    }
}
</style>