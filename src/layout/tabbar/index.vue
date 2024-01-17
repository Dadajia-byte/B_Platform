<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <!-- 顶部左侧静态 -->
            <el-icon style="margin-right:10px" @click="LayoutSettingStore.changeIcon">
                <component :is="LayoutSettingStore.iconName"></component>
            </el-icon>
            <!-- 左侧面包屑 -->
            <el-breadcrumb separator-icon="ArrowRight">
                <el-breadcrumb-item>权限管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="tabbar_right">
            <el-button size="small" icon="Refresh" circle></el-button>
            <el-button size="small" icon="FullScreen" circle></el-button>
            <el-button size="small" icon="Setting" circle></el-button>
            <img src="../../../public/logo.png" style="width:24px;height:24px;margin:0px 10px;">
            <!-- 下拉菜单 -->
            <el-dropdown>
                <span class="el-dropdown-link">
                    admin
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/setting';
let LayoutSettingStore = useLayOutSettingStore()
</script>
<script lang="ts">
export default {
    name: 'Tabbar'
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
        align-items: center
    }
}
</style>