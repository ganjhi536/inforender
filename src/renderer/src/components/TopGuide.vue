<template>
  <div class="dark-title-bar">
    <!-- 左侧可放置应用logo或标题 -->
    <div class="title-bar-left">
      <span class="app-name">Text-Render</span>
    </div>

    <!-- 中间搜索框 -->
    <div class="title-bar-center">
      <el-input
        v-model="searchText"
        placeholder="搜索..."
        size="small"
        class="search-input"
        @keyup.enter="handleSearch"
      >
        <template #prefix>
          <el-icon class="search-icon"><Search /></el-icon>
        </template>
      </el-input>
    </div>

    <!-- 右侧窗口控制按钮 -->
    <div class="title-bar-right">
      <!-- 最小化按钮 -->
      <div class="title-bar-btn" title="最小化" @click="IpcSender('Minimize')">
        <el-icon><Minus /></el-icon>
      </div>

      <!-- 最大化/还原按钮 -->
      <div
        class="title-bar-btn"
        :title="isMaximized ? '还原' : '最大化'"
        @click="IpcSender(isMaximized ? 'Restore' : 'Maximize')"
      >
        <el-icon>
          <component :is="isMaximized ? CopyDocument : FullScreen" />
        </el-icon>
      </div>

      <!-- 关闭按钮 -->
      <div class="title-bar-btn close-btn" title="关闭" @click="IpcSender('Close')">
        <el-icon><Close /></el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { FullScreen, CopyDocument } from '@element-plus/icons-vue'
import { IpcSender } from '../Libs/Lib'

const searchText = ref('')
const isMaximized = ref(false)
const handleSearch = (): void => {
  console.log('搜索内容:', searchText.value)
  // 触发搜索逻辑
}
const updateWindowState = (_: unknown, state: string): void => {
  isMaximized.value = state === 'maximized'
}
// 监听窗口状态变化
onMounted(() => {
  window.electron.ipcRenderer.on('window-state-changed', updateWindowState)
})
</script>

<style scoped>
/* 暗色标题栏样式 */
.dark-title-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  background-color: #1a1a1a;
  -webkit-app-region: drag;
  padding: 0 12px;
  border-bottom: 1px solid #333;
  color: #e0e0e0;
}

/* 左侧应用名称样式 */
.title-bar-left {
  display: flex;
  align-items: center;
  height: 100%;
  -webkit-app-region: no-drag;
}

.app-name {
  font-size: 14px;
  font-weight: 500;
  margin-left: 8px;
  color: #f0f0f0;
}

/* 中间搜索框样式 */
.title-bar-center {
  flex: 1;
  max-width: 600px;
  margin: 0 20px;
}

.search-input {
  -webkit-app-region: no-drag;
}

.search-input :deep(.el-input__wrapper) {
  background-color: #2d2d2d;
  border: 1px solid #444;
  box-shadow: none;
}

.search-input :deep(.el-input__inner) {
  color: #e0e0e0;
}

.search-input :deep(.el-input__wrapper:hover) {
  border-color: #555;
}

.search-input :deep(.el-input__wrapper.is-focus) {
  border-color: #409eff;
  box-shadow: 0 0 0 1px #409eff;
}

.search-icon {
  color: #888;
}

/* 右侧按钮区域 */
.title-bar-right {
  display: flex;
  align-items: center;
  height: 100%;
  -webkit-app-region: no-drag;
}

/* 窗口控制按钮样式 */
.title-bar-btn {
  width: 40px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #bbb;
}

.title-bar-btn:hover {
  background-color: #333;
  color: #fff;
}

/* 最小化按钮悬停 */
.title-bar-btn:first-child:hover {
  background-color: #2d2d2d;
}

/* 最大化按钮悬停 */
.title-bar-btn:nth-child(2):hover {
  background-color: #2d2d2d;
}

/* 关闭按钮悬停 */
.close-btn:hover {
  background-color: #e81123 !important;
  color: white;
}

/* 图标大小调整 */
.title-bar-btn .el-icon {
  font-size: 14px;
}
</style>
