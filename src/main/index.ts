import { app, BrowserWindow } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'

import { createWindow } from './windows'

// 当Electron完成初始化并准备好创建浏览器窗口时调用
// 某些API只能在此事件发生后使用
app.whenReady().then(() => {
  // 为Windows设置应用用户模型ID
  electronApp.setAppUserModelId('com.electron')

  // 开发模式下默认通过F12打开/关闭开发者工具
  // 生产环境下忽略CommandOrControl + R快捷键
  // 参考: https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // 创建主窗口
  createWindow()

  // 处理macOS应用激活事件
  app.on('activate', function () {
    // 在macOS上，当点击dock图标且没有其他窗口打开时，
    // 通常会重新创建一个窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 当所有窗口都关闭时退出应用(macOS除外)
// 在macOS上，应用及其菜单栏通常会保持活动状态，
// 直到用户显式使用Cmd + Q退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 可以在此文件中包含应用主进程的其他特定代码
// 也可以将它们放在单独的文件中并在此处引入

import './ipc' // 引入IPC通信逻辑
