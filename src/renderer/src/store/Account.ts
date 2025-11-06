import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useAccountStore = defineStore('account', () => {
  const UserToken = ref('') //用户标识符 用于获取用户数据
  const IfLogin = ref(true) //用于提供给页面判断是否登录
  return {
    UserToken,
    IfLogin
  }
})
