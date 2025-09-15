import { ipcMain, BrowserWindow, dialog } from 'electron'
import { FrRead } from './Libs/Libs'
// 监听IPC事件并处理窗口操作
ipcMain.on('Close', () => {
  const windows = BrowserWindow.getAllWindows()
  if (windows.length > 0) {
    windows[0].close() // 关闭第一个窗口
  }
})
ipcMain.on('Minimize', () => {
  const windows = BrowserWindow.getAllWindows()
  if (windows.length > 0) {
    windows[0].minimize() // 最小化第一个窗口
  }
})
ipcMain.on('Maximize', () => {
  const windows = BrowserWindow.getAllWindows()
  if (windows.length > 0) {
    const win = windows[0]
    win.maximize() // 否则最大化窗口
    win.webContents.send('window-state-changed', 'maximized')
  }
})
ipcMain.on('Restore', () => {
  const windows = BrowserWindow.getAllWindows()
  if (windows.length > 0) {
    const win = windows[0]
    win.restore() // 恢复窗口状态
    win.webContents.send('window-state-changed', 'restored')
  }
})
ipcMain.on('Search', (event, searchText) => {
  console.log('搜索内容:', searchText, event)
  // 在这里处理搜索逻辑
})
ipcMain.on('Copy', () => {
  const windows = BrowserWindow.getAllWindows()
  if (windows.length > 0) {
    const win = windows[0]
    win.webContents.copy() // 复制当前窗口内容
  }
})
ipcMain.on('Paste', () => {
  const windows = BrowserWindow.getAllWindows()
  if (windows.length > 0) {
    const win = windows[0]
    win.webContents.paste() // 粘贴到当前窗口
  }
})
ipcMain.on('Cut', () => {
  const windows = BrowserWindow.getAllWindows()
  if (windows.length > 0) {
    const win = windows[0]
    win.webContents.cut() // 剪切当前窗口内容
  }
})
// 处理渲染进程发送的 'openFile' 异步请求
ipcMain.handle('openFile', async () => {
  // 显示文件选择对话框
  const result = await dialog.showOpenDialog({
    properties: [
      'openFile', // 允许选择文件
      'showHiddenFiles', // 显示隐藏文件
      'createDirectory' // 允许创建目录（在某些系统中）
    ]
  })
  if (result.canceled || result.filePaths.length === 0) {
    return null // 返回null表示没有选择文件
  }
  console.log(result)
  // 获取用户选择的第一个文件路径
  const filePath: string = result.filePaths[0]
  //获取文件名
  const fr = await FrRead(filePath)
  // 返回包含文件路径和内容的对象
  return {
    path: filePath,
    value: fr.value,
    name: fr.fileName
  }
})
//FrFileSave 用于另存为文件

ipcMain.handle('FrFileSave', async (_e, name: string) => {
  const result = await dialog.showSaveDialog({
    title: '另存为',
    defaultPath: name || '未命名.txt', // 默认文件名
    buttonLabel: '保存', // 按钮标签
    filters: [
      { name: 'Text Files', extensions: ['txt', 'md', 'json'] }, // 过滤器，限制文件类型
      { name: 'All Files', extensions: ['*'] }
    ]
  })
  //返回处理结果 一个对象作为结果
  if (result.canceled || !result.filePath) {
    return { success: false, filePath: '' } // 用户取消保存
  } else {
    return { success: true, filePath: result.filePath } // 返回保存的文件路径
  }
})
