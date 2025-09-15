import DOMPurify from 'dompurify'
import { hasLatexFormulas, renderLatexFormulas } from './Lib'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css' // 或者选择其他样式
// 渲染JSON
export const renderJSON = (content: string): string => {
  try {
    const parsed = JSON.parse(content)
    const formatted = JSON.stringify(parsed, null, 2)
    const highlighted = hljs.highlight(formatted, { language: 'json' }).value
    return `<pre class="hljs">${highlighted}</pre>`
  } catch {
    return `<pre>${DOMPurify.sanitize(content)}</pre>`
  }
}
export const renderHTMLEnhanced = (content: string, enableLatex = false): string => {
  const sanitized = DOMPurify.sanitize(content)
  return enableLatex && hasLatexFormulas(content) ? renderLatexFormulas(sanitized) : sanitized
}

export const renderTextEnhanced = (content: string, enableLatex = false): string => {
  const escaped = DOMPurify.sanitize(content)
  const wrappedContent = `<pre>${escaped}</pre>`
  return enableLatex && hasLatexFormulas(content)
    ? renderLatexFormulas(wrappedContent)
    : wrappedContent
}
