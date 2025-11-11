// TypeScript路径映射类型声明
// 解决 '@libs/Lib' 模块解析问题

declare module '@libs/Lib' {
  export const renderLatexContent: (content: string) => string
  export const renderGraphTD: (content: string) => Promise<string>
  export const renderJSON: (content: string) => string
  export const renderMarkdownEnhanced: (content: string, latexEnabled?: boolean) => Promise<string>
  export const renderTextEnhanced: (content: string, enableLatex?: boolean) => string
  export const renderHTMLEnhanced: (content: string, enableLatex?: boolean) => string
}
