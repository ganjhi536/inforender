<template>
  <!--登陆主框架 用来作为基底-->
  <div class="MainContent">
    <div class="LoginContent">
      <!--包含账号密码两个输入框 提交按钮 以及注册按钮与找回密码按钮 使用v-if判断为输入框还是输出框-->
      <!--v-if条件为store内的 IfLogin选项 此选项默认为true-->
      <!--使用element-plus 中的 elfrom-->
      <el-form
        v-if="IfLogin"
        ref="loginFormRef"
        :model="LoginFrom"
        :rules="fromrules"
        label-width="120px"
      >
        <el-form-item label="账号" prop="Account">
          <el-input v-model="LoginFrom.Account" />
        </el-form-item>
        <el-form-item label="密码" prop="Password">
          <el-input v-model="LoginFrom.Password" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="Login">登陆</el-button>
          <el-button @click="store.IfLogin = false">注册</el-button>
          <el-button>找回密码</el-button>
        </el-form-item>
      </el-form>
      <!--注册框-->
      <el-form
        v-else
        ref="registerFormRef"
        :model="RegisterFrom"
        :rules="fromrules"
        label-width="120px"
      >
        <el-form-item label="账号" prop="Account">
          <el-input v-model="RegisterFrom.Account" />
        </el-form-item>
        <el-form-item label="密码" prop="Password">
          <el-input v-model="RegisterFrom.Password" type="password" />
        </el-form-item>
        <el-form-item label="确认密码" prop="RePassword">
          <el-input v-model="RegisterFrom.RePassword" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="Register">注册</el-button>
          <el-button @click="store.IfLogin = true">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
/*  
    ---------------------------------------------
    ----------------ts标明----------------------
    ---------------------------------------------
*/
//表明类型
interface LoginFormData {
  Account: string
  Password: string
}
interface RegisterFormData {
  Account: string
  Password: string
  RePassword: string
}
/*  
    ---------------------------------------------
    ----------------数据部分----------------------
    ---------------------------------------------
*/
//导入store
import { ref } from 'vue'
import { useAccountStore } from '../store/index'
import type { FormInstance, FormItemRule } from 'element-plus'
//获取store
const store = useAccountStore()
//获取store内的IfLogin选项
//store为组合式API的store
const IfLogin = store.IfLogin
//储存表单数据
const LoginFrom = ref<LoginFormData>({
  Account: '',
  Password: ''
})
const RegisterFrom = ref<RegisterFormData>({
  Account: '',
  Password: '',
  RePassword: ''
})
//表单引用
const loginFormRef = ref<FormInstance>()
const registerFormRef = ref<FormInstance>()
/*  
    ---------------------------------------------
    ----------------函数部分----------------------
    ---------------------------------------------
*/
//自定义规则检验
const validateUserName = (
  _rule: FormItemRule,
  value: string,
  callback: (error?: Error) => void
): void => {
  //检验账号是否为空
  if (!value) {
    callback(new Error('账号不能为空'))
  }
  if (value.length < 2) {
    callback(new Error('账号长度不能小于2个字符'))
  }
  if (!/^[a-zA-Z0-9_]+$/.test(value)) {
    return callback(new Error('用户名只能包含字母、数字和下划线'))
  }
  callback()
}
const validatePassword = (
  _rule: FormItemRule,
  value: string,
  callback: (error?: Error) => void
): void => {
  //检验密码是否为空
  if (!value) {
    callback(new Error('密码不能为空'))
  }
  if (value.length < 6) {
    callback(new Error('密码长度不能小于6个字符'))
  }
  callback()
}
const validateRePassword = (
  _rule: FormItemRule,
  value: string,
  callback: (error?: Error) => void
): void => {
  //检验确认密码是否为空
  if (!value) {
    callback(new Error('确认密码不能为空'))
  }
  if (value.length < 6) {
    callback(new Error('确认密码长度不能小于6个字符'))
  }
  //检验确认密码是否与密码相同
  if (value !== RegisterFrom.value.Password) {
    callback(new Error('确认密码与密码不相同'))
  }
  callback()
}
//创建自定义规则校验
const fromrules = ref({
  Account: [{ validator: validateUserName, trigger: 'blur' }],
  Password: [{ validator: validatePassword, trigger: 'blur' }],
  RePassword: [{ validator: validateRePassword, trigger: 'blur' }]
})
//登陆函数
const Login = async (): Promise<boolean | void | undefined> => {
  if (!loginFormRef.value) return

  //进行el-form表单检验
  const valid = await loginFormRef.value.validate()
  if (valid) {
    //检验通过则进行登陆操作
    console.log('表单验证通过，执行登录操作')
    //登陆操作
  } else {
    //检验不通过则进行提示
    console.log('表单验证失败')
    return false
  }
}

//注册函数
const Register = async (): Promise<boolean | void | undefined> => {
  if (!registerFormRef.value) return

  //进行el-form表单检验
  const valid = await registerFormRef.value.validate()
  if (valid) {
    //检验通过则进行注册操作
    console.log('表单验证通过，执行注册操作')
    //注册操作
  } else {
    //检验不通过则进行提示
    console.log('表单验证失败')
    return false
  }
}
</script>
<style scoped lang="css"></style>
