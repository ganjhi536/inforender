//这个文件将axios封装成全局的，方便使用
//这个文件位于主程序libs文件夹中,作用是提供axios供渲染程序调用
import axios from 'axios'
const axiosCostume = axios.create({
  baseURL: '后端地址',
  timeout: 5000,
  headers: {
        'Content-Type': 'application/json'
    }
})
export const axPost = <T = any>(url: string,token?:string, data?:any):Promise<T> => {
    
  if(token){
    axiosCostume.defaults.headers.common['Authorization'] = token
  }
  return axiosCostume.post(url)
}
export const axGet = <T = any>(url: string):Promise<T> => {
  return axiosCostume.get(url)
}
//url例子
//BaseUrl + '/api/v1/xxx'
//^^^^^^^   ^^^^^^^^^^^^^
//固定部分   url内容
//由于axios封装于主函数中无法调用store内是否含有token 所以需要在渲染程序中手动添加token