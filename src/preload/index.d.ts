import { ElectronAPI } from '@electron-toolkit/preload'
declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      openFile: () => Promise<null | object>
      FrSave: (filePath: string, content: string) => Promise<void>
      FrRead: (filePath: string) => Promise<{ fileName: string; value: string }>
      FrFileSave: (name: string) => { success: boolean; filePath: string } // 另存为文件
    }
  }
}
