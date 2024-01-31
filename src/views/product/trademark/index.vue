<template>
  <el-card class="box-card">
    <!-- 卡片顶部添加品牌按钮 -->
    <el-button type="primary" size="default" icon="Plus" @click="addTradeMark">
      添加品牌
    </el-button>
    <!-- 表格组件：用于展示已有数据 -->
    <!-- 
      table
      ---border:可以设置表格纵向是否由边框
      table--column
      ---label：某一个列表
      ---width：设置这列的宽度
      ---align：设置这列的对齐方式
     -->
    <el-table style="margin: 10px 0px" border :data="trademarkArr">
      <el-table-column label="序号" width="100px" align="center" type="index"></el-table-column>
      <!-- table-column：默认展示数据用div -->
      <el-table-column label="品牌名称" prop="tmName"></el-table-column>
      <el-table-column label="品牌LOGO">
        <template #="{ row }">
          <img :src="row.logoUrl" style="height: 100px; width: 100px" alt="无图片" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{ row }">
          <el-button type="warning" size="small" icon="Edit" @click="editTradeMark(row)"></el-button>
          <el-popconfirm :title="`您确定要删除${row.tmName}品牌吗？`" width="220px" icon="Delete"
            @confirm="deleteTrademark(row.id)">
            <template #reference>
              <el-button type="danger" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 
      分页器组件
      pagination
      ---v-model:current-page:设置分页器当前页码
      ---v-model:page-size:设置每页展示数字的条数
      ---page-sizes:设置每页显示个数选择器的选项设置
      ---background：设置分页器背景颜色
      ---layout：设置分页器六个子组件布局(->顶到最右侧)
     -->
    <div class="demo-pagination-block">
      <el-pagination v-model:current-page="pageNo" @current-change="getHasTrademark" @size-change="changeList"
        v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" :background="true"
        layout="prev, pager, next, jumper,->,sizes ,total" :total="total" />
    </div>
  </el-card>
  <!-- 对话框组件：在添加与修改品牌的业务时使用的结构 -->
  <!-- 
    v-model：控制用户对话框显示与隐藏（true显示）
    title：对话框标题
  -->
  <el-dialog v-model="dialogFormVisible" :title="dialogTitle">
    <el-form style="width: 80%" :model="trademarkParams" :rules="rules" ref="formRef">
      <el-form-item label="品牌名称" label-width="100px" prop="tmName">
        <el-input placeholder="请输入品牌名称" v-model="trademarkParams.tmName"></el-input>
      </el-form-item>
      <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
        <!--upload组件属性：
          action图片上传路劲书写/api，代理服务器不发送这次post请求  -->
        <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
          :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <!-- 具名插槽：footer -->
    <template #footer>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
      <el-button type="primary" size="default" @click="confirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark
} from '@/api/product/trademark'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import type {
  Records,
  TradeMark,
  TradeMarkResponseData,
} from '@/api/product/trademark/type'
let pageNo = ref<number>(1)
let limit = ref<number>(3)
let total = ref<number>(0)
let trademarkArr = ref<Records>([])
let dialogFormVisible = ref<boolean>(false)
let dialogTitle = ref<string>()

// 定义收集新增品牌数据
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})

// 获取已有品牌的接口封装为一个函数：在任何情况下向获取数据，调用此函数即可
const getHasTrademark = async () => {
  // 获取已有品牌接口
  await reqHasTrademark(pageNo.value, limit.value).then(
    (res: TradeMarkResponseData) => {
      // 存储已有品牌数据
      total.value = res.data.total
      trademarkArr.value = res.data.records
    },
  )
}
// 每次页面变化
// 对于当前页码发生变化自定义事件，组件pagination父组件回传了数据（当前页码）
/* const changePageNo = () => {
  // 页码变化时再次发请求
  getHasTrademark()
} 
*/
// size-change返回的是下拉菜单选中的数据
const changeList = () => {
  pageNo.value = 1
  getHasTrademark()
}

const cancel = () => {
  dialogFormVisible.value = false
}

const confirm = async () => {
  // 在发请求之前，要对整个表单进行校验
  // 调用这个方法进行全部表单校验，如果校验全部通过，再执行后面
  await formRef.value.validate();
  await reqAddOrUpdateTrademark(trademarkParams)
    .then((res) => {
      console.log(res)
      dialogFormVisible.value = false
      ElMessage({
        type: 'success',
        message: `${trademarkParams.id ? '修改' : '添加'}品牌成功`,
      })
      getHasTrademark()
    })
    .catch(() => {
      ElMessage({
        type: 'error',
        message: '添加品牌失败',
      })
    })
}
// 增改删
const addTradeMark = () => {
  dialogFormVisible.value = true
  // 清空数据
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  // 清空id以防bug
  trademarkParams.id = 0
  dialogTitle.value = '添加品牌'

  // 注意这里的formRef在第一次的时候还没出现
  nextTick(() => {
    formRef.value.clearValidate()
  })
}

// row：即为当前已有的品牌
const editTradeMark = (row: TradeMark) => {
  // 展示已有品牌的数据
  trademarkParams.tmName = row.tmName;
  trademarkParams.logoUrl = row.logoUrl;
  trademarkParams.id = row.id

  dialogFormVisible.value = true;
  dialogTitle.value = '编辑品牌'

  nextTick(() => {
    formRef.value.clearValidate()
  })
}

const deleteTrademark = async (id: number) => {
  await reqDeleteTrademark(id).then(() => {
    ElMessage({
      type: 'success',
      message: '删除品牌成功'
    })
    getHasTrademark()
  }).catch(() => {
    ElMessage({
      type: 'error',
      message: '删除品牌失败'
    })
  })
}


// 组件挂载完毕，发第一次请求
onMounted(() => {
  getHasTrademark()
})

// 上传图片组件->上传图片之前触发的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // 钩子是在图片上传成功之前触发，上传文件之前可以约束文件的大小
  // 要求：上传文件格式png|jpg|gif 4M
  if (
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传图片大小不能超过 4MB!',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传图片只能是 png、jpg、gif 格式之一！',
    })
    return false
  }
}
// 图片上传成功之后的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
) => {
  // response:即为上传图片post请求服务器返回的数据
  trademarkParams.logoUrl = response.data
  // 图片上传成功，清除对应图片校验结果
  formRef.value.clearValidate()
}

// 获取表单实例
let formRef = ref()
// 定义表单校验规则
const validatorTmName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('品牌名称长度应大于两位'))
  }
}
const validatorLogoUrl = (rule: any, value: any, callback: any) => {
  if (value) { callback() } else { callback(new Error("务必保证品牌LOGO输入")) }
}
const rules = {
  tmName: [
    { required: true, trigger: 'blur', validator: validatorTmName }
  ],
  logoUrl: [
    { required: true, validator: validatorLogoUrl }
  ]
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
