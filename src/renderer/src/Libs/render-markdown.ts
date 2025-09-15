import { marked } from 'marked'
import mermaid from 'mermaid'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import { renderLatexFormulas, hasLatexFormulas } from './Lib'

// 扩展 marked 类型以包含 highlight 选项
declare module 'marked' {
  interface MarkedOptions {
    highlight?: (code: string, lang: string) => string
  }
}

// 配置 marked 使用 highlight.js 进行代码高亮
marked.setOptions({
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value
      } catch (err) {
        console.error('代码高亮错误:', err)
      }
    }

    // 如果没有指定语言或语言不被支持，使用自动检测
    try {
      return hljs.highlightAuto(code).value
    } catch (err) {
      console.error('自动代码高亮错误:', err)
      return code
    }
  },
  breaks: true,
  gfm: true
})

/**
 * 渲染增强的 Markdown 内容（支持 LaTeX、Mermaid 和代码高亮）
 * @param content - Markdown 文本内容
 * @param latexEnabled - 是否启用 LaTeX 渲染
 * @returns 渲染后的 HTML 字符串
 */
export const renderMarkdownEnhanced = async (
  content: string,
  latexEnabled: boolean = true
): Promise<string> => {
  try {
    // 1. 预处理 Mermaid 代码块
    const mermaidProcessedContent = content.replace(
      /```mermaid\s*([\s\S]*?)```/gi,
      (_, code: string) => {
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
        return `<div class="mermaid-container" data-mermaid-id="${id}">${code.trim()}</div>`
      }
    )

    // 2. 使用 marked 渲染 Markdown
    const renderedMarkdown = await marked.parse(mermaidProcessedContent, {
      async: true
    })

    // 3. 处理 LaTeX 数学公式（如果启用）
    let finalContent = renderedMarkdown
    if (latexEnabled && hasLatexFormulas(finalContent)) {
      finalContent = renderLatexFormulas(finalContent)
    }

    // 4. 异步渲染 Mermaid 图表（需要在 DOM 加载后执行）
    setTimeout(() => {
      const containers = document.querySelectorAll('.mermaid-container')
      containers.forEach(async (container) => {
        const code = container.textContent
        if (code) {
          try {
            // 使用新的 mermaid API，它返回一个 Promise
            const { svg } = await mermaid.render(
              container.getAttribute('data-mermaid-id') || 'mermaid',
              code
            )
            container.innerHTML = svg
          } catch (error) {
            container.innerHTML = `
              <div class="mermaid-error">
                <p>Mermaid 渲染错误: ${error instanceof Error ? error.message : String(error)}</p>
                <pre>${code}</pre>
              </div>
            `
          }
        }
      })
    }, 0)

    return finalContent // 直接返回渲染后的内容，不使用 DOMPurify
  } catch (error) {
    console.error('Markdown 渲染错误:', error)
    return `
      <div class="markdown-error">
        <h4>Markdown 渲染错误</h4>
        <p>${error instanceof Error ? error.message : String(error)}</p>
        <pre>${content}</pre>
      </div>
    `
  }
}
