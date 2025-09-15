<template>
  <div class="settings-container">
    <!-- 标题区域 -->
    <div class="header-section">
      <h1 class="settings-title">设置</h1>
      <p class="settings-subtitle">配置应用程序的首选项</p>
    </div>

    <!-- 设置项区域 -->
    <div class="settings-content">
      <!-- 启动选项 -->
      <div class="settings-group">
        <h3 class="group-title">启动选项</h3>
        <div class="settings-item">
          <div class="item-label">
            <span class="label-text">开机自启动</span>
            <span class="label-description">应用程序随系统自动启动</span>
          </div>
          <div class="item-control">
            <label class="switch">
              <input v-model="settings.startupOptions.autoStart" type="checkbox" />
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>

      <!-- 语言选择 -->
      <div class="settings-group">
        <h3 class="group-title">语言设置</h3>
        <div class="settings-item">
          <div class="item-label">
            <span class="label-text">界面语言</span>
            <span class="label-description">选择应用程序显示语言</span>
          </div>
          <div class="item-control">
            <div class="select-wrapper">
              <select v-model="settings.language.selected" class="flat-select">
                <option
                  v-for="lang in settings.language.options"
                  :key="lang.value"
                  :value="lang.value"
                >
                  {{ lang.label }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- 更新设置 -->
      <div class="settings-group">
        <h3 class="group-title">更新设置</h3>
        <div class="settings-item">
          <div class="item-label">
            <span class="label-text">自动检查更新</span>
            <span class="label-description">自动从GitHub检查新版本</span>
          </div>
          <div class="item-control">
            <label class="switch">
              <input v-model="settings.update.autoCheck" type="checkbox" />
              <span class="slider"></span>
            </label>
          </div>
        </div>
        <div v-if="settings.update.autoCheck" class="settings-item">
          <div class="item-label">
            <span class="label-text">更新源</span>
            <span class="label-description">选择更新检查的来源</span>
          </div>
          <div class="item-control">
            <div class="select-wrapper">
              <select v-model="settings.update.source" class="flat-select">
                <option
                  v-for="source in settings.update.sources"
                  :key="source.value"
                  :value="source.value"
                >
                  {{ source.label }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- 外观设置 -->
      <div class="settings-group">
        <h3 class="group-title">外观设置</h3>
        <div class="settings-item">
          <div class="item-label">
            <span class="label-text">主题模式</span>
            <span class="label-description">选择应用程序的主题</span>
          </div>
          <div class="item-control">
            <div class="select-wrapper">
              <select v-model="settings.appearance.theme" class="flat-select">
                <option
                  v-for="theme in settings.appearance.themes"
                  :key="theme.value"
                  :value="theme.value"
                >
                  {{ theme.label }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- 自动保存 -->
      <div class="settings-group">
        <h3 class="group-title">编辑器设置</h3>
        <div class="settings-item">
          <div class="item-label">
            <span class="label-text">自动保存</span>
            <span class="label-description">自动保存文档更改</span>
          </div>
          <div class="item-control">
            <label class="switch">
              <input v-model="settings.editor.autoSave" type="checkbox" @change="toggleAutoSave" />
              <span class="slider"></span>
            </label>
          </div>
        </div>
        <div v-if="settings.editor.autoSave" class="settings-item">
          <div class="item-label">
            <span class="label-text">保存间隔</span>
            <span class="label-description">自动保存的时间间隔（秒）</span>
          </div>
          <div class="item-control">
            <input
              v-model="settings.editor.saveInterval"
              type="number"
              class="flat-input"
              min="5"
              max="300"
            />
          </div>
        </div>
      </div>

      <!-- 实验性功能 -->
      <div class="settings-group">
        <h3 class="group-title" @click="toggleExperimental">
          <span>实验性功能</span>
          <span class="collapse-icon">{{ experimentalExpanded ? '−' : '+' }}</span>
        </h3>
        <div v-if="experimentalExpanded" class="settings-items-wrapper">
          <div
            v-for="(feature, index) in settings.experimental.features"
            :key="index"
            class="settings-item"
          >
            <div class="item-label">
              <span class="label-text">{{ feature.name }}</span>
              <span class="label-description">{{ feature.description }}</span>
            </div>
            <div class="item-control">
              <label class="switch">
                <input v-model="feature.enabled" type="checkbox" />
                <span class="slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- 开发者工具 -->
      <div class="settings-group">
        <h3 class="group-title">开发者选项</h3>
        <div class="settings-item">
          <div class="item-label">
            <span class="label-text">开发者工具</span>
            <span class="label-description">打开浏览器开发者工具</span>
          </div>
          <div class="item-control">
            <button class="flat-button" @click="openDevTools">打开开发者工具</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

// 设置项数据结构
interface Settings {
  startupOptions: {
    autoStart: boolean
  }
  language: {
    selected: string
    options: Array<{ value: string; label: string }>
  }
  update: {
    autoCheck: boolean
    source: string
    sources: Array<{ value: string; label: string }>
  }
  appearance: {
    theme: string
    themes: Array<{ value: string; label: string }>
  }
  editor: {
    autoSave: boolean
    saveInterval: number
  }
  experimental: {
    features: Array<{
      name: string
      description: string
      enabled: boolean
    }>
  }
}

// 响应式设置数据
const settings = reactive<Settings>({
  startupOptions: {
    autoStart: false
  },
  language: {
    selected: 'zh-CN',
    options: [
      { value: 'zh-CN', label: '中文' },
      { value: 'ENG', label: 'ENGLISH(disabled)' }
    ]
  },
  update: {
    autoCheck: true,
    source: 'github',
    sources: [{ value: 'github', label: 'GitHub' }]
  },
  appearance: {
    theme: 'dark',
    themes: [{ value: 'dark', label: '暗色' }]
  },
  editor: {
    autoSave: false,
    saveInterval: 30
  },
  experimental: {
    features: [
      {
        name: '高级渲染引擎(disabled)',
        description: '使用实验性的渲染引擎提高性能',
        enabled: false
      },
      {
        name: '实时协作(disabled)',
        description: '启用实验性的实时协作功能',
        enabled: false
      }
    ]
  }
})

// 实验性功能区域展开状态
const experimentalExpanded = ref(false)

// 切换实验性功能区域
const toggleExperimental = (): void => {
  experimentalExpanded.value = !experimentalExpanded.value
}

// 自动保存切换
const toggleAutoSave = (): void => {
  if (settings.editor.autoSave) {
    console.log(`启用自动保存，间隔: ${settings.editor.saveInterval}秒`)
  } else {
    console.log('禁用自动保存')
  }
}

// 打开开发者工具
const openDevTools = (): void => {
  // 在Electron环境中打开开发者工具
  if (window.require) {
    try {
      const { remote } = window.require('electron')
      remote.getCurrentWindow().webContents.openDevTools()
    } catch (error) {
      console.error('打开开发者工具失败:', error)
    }
  } else {
    console.log('非Electron环境，无法打开开发者工具')
  }
}

// 初始化设置（从本地存储加载）
onMounted(() => {
  const savedSettings = localStorage.getItem('app-settings')
  if (savedSettings) {
    try {
      const parsedSettings = JSON.parse(savedSettings)
      Object.assign(settings, parsedSettings)
    } catch (error) {
      console.error('加载设置失败:', error)
    }
  }
})

// 监听设置变化并保存到本地存储
// 这里使用watchEffect可以自动响应所有设置的变化
import { watchEffect } from 'vue'
watchEffect(() => {
  localStorage.setItem('app-settings', JSON.stringify(settings))
})
</script>

<style scoped src="../assets/view/setting.css"></style>
