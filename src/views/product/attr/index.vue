<template>
  <!-- 虽然vue3支持可以不提供单一根标签，但是不添加的话过渡动画就没了 -->
  <div>
    <!-- 三级分类全局组件 -->
    <Category :scene="scene"></Category>
    <el-card style="margin: 10px 0px;">
      <div v-show="scene == 0">
        <el-button @click="addAtrr" type="primary" size="default" icon="Plus"
          :disabled="!categoryStore.c3Id">添加属性</el-button>
        <el-table border style="margin: 10px 0px;" :data="attrArr">
          <el-table-column label="序号" type="index" align="center" width="90px"></el-table-column>
          <el-table-column label="属性名称" width="130px" align="center" prop="attrName"></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row }">
              <el-tag style="margin: 5px;" v-for="(item) in row.attrValueList" :key="item.id">{{ item.valueName
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="130px" align="center">
            <template #="{ row }">
              <!-- 修改 -->
              <el-button type="primary" size="small" icon="Edit" @click="updateAttr(row)"></el-button>
              <el-popconfirm :title="`你确定删除${row.attrName}属性吗？`" @confirm="deleteAttr(row.id)">
                <template #reference>
                  <el-button type="primary" size="small" icon="Delete"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene != 0">
        <!-- 展示添加与修改属性的结构 -->
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input placeholder="请你输入属性名称" v-model="attrParams.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="addAttrValue" :disabled="!attrParams.attrName" type="primary" size="default"
          icon="Plus">添加属性值</el-button>
        <el-button size="default" @click="cancel">取消</el-button>
        <el-table border style="margin: 10px 0px;" :data="attrParams.attrValueList">
          <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <div>
                <el-input :ref="(vc: any) => inputArr[$index] = vc" v-if="row.flag" @blur="change(row, $index)"
                  placeholder="请你输入属性值名称" v-model="row.valueName"></el-input>
                <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作">
            <template #="{ $index }">
              <el-button type="primary" size="small" icon="Delete"
                @click="attrParams.attrValueList.splice($index, 1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" size="default" @click="save"
          :disabled="attrParams.attrValueList.length == 0 || attrParams.attrValueList[0].valueName === ''">保存</el-button>
        <el-button size="default" @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue'
// 引入获取已有属性与属性值接口
import { reqAddOrUpdateAttr, reqAttr, reqDeleteAttr } from '@/api/product/attr/index'
import { Attr, AttrValue } from '@/api/product/attr/type'
import useCategoryStore from '@/store/modules/category'
import { ElMessage } from 'element-plus';
let categoryStore = useCategoryStore()

// 准备一个数组：存储input实例
let inputArr = ref<any>([])


// 存储已有属性与属性值
let attrArr = ref<Attr[]>()

// 卡片组件内容切换
let scene = ref<number>(0)
const change = (row: AttrValue, $index: number) => {
  // 非法情况一：输入内容为空
  if (row.valueName.trim() === '') {
    // 删除对应属性值为空的元素
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能为空'
    });
    return;
  }
  // 非法情况二：输入重复内容
  else if (attrParams.attrValueList.find((item) => {
    if (item != row) {
      return item.valueName === row.valueName;
    }
  })) {
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能重复'
    });
    return;
  } else {
    row.flag = false
  }
}
const toEdit = (row: AttrValue, $index: number) => {
  row.flag = true;
  nextTick(() => {
    inputArr.value[$index].focus();
  })
}

// 监听三级分类变化
watch(() => categoryStore.c3Id, async () => {
  // 清空上一次数据
  attrArr.value = []
  const { c1Id, c2Id, c3Id } = categoryStore
  if (c3Id) {
    await reqAttr(c1Id, c2Id, c3Id).then((res) => {
      attrArr.value = res.data
    })
  }
})

// 收集新增属性对象
let attrParams = reactive<Attr>({
  attrName: '', // 新增属性的名字
  attrValueList: [// 新增属性值数组
  ],
  categoryId: '',// 三级分类id
  categoryLevel: 3, // 三级分类
})
// 点击添加属性值按钮
const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true
  })
  // 最后一个input聚焦
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}

// 取消按钮的回调
const cancel = () => {
  scene.value = 0
}

// 保存按钮的回调
const save = () => {
  reqAddOrUpdateAttr(attrParams).then(async () => {
    await reqAttr(categoryStore.c1Id, categoryStore.c2Id, categoryStore.c3Id).then((res) => {
      attrArr.value = res.data
    })
    scene.value = 0;
    ElMessage({
      type: 'success',
      message: '添加属性成功'
    });
    // 获取全部已有的属性与属性值
  }).catch(() => {
    ElMessage({
      type: 'error',
      message: '添加属性失败'
    })
  })



}

// 添加属性
const addAtrr = () => {
  // 每次点击时先清空
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [
    ],
    categoryId: categoryStore.c3Id,
    categoryLevel: 3,
  })
  scene.value = 1
}
// 修改属性
const updateAttr = (row: Attr) => {
  scene.value = 1
  // 将已有的属性赋值给attrParams
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}
// 删除属性
const deleteAttr = (attrId: number) => {
  reqDeleteAttr(attrId).then(async () => {
    await reqAttr(categoryStore.c1Id, categoryStore.c2Id, categoryStore.c3Id).then((res) => {
      attrArr.value = res.data
    })
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    // 重新获取刷新页面
  }).catch(() => {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })

  });
}


// 路由组件销毁时，将仓库相关数据情空
onBeforeUnmount(() => {
  categoryStore.clearData();
})
</script>

<style scoped></style>
