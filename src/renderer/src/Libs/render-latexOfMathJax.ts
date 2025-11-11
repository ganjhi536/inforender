//这个文件使用mathjax来适配渲染latex
import { mathjax } from 'mathjax-full/js/mathjax.js'
import { TeX } from 'mathjax-full/js/input/tex.js'
import { SVG } from 'mathjax-full/js/output/svg.js'
import { LiteAdaptor } from 'mathjax-full/js/adaptors/liteAdaptor.js'
interface MathjaxInit {
  adaptor: any
  html: any
}
const mathjaxInit = (latexDocument: string): MathjaxInit => {
  const adaptor = new LiteAdaptor()
  const tex = new TeX()
  const svg = new SVG()
  const html = mathjax.document(latexDocument, { InputJax: tex, OutputJax: svg })
  return {
    adaptor,
    html
  }
}
export const renderLatexOfMathJax = (latexDocument: string): string => {
  const { adaptor, html } = mathjaxInit(latexDocument)
  html.render()
  const result = adaptor.outerHTML(html.document)
  return result
}
