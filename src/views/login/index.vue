<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input
              placeholder="请输入账号"
              v-model="loginForm.username"
              :prefix-icon="User"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              placeholder="请输入密码"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login_btn"
              type="primary"
              size="default"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
// 收集账号和密码的数据
import { reactive, ref } from 'vue'

// 导入判断时间函数
import times from '@/utils/time'
// 按钮加载效果
let loading = ref(false)

let loginForm = reactive({
  username: '',
  password: '',
})

// 获取路由器
let $router = useRouter()

// 引入用户相关的小仓库
import useUserStore from '@/store/modules/user'
import { useRouter } from 'vue-router'
let useStore = useUserStore()

// 登录按钮的回调
const login = async () => {
  // 必须保障全部表单校验通过后才能发送请求
  await loginForms.value.validate()

  loading.value = true
  // 通知仓库发登录请求
  // 请求成功 -> 跳转首页展示数据的地方
  // 请求失败 -> 提示登陆失败
  await useStore
    .userLogin(loginForm)
    .then(() => {
      // 编程式导航跳转
      $router.push('/')
      // 登陆成功的提示信息
      ElNotification({
        title: `hi,${times()}好`,
        message: '欢迎登录',
        type: 'success',
      })
      loading.value = false
    })
    .catch((error: Error) => {
      loading.value = false

      // 登陆失败的提示信息
      ElNotification({
        title: '登录失败',
        message: error.message,
        type: 'error',
      })
    })
}

// 获取表单元素
const loginForms = ref()

// 自定义规则函数
const validatorUserName = (rule: any, value: any, callback: any) => {
  // rule:即为校验对象
  // console.log(rule);
  // value：即为表单元素的文本内容
  // console.log(value);
  // callback：即为校验函数  如果符合条件callback放行通过，如果不符合注入错误信息
  if (value.length >= 5 && value.length <= 10) {
    callback()
  } else {
    callback(new Error('账号长度应该为5-10位'))
  }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 6 && value.length <= 15) {
    callback()
  } else {
    callback(new Error('密码长度应当为6-15位'))
  }
}

// 表单校验
const rules = {
  // 规则对象属性
  // required代表这个字段务必要检验
  // min、max表示表单元素长度
  // message表示提示错误信息
  // trigger：表示触发校验表单时机。blur -> 失去表单焦点;change -> 表单元素变化

  username: [
    // { required: true, message: '账号不能为空', trigger: 'blur' },
    // { required: true, min: 5, max: 10, mseeage: '账号长度应该为5-10位', trigger: 'change' }
    { trigger: 'change', validator: validatorUserName },
  ],
  password: [
    // { required: true, min: 6, max: 15, message: '密码长度应当为6-15位', trigger: 'change' }
    { trigger: 'change', validator: validatorPassword },
  ],
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      color: white;
      font-size: 20px;
      margin: 20px 0px;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
