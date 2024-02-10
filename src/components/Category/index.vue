<template>
    <!-- 三级分类全局组件 -->
    <el-card>
        <el-form :inline="true" class="el-form">
            <el-form-item label="一级分类" style="margin:10px 30px">
                <el-select :disabled="scene != 0" v-model="categoryStore.c1Id" @change="handle1">
                    <el-option v-for="c1 in categoryStore.c1Arr" :label="c1.name" :key="c1.id" :value="c1.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类" style="margin:10px 30px">
                <el-select :disabled="scene != 0" v-model="categoryStore.c2Id" @change="handle2">
                    <el-option v-for="c2 in categoryStore.c2Arr" :label="c2.name" :key="c2.id" :value="c2.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类" style="margin:10px 20px">
                <el-select :disabled="scene != 0" v-model="categoryStore.c3Id">
                    <el-option v-for="c3 in categoryStore.c3Arr" :label="c3.name" :key="c3.id" :value="c3.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
import { DefineProps } from 'vue';

// 引入仓库
import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()

// 引入生命周期的函数
import { onMounted } from 'vue'
onMounted(() => {
    // 组件挂载完毕先获取一级分类的数据
    categoryStore.getC1()
})

// 此方法即为一级分类下拉菜单的change事件（选中值有了才会触发）
const handle1 = () => {

    // 获取二级分类数据
    categoryStore.getC2()

    // 清空二三级数据
    categoryStore.c2Id = '';
    categoryStore.c3Id = '';
    categoryStore.c2Arr = [];
    categoryStore.c3Arr = [];
}
const handle2 = () => {
    // 获取三级分类数据
    categoryStore.getC3()
    // 清空三级数据
    categoryStore.c3Id = '';
    categoryStore.c3Arr = [];
}

defineProps(['scene'])
</script>

<style scoped></style>@/store/modules/category