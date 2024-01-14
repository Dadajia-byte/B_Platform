<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item>
            <el-input placeholder="请输入账号" v-model="loginForm.username" :prefix-icon="User"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="password" placeholder="请输入密码" :prefix-icon="Lock" v-model="loginForm.password"
              show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" class="login_btn" type="primary" size="default" @click="login">
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
