import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@render': resolve('src/renderer/src'),
        '@view': resolve('src/renderer/src/views'),
        '@store': resolve('src/renderer/src/store'),
        '@libs': resolve('src/renderer/src/Libs'),
      }
    },
    plugins: [vue()]
  }
})
