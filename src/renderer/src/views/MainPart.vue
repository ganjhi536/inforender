<template>
  <div class="editor-container">
    <!-- 左侧文件索引栏 -->
    <div class="sidebar">
      <div class="file-actions">
        <!-- 改为3x2排列的6个按钮 -->
        <div class="button-grid">
          <el-button class="action-btn" @click="openFile">
            <el-icon><FolderOpened /></el-icon>
            <span>打开文件</span>
          </el-button>
          <el-button class="action-btn" @click="newFile">
            <el-icon><DocumentAdd /></el-icon>
            <span>新建文件</span>
          </el-button>
          <el-button class="action-btn" @click="saveFile">
            <el-icon><Check /></el-icon>
            <span>保存</span>
          </el-button>
          <el-button class="action-btn" @click="saveAs">
            <el-icon><CopyDocument /></el-icon>
            <span>另存为</span>
          </el-button>
          <el-button class="action-btn" @click="saveAll">
            <el-icon><Collection /></el-icon>
            <span>保存全部</span>
          </el-button>
          <el-button class="action-btn" @click="search">
            <el-icon><Search /></el-icon>
            <span>搜索</span>
          </el-button>
        </div>
      </div>
      <div class="file-list">
        <!-- 文件列表 -->
        <div
          v-for="filelist in files"
          :key="filelist.id"
          :class="['file-item', { active: activeFileId === filelist.id }]"
          @click="selectFile(filelist.id)"
        >
          <!-- 文件图标 -->
          <el-icon><Document /></el-icon>
          <!-- 文件名 -->
          <span class="file-name">{{ filelist.name }}</span>
          <!-- 关闭文件按钮 -->
          <el-icon class="close-icon" @click.stop="closeFile(filelist.id)"><Close /></el-icon>
        </div>
      </div>
    </div>

    <!-- 中间编辑区域 -->
    <div class="editor-panel">
      <!-- 文本编辑器 -->
      <textarea
        v-if="activeFile"
        v-model="activeFile.content"
        class="text-editor"
        placeholder="在此输入内容..."
        @input="handleInput"
      ></textarea>
      <!-- 空编辑器提示 -->
      <div v-else class="empty-editor">
        <el-icon><Document /></el-icon>
        <p>请选择或创建一个文件</p>
      </div>
    </div>

    <!-- 右侧预览区域 -->
    <div class="preview-panel">
      <div class="preview-header">
        <h3>预览</h3>
        <!-- 渲染模式选择 -->-
        <el-select v-model="renderMode" class="render-select" @change="updatePreview()">
          <el-option v-for="item in RenderType" :key="item" :label="item" :value="item" />
        </el-select>
      </div>
      <!-- 预览内容 -->
      <div class="preview-content" v-html="previewContent"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
/*
 *any作为类型标记在本项目中不可使用
 *
 *
 *
 *
 *
 *
 */
import { ref, computed, onMounted, watch } from 'vue'
import {
  Document,
  FolderOpened,
  Close,
  DocumentAdd,
  Check,
  CopyDocument,
  Collection,
  Search
} from '@element-plus/icons-vue'
import mermaid from 'mermaid'
//导入Lib内渲染方法
import {
  renderLatexContent,
  renderGraphTD,
  renderJSON,
  renderMarkdownEnhanced,
  renderTextEnhanced,
  renderHTMLEnhanced
} from '../Libs/Lib'
import { ElMessageBox } from 'element-plus'
//导入DOMPurify用于XSS防护
import DOMPurify from 'dompurify'
// 初始化mermaid配置
mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  flowchart: {
    useMaxWidth: false,
    htmlLabels: true,
    curve: 'basis'
  }
})

// 文件数据接口
interface File {
  id: number
  name: string
  content: string
  filePath: string
}

// 打开文件时返回的对象声明
interface FileData {
  path: string
  value: string
  name: string
}

interface SaveResult {
  success: boolean
  filePath?: string // 可选属性，表示文件路径
}
const files = ref<File[]>([])
const activeFileId = ref<number | null>(null)
const activeFile = computed(() => {
  return files.value.find((file) => file.id === activeFileId.value) || null
})

// 渲染模式和预览内容
const renderMode = ref<string | null>('text')
const RenderType = ref<Array<string> | null>([
  'markdown',
  'html',
  'json',
  'GraphTD',
  'text',
  'Latex'
])

const previewContent = ref('')
const latexEnabled = ref<boolean>()
//保存file索引数据到本地文件夹下
watch(
  files,
  (newFiles) => {
    window.api.FrSave('fileIndex.json', JSON.stringify(newFiles))
  },
  { deep: true }
)
// 选择文件
const selectFile = (id: number): void => {
  activeFileId.value = id
  updatePreview()
}

// 关闭文件
const closeFile = (id: number): void => {
  const index = files.value.findIndex((file) => file.id === id)
  if (index !== -1) {
    files.value.splice(index, 1)
    if (activeFileId.value === id) {
      activeFileId.value = files.value.length > 0 ? files.value[0].id : null
    }
  }
}

// 打开文件
const openFile = async (): Promise<void> => {
  try {
    const fileData = (await window.api.openFile()) as FileData | null
    if (!fileData) return

    const newFileId = Math.max(...files.value.map((f) => f.id), 0) + 1
    files.value.push({
      id: newFileId,
      name: fileData.name,
      content: fileData.value,
      filePath: fileData.path
    })
    selectFile(newFileId)
  } catch (error) {
    console.error('打开文件失败:', error)
  }
}

// 新建文件
const newFile = (): void => {
  const newFileId = Math.max(...files.value.map((f) => f.id), 0) + 1
  files.value.push({
    id: newFileId,
    name: `新文件${newFileId}`,
    content: '',
    filePath: ''
  })
  selectFile(newFileId)
}

//当前保存文件功能
const saveFile = (): void => {
  if (activeFile.value) {
    if (activeFile.value.filePath) {
      window.api
        .FrSave(activeFile.value.filePath, activeFile.value.content)
        .then(() => {
          ElMessageBox.alert('文件已成功保存！', '提示', {
            confirmButtonText: '确定',
            type: 'success'
          })
        }) //如果没有路径说明保存失败 那就调用另存为
        .catch((error) => {
          console.error('保存文件失败:', error)
          ElMessageBox.alert(
            `保存文件失败: ${error instanceof Error ? error.message : String(error)}`,
            '错误',
            {
              confirmButtonText: '确定',
              type: 'error'
            }
          )
          //调用另存为
          saveAs()
        })
    } else {
      // 如果没有文件路径，提示用户另存为
      ElMessageBox.alert('请使用“另存为”功能来保存新文件。', '提示', {
        confirmButtonText: '确定',
        type: 'info'
      })
      saveAs()
    }
  }
}

// 另存为功能
const saveAs = (): void => {
  //FrFileSave 被定义为保存文件的函数 输入文件名 保存完 返回一个对象
  if (activeFile.value) {
    window.api
      .FrFileSave(activeFile.value.name)
      .then((result: SaveResult) => {
        if (result.success && result.filePath) {
          // 更新文件路径
          activeFile.value!.filePath = result.filePath
          // 保存文件内容
          return window.api.FrSave(result.filePath, activeFile.value!.content)
        } else {
          throw new Error('另存为操作被取消或失败。')
        }
      })
      .then(() => {
        ElMessageBox.alert('文件已成功保存！', '提示', {
          confirmButtonText: '确定',
          type: 'success'
        })
      })
      .catch((error) => {
        console.error('另存为失败:', error)
        ElMessageBox.alert(
          `另存为失败: ${error instanceof Error ? error.message : String(error)}`,
          '错误',
          {
            confirmButtonText: '确定',
            type: 'error'
          }
        )
      })
  }
}

// 保存全部功能
const saveAll = (): void => {
  //对所有文件遍历一次保存 调用saveFile
  files.value.forEach((file) => {
    activeFileId.value = file.id
    saveFile()
  })
}

// TODO 搜索功能 (未实现)
const search = (): void => {
  console.log('搜索功能')
}

// ==================== 主预览函数 ====================

const handleInput = (event: Event): void => {
  if (activeFile.value && event.target) {
    const target = event.target as HTMLTextAreaElement
    activeFile.value.content = target.value
    updatePreview()
  }
}

const updatePreview = async (): Promise<void> => {
  if (!activeFile.value) {
    previewContent.value = ''
    return
  }

  try {
    const content = activeFile.value.content
    let renderedContent = ''

    switch (renderMode.value) {
      case 'markdown':
        renderedContent = await renderMarkdownEnhanced(content, latexEnabled.value)
        break
      case 'html':
        renderedContent = renderHTMLEnhanced(content, latexEnabled.value)
        break
      case 'json':
        renderedContent = renderJSON(content)
        break
      case 'GraphTD':
        renderedContent = await renderGraphTD(content)
        break
      case 'text':
        renderedContent = renderTextEnhanced(content, latexEnabled.value)
        break
      case 'Latex':
        renderedContent = renderLatexContent(content)
        break
      default:
        renderedContent = renderTextEnhanced(content, latexEnabled.value)
    }

    previewContent.value = renderedContent
  } catch (error) {
    console.error('预览渲染错误:', error)
    previewContent.value = `
      <div class="preview-error">
        <h4>渲染错误</h4>
        <p>${error instanceof Error ? error.message : String(error)}</p>
        <pre>${DOMPurify.sanitize(activeFile.value?.content || '')}</pre>
      </div>
    `
  }
}

// 初始化
//初始化时尝试加载本地文件索引
const loadFileIndex = async (): Promise<void> => {
  try {
    // 用FrRead读取本地文件索引 因为保存时直接保存所以不需要解析
    console.log(window.api)
    const data = await window.api.FrRead('fileIndex.json')
    const ArratData = JSON.parse(data.value as string) as File[]
    files.value = ArratData
    //检查一遍所有文件是否改变或者被删除
    for (let i = files.value.length - 1; i >= 0; i--) {
      const file = files.value[i]
      if (file.filePath) {
        try {
          const fileContent = await window.api.FrRead(file.filePath)
          file.content = fileContent.value as string
        } catch {
          // 文件不存在或无法读取,先给出Element-Plus弹窗提示询问是否要删除文件索引或者保留
          // 我们希望是黑色的暗色模式
          const confirm = await ElMessageBox.confirm(
            `文件 "${file.name}" 不存在或无法读取。是否从列表中删除该文件？`,
            '文件丢失',
            {
              confirmButtonText: '删除',
              cancelButtonText: '保留',
              type: 'warning',
              center: true,
              showClose: false,
              customClass: 'dark-message-box'
            }
          )
            .then(() => 0)
            .catch(() => 1)
          //如果用户选择删除
          if (confirm === 0) {
            files.value.splice(i, 1)
          }
        }
      }
    }
  } catch (error) {
    console.error('加载文件索引失败:', error)
  }
}
onMounted(() => {
  updatePreview()
  loadFileIndex()
})
</script>
<style scoped src="../assets/view/Mainpart.css"></style>
