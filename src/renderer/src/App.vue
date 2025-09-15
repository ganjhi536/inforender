<script setup lang="ts">
import LeftGuide from './components/LeftGuide.vue'
import TopGuide from './components/TopGuide.vue'
</script>

<template>
  <TopGuide id="topGuide"></TopGuide>
  <LeftGuide id="leftGuide" />
  <router-view id="mainContent" />
</template>

<style scoped>
#topGuide {
  position: fixed; /* 使用fixed而非absolute确保始终在顶部 */
  top: 0;
  left: 0;
  width: 100%;
  height: 40px; /* 明确设置高度 */
  margin: 0;
  padding: 0;
  z-index: 1000;
}

#leftGuide {
  position: fixed;
  top: 0px; /* 直接使用top定位，而不是margin-top */
  left: 0;
  width: 48px;
  height: calc(100vh - 40px); /* 使用视口高度计算 */
  overflow: hidden;
}

#mainContent {
  position: fixed;
  top: 40px;
  left: 48px;
  width: calc(100vw - 48px);
  height: calc(100vh - 40px);
  overflow: auto; /* 允许内容区域滚动 */
}

/* 隐藏滚动条但保留滚动功能 */
#mainContent::-webkit-scrollbar {
  width: 0;
  height: 0;
  background: transparent;
}
</style>

<style>
/* 全局样式 */
body {
  margin: 0;
  padding: 0;
  overflow: hidden; /* 禁止全局滚动 */
  background-color: #000000;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

/* 隐藏所有滚动条 */
::-webkit-scrollbar {
  display: none;
}

* {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}
</style>
