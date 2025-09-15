/**
 * IPC 通信工具模块
 * 提供与 Electron 主进程进行进程间通信的功能
 */

/**
 * 向 Electron 主进程发送 IPC 消息
 * @param name - IPC 消息的名称/标识符，用于在主进程中识别消息类型
 * @returns void
 *
 * @example
 * // 发送一个名为 'open-file-dialog' 的 IPC 消息
 * IpcSender('open-file-dialog')
 *
 * @remarks
 * 此函数依赖于 window.electron 对象，确保在 Electron 环境中使用
 */
export const IpcSender = (name: string): void => {
  // 获取 Electron API 实例
  const electron = window.electron

  // 通过 IPC 渲染器发送指定名称的消息到主进程
  electron.ipcRenderer.send(name)
}
