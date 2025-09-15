import tseslint from '@electron-toolkit/eslint-config-ts' // 引入 Electron Toolkit 提供的 TypeScript ESLint 配置
import eslintConfigPrettier from '@electron-toolkit/eslint-config-prettier' // 引入 Prettier 的 ESLint 配置，用于解决 Prettier 和 ESLint 的冲突
import eslintPluginVue from 'eslint-plugin-vue' // 引入 Vue 的 ESLint 插件，用于检查 Vue 文件
import vueParser from 'vue-eslint-parser' // 引入 Vue 的解析器，用于解析 .vue 文件

export default tseslint.config(
  // 配置 ESLint 的忽略规则
  { ignores: ['**/node_modules', '**/dist', '**/out'] }, // 忽略 node_modules、dist 和 out 文件夹

  // 使用 Electron Toolkit 提供的推荐 TypeScript 配置
  tseslint.configs.recommended,

  // 使用 Vue 插件的推荐配置
  eslintPluginVue.configs['flat/recommended'],

  // 针对 .vue 文件的额外配置
  {
    files: ['**/*.vue'], // 仅应用于 .vue 文件
    languageOptions: {
      parser: vueParser, // 使用 vue-eslint-parser 解析器
      parserOptions: {
        ecmaFeatures: {
          jsx: true // 支持 JSX 语法
        },
        extraFileExtensions: ['.vue'], // 额外支持 .vue 文件扩展名
        parser: tseslint.parser // 使用 TypeScript 的解析器
      }
    }
  },

  // 针对 TypeScript 和 Vue 文件的规则配置
  {
    files: ['**/*.{ts,mts,tsx,vue}'], // 应用于 .ts、.mts、.tsx 和 .vue 文件
    rules: {
      'vue/require-default-prop': 'off', // 关闭 Vue 组件 props 默认值的强制要求
      'vue/multi-word-component-names': 'off', // 关闭 Vue 组件名称必须为多词的规则
      'vue/no-v-html': 'off', // 关闭 v-html 使用警告
      'vue/block-lang': [
        'error', // 强制 .vue 文件的 <script> 标签使用指定语言
        {
          script: {
            lang: 'ts' // 要求 <script> 标签使用 TypeScript
          }
        }
      ]
    }
  },

  // 使用 Prettier 的配置，确保代码格式化规则与 Prettier 一致
  eslintConfigPrettier
)
