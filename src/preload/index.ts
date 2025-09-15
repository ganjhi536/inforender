import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
//所有方法都要在这里导入 并且导入来自Libs的统一口
import { FrRead, FrSave } from '../main/Libs/Libs'
console.log(FrRead, FrSave)
// Custom APIs for renderer
const api = {
  openFile: () => ipcRenderer.invoke('openFile'),
  FrSave: (filePath: string, content: string) => FrSave(filePath, content),
  FrRead: (filePath: string) => FrRead(filePath),
  FrFileSave: (name: string) => ipcRenderer.invoke('FrFileSave', name) // 另存为文件
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
