#!/bin/bash

# 初始化 Electron + Vue + Pinia + Vue Router 项目结构
# 用法: ./init-electron-vue.sh

# ---------------------------
# 配置区域（可自定义）
# ---------------------------
RENDERER_DIR="src/renderer/src"
STORE_DIR="$RENDERER_DIR/store"
ROUTER_DIR="$RENDERER_DIR/router"
VIEWS_DIR="$RENDERER_DIR/views"

# ---------------------------
# 创建目录结构
# ---------------------------
mkdir -p "$STORE_DIR" "$ROUTER_DIR" "$VIEWS_DIR"

# ---------------------------
# 生成 store 文件（如果不存在）
# ---------------------------
if [ ! -f "$STORE_DIR/index.ts" ]; then
  cat > "$STORE_DIR/index.ts" << 'EOL'
import { createPinia } from 'pinia'

const pinia = createPinia()

export default pinia

// 注册所有 store 模块
export * from './exampleStore'
EOL
  echo "Created $STORE_DIR/index.ts"
else
  echo "$STORE_DIR/index.ts already exists, skipping..."
fi

if [ ! -f "$STORE_DIR/exampleStore.ts" ]; then
  cat > "$STORE_DIR/exampleStore.ts" << 'EOL'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    title: 'Electron + Pinia'
  }),
  actions: {
    increment() {
      this.count++
    },
    async asyncIncrement() {
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.increment()
    }
  },
  getters: {
    doubleCount: (state) => state.count * 2
  }
})
EOL
  echo "Created $STORE_DIR/exampleStore.ts"
else
  echo "$STORE_DIR/exampleStore.ts already exists, skipping..."
fi

# ---------------------------
# 生成 router 文件（如果不存在）
# ---------------------------
if [ ! -f "$ROUTER_DIR/index.ts" ]; then
  cat > "$ROUTER_DIR/index.ts" << 'EOL'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
EOL
  echo "Created $ROUTER_DIR/index.ts"
else
  echo "$ROUTER_DIR/index.ts already exists, skipping..."
fi

# ---------------------------
# 生成基础视图文件（如果不存在）
# ---------------------------
if [ ! -f "$VIEWS_DIR/HomeView.vue" ]; then
  cat > "$VIEWS_DIR/HomeView.vue" << 'EOL'
<script setup lang="ts">
import { useCounterStore } from '@/store/exampleStore'

const counter = useCounterStore()
</script>

<template>
  <div class="home">
    <h1>{{ counter.title }}</h1>
    <p>Count: {{ counter.count }}</p>
    <p>Double: {{ counter.doubleCount }}</p>
    
    <button @click="counter.increment()">Increment</button>
    <button @click="counter.asyncIncrement()">Async Increment</button>
    <router-link to="/about">Go to About</router-link>
  </div>
</template>
EOL
  echo "Created $VIEWS_DIR/HomeView.vue"
else
  echo "$VIEWS_DIR/HomeView.vue already exists, skipping..."
fi

if [ ! -f "$VIEWS_DIR/AboutView.vue" ]; then
  cat > "$VIEWS_DIR/AboutView.vue" << 'EOL'
<template>
  <div class="about">
    <h1>About Page</h1>
    <router-link to="/">Go to Home</router-link>
  </div>
</template>
EOL
  echo "Created $VIEWS_DIR/AboutView.vue"
else
  echo "$VIEWS_DIR/AboutView.vue already exists, skipping..."
fi

# ---------------------------
# 修改 main.ts 的提示
# ---------------------------
echo ""
echo "✅ 文件生成完成！"
echo "⚠️ 请手动检查 src/renderer/src/main.ts 确保包含以下内容："
cat << 'EOL'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'  // 新增
import pinia from './store'    // 新增

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
EOL