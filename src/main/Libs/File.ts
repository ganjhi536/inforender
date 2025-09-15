import * as fs from 'fs'
import * as path from 'path'
//这里是Main文件夹下的Libs文件夹下的File.ts 用于文件操作
// showOpenDialog 用于显示打开文件对话框
export const FrRead = async (filePath: string): Promise<{ fileName: string; value: string }> => {
  const fileName: string = path.basename(filePath)
  const value: string = await fs.promises.readFile(filePath, 'utf-8')
  return { fileName, value }
}
export const FrSave = async (filePath: string, content: string): Promise<void> => {
  // 异步写入文件内容，使用UTF-8编码
  await fs.promises.writeFile(filePath, content, 'utf-8')
}
