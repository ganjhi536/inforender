import DOMPurify from 'dompurify'
import { renderToString } from 'katex'

// ==================== LaTeX渲染工具函数 ====================

/**
 * 渲染单个数学公式
 * @param formula 数学公式字符串
 * @param displayMode 是否为块级公式
 * @returns 渲染后的HTML字符串
 */
const renderMathFormula = (formula: string, displayMode = false): string => {
  try {
    return renderToString(formula.trim(), { displayMode })
  } catch (error) {
    console.error(`公式渲染失败: ${formula}`, error)
    return `<span class="latex-error">公式渲染错误: ${DOMPurify.sanitize(formula)}</span>`
  }
}

/**
 * 检查内容是否包含LaTeX数学公式
 * @param content 要检查的内容
 * @returns 是否包含LaTeX公式
 */
export const hasLatexFormulas = (content: string): boolean => {
  const latexPatterns = [
    /\\\([^]*?\\\)/, // 匹配 \( ... \)
    /\\\[[^]*?\\\]/, // 匹配 \[ ... \]
    /\$[^$]+\$/, // 匹配 $ ... $
    /\$\$[^]*?\$\$/ // 匹配 $$ ... $$
  ]
  return latexPatterns.some((pattern) => pattern.test(content))
}

// 存储已处理的公式，避免重复渲染
const processedFormulas = new Set<string>()

/**
 * 渲染LaTeX数学公式（确保不重复处理）
 * @param content 包含LaTeX公式的内容
 * @returns 渲染后的HTML字符串
 */
export const renderLatexFormulas = (content: string): string => {
  // 重置已处理的公式集合
  processedFormulas.clear()

  let processedContent = content

  // 使用函数处理替换，避免重复渲染
  const processFormula = (match: string, formula: string, isBlock: boolean): string => {
    // 检查是否已经处理过这个公式
    const formulaKey = `${isBlock ? 'block:' : 'inline:'}${formula}`
    if (processedFormulas.has(formulaKey)) {
      return match
    }

    processedFormulas.add(formulaKey)

    // 检查是否已经是KaTeX渲染的结果
    if (match.includes('katex') || match.includes('katex-display')) {
      return match
    }

    return renderMathFormula(formula, isBlock)
  }

  // 按特定顺序渲染各种类型的公式（从最具体到最一般）
  // 1. 渲染双美元符号公式 $$ ... $$
  processedContent = processedContent.replace(
    /\$\$([\s\S]*?)\$\$/g,
    (match: string, formula: string) => processFormula(match, formula, true)
  )

  // 2. 渲染块级公式 \[ ... \]
  processedContent = processedContent.replace(
    /\\\[([\s\S]*?)\\\]/g,
    (match: string, formula: string) => processFormula(match, formula, true)
  )

  // 3. 渲染行内公式 \( ... \)
  processedContent = processedContent.replace(
    /\\\(([\s\S]*?)\\\)/g,
    (match: string, formula: string) => processFormula(match, formula, false)
  )

  // 4. 渲染美元符号公式 $ ... $
  processedContent = processedContent.replace(/\$([^$]+?)\$/g, (match: string, formula: string) =>
    processFormula(match, formula, false)
  )

  return processedContent
}

// ==================== LaTeX文档结构处理 ====================

/**
 * 处理LaTeX算法环境
 * @param content 包含算法环境的内容
 * @returns 处理后的内容
 */
const processAlgorithmEnvironments = (content: string): string => {
  return content.replace(
    /\\begin\{algorithm\}([\s\S]*?)\\end\{algorithm\}/g,
    (_match: string, algorithmContent: string) => processAlgorithmicEnvironment(algorithmContent)
  )
}

/**
 * 处理 algorithmic 环境
 * @param content algorithmic环境内容
 * @returns 处理后的HTML
 */
const processAlgorithmicEnvironment = (content: string): string => {
  let title = ''
  const contentWithoutCaption = content.replace(
    /\\caption\{(.*?)\}/g,
    (_match: string, caption: string) => {
      title = caption
      return ''
    }
  )

  return contentWithoutCaption.replace(
    /\\begin\{algorithmic\}(\[.*?\])?([\s\S]*?)\\end\{algorithmic\}/g,
    (_match: string, _options: string, algorithmicContent: string) =>
      renderAlgorithmicContent(algorithmicContent, title)
  )
}

/**
 * 渲染 algorithmic 内容
 * @param content algorithmic内容
 * @param title 算法标题
 * @returns 渲染后的HTML
 */
const renderAlgorithmicContent = (content: string, title: string): string => {
  const lines = content.split('\n').filter((line) => line.trim() !== '')
  let html = `<div class="algorithm-container">`

  if (title) {
    html += `<div class="algorithm-title">算法: ${DOMPurify.sanitize(title)}</div>`
  }

  html += `<div class="algorithm-content">`

  for (const line of lines) {
    const processedLine = line
      .replace(/\\State\s*/g, '')
      .replace(/\\While\{(.*?)\}/g, '<strong>while</strong> ($1)')
      .replace(/\\For\{(.*?)\}/g, '<strong>for</strong> ($1)')
      .replace(/\\If\{(.*?)\}/g, '<strong>if</strong> ($1)')
      .replace(/\\Else/g, '<strong>else</strong>')
      .replace(/\\Return\s*(.*)/g, '<strong>return</strong> $1')
      .replace(/\\Ensure\s*(.*)/g, '<strong>ensure</strong> $1')
      .replace(/\\Require\s*(.*)/g, '<strong>require</strong> $1')
      .replace(/\\Comment\{(.*?)\}/g, '<span class="algorithm-comment">// $1</span>')

    html += `<div class="algorithm-line">${DOMPurify.sanitize(processedLine)}</div>`
  }

  html += `</div></div>`
  return html
}

/**
 * 处理LaTeX文档结构（不处理公式）
 * @param content LaTeX文档内容
 * @returns 处理后的HTML字符串
 */
const processLatexDocumentStructure = (content: string): string => {
  let processedContent = content

  // 移除LaTeX元数据
  const latexMetadataPatterns = [
    /\\documentclass\{.*?\}\s*/g,
    /\\usepackage\{.*?\}\s*/g,
    /\\begin\{document\}/g,
    /\\end\{document\}/g,
    /\\title\{.*?\}/g,
    /\\author\{.*?\}/g,
    /\\maketitle/g
  ]

  latexMetadataPatterns.forEach((pattern) => {
    processedContent = processedContent.replace(pattern, '')
  })

  // 处理章节结构
  processedContent = processedContent
    .replace(/\\section\{(.*?)\}/g, '<h2>$1</h2>')
    .replace(/\\subsection\{(.*?)\}/g, '<h3>$1</h3>')
    .replace(/\\subsubsection\{(.*?)\}/g, '<h4>$1</h4>')

  // 处理算法环境
  processedContent = processAlgorithmEnvironments(processedContent)

  // 处理文本格式
  const textFormatPatterns = [
    [/\\textbf\{(.*?)\}/g, '<strong>$1</strong>'],
    [/\\textit\{(.*?)\}/g, '<em>$1</em>'],
    [/\\texttt\{(.*?)\}/g, '<code>$1</code>'],
    [/\\emph\{(.*?)\}/g, '<em>$1</em>']
  ] as const

  textFormatPatterns.forEach(([pattern, replacement]) => {
    processedContent = processedContent.replace(pattern, replacement)
  })

  return DOMPurify.sanitize(processedContent)
}

/**
 * 渲染完整的LaTeX文档
 * @param content LaTeX文档内容
 * @returns 渲染后的HTML字符串
 */
const renderFullLatexDocument = (content: string): string => {
  // 先处理文档结构（不处理公式）
  let processedContent = processLatexDocumentStructure(content)

  // 然后渲染数学公式（只渲染一次）
  processedContent = renderLatexFormulas(processedContent)

  // 最后包装成文档容器
  return `<div class="latex-document">${processedContent}</div>`
}

// ==================== 智能渲染器 ====================

/**
 * 智能LaTeX渲染器
 * @param content LaTeX内容
 * @returns 渲染后的HTML
 */
export const renderLatexContent = (content: string): string => {
  const isFullDocument = /\\documentclass|\\begin\{document\}|\\section|\\begin\{algorithm\}/.test(
    content
  )
  return isFullDocument ? renderFullLatexDocument(content) : renderLatexFormulas(content)
}
