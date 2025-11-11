//这个store用来保存所有的设置

import { defineStore } from 'pinia'
import { reactive } from 'vue'

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

export const useSettingStore = defineStore('setting', () => {
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
  return {
    settings
  }
})
