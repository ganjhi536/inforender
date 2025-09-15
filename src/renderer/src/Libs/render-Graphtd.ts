import DOMPurify from 'dompurify'
import mermaid from 'mermaid'
export const renderGraphTD = async (content: string): Promise<string> => {
  try {
    // 检查内容是否包含有效的mermaid语法
    if (!content.trim()) {
      return '<div class="mermaid-placeholder">请输入有效的Mermaid图表代码</div>'
    }

    // 创建一个临时div用于mermaid渲染
    const { svg } = await mermaid.render('mermaid-container', content)
    return svg
  } catch (error) {
    console.error('Mermaid渲染错误:', error)
    return `
      <div class="mermaid-error">
        <p>图表渲染错误: ${error instanceof Error ? error.message : String(error)}</p>
        <pre>${DOMPurify.sanitize(content)}</pre>
      </div>
    `
  }
}
