<template>
  <div class="sidebar-container">
    <div class="nav-bar">
      <router-link
        v-for="item in navItems"
        :key="item.name"
        :to="item.path"
        class="nav-item"
        active-class="active"
      >
        <el-tooltip effect="dark" :content="item.tooltip" placement="right">
          <el-icon :size="24">
            <component :is="item.icon" />
          </el-icon>
        </el-tooltip>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Document as FileIcon,
  Setting as SettingIcon,
  InfoFilled as AboutIcon
} from '@element-plus/icons-vue'

const navItems = ref([
  {
    name: 'file',
    path: '/',
    icon: FileIcon,
    tooltip: '文件编辑'
  },
  {
    name: 'setting',
    path: '/setting',
    icon: SettingIcon,
    tooltip: '设置'
  },
  {
    name: 'about',
    path: '/about',
    icon: AboutIcon,
    tooltip: '关于'
  }
])
</script>

<style scoped>
.sidebar-container {
  --sidebar-width: 48px;
  --sidebar-bg-color: #252526;
  --item-hover-bg: #2a2d2e;
  --item-active-bg: #37373d;
  --item-active-border: #007acc;
  --icon-color: #cccccc;
  --icon-active-color: #ffffff;

  margin-top: 40px;
  width: var(--sidebar-width);
  height: 100vh;
  background-color: var(--sidebar-bg-color);
}

.nav-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 12px;
}

.nav-item {
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--icon-color);
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: var(--item-hover-bg);
  }

  &.active {
    color: var(--icon-active-color);
    background-color: var(--item-active-bg);
    border-left: 2px solid var(--item-active-border);
  }
}

.el-icon {
  transition: color 0.2s ease-in-out;
}
</style>
