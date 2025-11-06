import { createPinia } from 'pinia'

const pinia = createPinia()

export default pinia

// 注册所有 store 模块
export * from './Account'
