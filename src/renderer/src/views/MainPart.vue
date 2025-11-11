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
import { onMounted, watch } from 'vue'
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
// 导入从MainPart.ts导出的函数和变量
import mainPart from './script/MainPart'

// 使用从MainPart.ts导入的函数和变量
const {
  files,
  activeFileId,
  activeFile,
  renderMode,
  RenderType,
  previewContent,
  selectFile,
  closeFile,
  openFile,
  newFile,
  saveFile,
  saveAs,
  saveAll,
  search,
  handleInput,
  updatePreview,
  loadFileIndex
} = mainPart

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

//保存file索引数据到本地文件夹下
watch(
  files,
  (newFiles) => {
    window.api.FrSave('fileIndex.json', JSON.stringify(newFiles))
  },
  { deep: true }
)

onMounted(() => {
  updatePreview()
  loadFileIndex()
})
</script>
<style scoped src="@view/style/MainPart.css"></style>
