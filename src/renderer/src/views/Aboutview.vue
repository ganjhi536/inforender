<template>
  <div class="about-container">
    <!-- 标题区域 -->
    <div class="header-section">
      <h1 class="app-title">Inforender</h1>
      <p class="app-subtitle">多功能实时渲染预览工具</p>
    </div>

    <!-- 基本信息区域 -->
    <div class="info-section">
      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">版本:</span>
          <span class="info-value">v1.0.1</span>
        </div>
        <div class="info-item">
          <span class="info-label">构建日期:</span>
          <span class="info-value">2025/8/30</span>
        </div>
        <div class="info-item">
          <span class="info-label">作者:</span>
          <span class="info-value">HAcreative</span>
        </div>
        <div class="info-item">
          <span class="info-label">许可证:</span>
          <span class="info-value">MIT License</span>
        </div>
      </div>
    </div>

    <!-- 功能支持区域 -->
    <div class="features-section">
      <h3 class="section-title">支持格式</h3>
      <div class="features-grid">
        <div v-for="(feature, index) in features" :key="index" class="feature-item">
          <span class="feature-tag">{{ feature }}</span>
        </div>
      </div>
    </div>

    <!-- 依赖库区域 -->
    <div class="dependencies-section">
      <h3 class="section-title">依赖库</h3>
      <div class="dependencies-grid">
        <div v-for="(dep, index) in dependencies" :key="index" class="dependency-item">
          <span class="dependency-name">{{ dep.name }}</span>
          <span class="dependency-version">{{ dep.version }}</span>
        </div>
      </div>
    </div>

    <!-- 链接区域 -->
    <div class="links-section">
      <button
        class="github-link"
        @click="openExternal('https://github.com/ganjhi536/inforender.git')"
      >
        <span class="link-icon">🔗</span>
        访问GitHub主页
      </button>
      <p class="support-text">技术支持与反馈请通过GitHub Issues提交</p>
    </div>

    <!-- 版权信息 -->
    <div class="footer-section">
      <p class="copyright">Copyright © 2025 HAcreative. All rights reserved.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 功能列表
const features = ref(['markdown', 'html', 'json', 'GraphTD', 'text', 'Latex'])

// 依赖库列表
const dependencies = ref([
  { name: 'dompurify', version: '^3.2.6' },
  { name: 'highlight.js', version: '^11.11.1' },
  { name: 'marked', version: '^16.2.1' },
  { name: 'mermaid', version: '^11.11.0' },
  { name: 'pinia', version: '^3.0.3' },
  { name: 'vue-router', version: '^4.5.1' }
])

// 打开外部链接
const openExternal = (url: string): void => {
  window.open(url, '_blank')
}
</script>

<style scoped>
.about-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 24px;
  background-color: #37373d;
  color: #e0e0e0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  box-sizing: border-box;
}

.header-section {
  text-align: center;
  margin-bottom: 32px;
  padding: 16px;
  background-color: #2c2c30;
  border-radius: 4px;
}

.app-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 8px 0;
}

.app-subtitle {
  font-size: 1.1rem;
  color: #a0a0a0;
  margin: 0;
}

.info-section {
  margin-bottom: 24px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: #2c2c30;
  border-radius: 4px;
}

.info-label {
  font-weight: 600;
  color: #b0b0b0;
}

.info-value {
  color: #e0e0e0;
}

.features-section,
.dependencies-section {
  margin-bottom: 24px;
  padding: 16px;
  background-color: #2c2c30;
  border-radius: 4px;
}

.section-title {
  font-size: 1.2rem;
  color: #f0f0f0;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #444;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
}

.feature-item {
  text-align: center;
}

.feature-tag {
  display: inline-block;
  padding: 6px 12px;
  background-color: #44444a;
  color: #d0d0d0;
  border-radius: 16px;
  font-size: 0.9rem;
}

.dependencies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}

.dependency-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  background-color: #44444a;
  border-radius: 4px;
}

.dependency-name {
  color: #d0d0d0;
}

.dependency-version {
  color: #a0a0a0;
  font-family: monospace;
}

.links-section {
  text-align: center;
  margin-bottom: 24px;
  padding: 16px;
  background-color: #2c2c30;
  border-radius: 4px;
}

.github-link {
  display: inline-flex;
  align-items: center;
  background-color: #44444a;
  color: #e0e0e0;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 12px;
  transition: background-color 0.2s;
}

.github-link:hover {
  background-color: #4a4a50;
}

.link-icon {
  margin-right: 8px;
}

.support-text {
  color: #a0a0a0;
  font-size: 0.9rem;
  margin: 0;
}

.footer-section {
  text-align: center;
  padding: 16px;
  background-color: #2c2c30;
  border-radius: 4px;
}

.copyright {
  color: #888;
  font-size: 0.9rem;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .about-container {
    padding: 16px;
  }

  .app-title {
    font-size: 2rem;
  }

  .info-grid,
  .features-grid,
  .dependencies-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .about-container {
    padding: 12px;
  }

  .app-title {
    font-size: 1.8rem;
  }

  .app-subtitle {
    font-size: 1rem;
  }
}
</style>
