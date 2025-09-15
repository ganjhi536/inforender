import { BrowserWindow, shell } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
// 创建应用窗口函数
export function createWindow(): void {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 900, // 窗口宽度
    height: 670, // 窗口高度
    show: false, // 初始不显示窗口
    autoHideMenuBar: true, // 自动隐藏菜
    frame: false, // 无边框窗口
    // Linux平台设置应用图标
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'), // 预加载脚本路径
      sandbox: false // 禁用沙箱模式
    }
  })

  // 当窗口准备就绪时显示
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // 处理窗口内打开新链接的请求
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url) // 使用系统默认浏览器打开外部链接
    return { action: 'deny' } // 阻止在应用内打开
  })

  // 开发环境下使用HMR热更新加载远程URL
  // 生产环境下加载本地HTML文件
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}
