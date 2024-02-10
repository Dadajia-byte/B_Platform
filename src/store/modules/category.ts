// 商品分类全局组件小仓库
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { categoryObj } from '@/api/product/attr/type'
// 引入分类接口方法
import { reqC1, reqC2, reqC3 } from '@/api/product/attr/index'
export default defineStore('category', () => {

    let c1Arr = ref<categoryObj[]>()
    let c2Arr = ref<categoryObj[]>()
    let c3Arr = ref<categoryObj[]>()
    let c1Id = ref<number | string>('')
    let c2Id = ref<number | string>('')
    let c3Id = ref<number | string>('')
    const getC1 = async () => {
        await reqC1().then(res => {
            c1Arr.value = res.data;
        })
    }
    const getC2 = async () => {
        await reqC2(c1Id.value).then(res => {
            c2Arr.value = res.data
        })
    }
    const getC3 = async () => {
        await reqC3(c2Id.value).then(res => {
            c3Arr.value = res.data
        })
    }
    // 清空数据函数
    const clearData = () => {
        c1Id.value = '';
        c2Id.value = '';
        c3Id.value = '';
        c1Arr.value = [];
        c2Arr.value = [];
        c3Arr.value = [];
    }
    return {
        c1Arr,
        c2Arr,
        c3Arr,
        c1Id,
        c2Id,
        c3Id,
        getC1,
        getC2,
        getC3,
        clearData
    }
})