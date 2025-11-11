//这个文件将axios封装成全局的，方便使用
//这个文件位于主程序libs文件夹中,作用是提供axios供渲染程序调用
/*
这是AI提示 临时用来传递
基于您当前的axios.ts文件，我可以提供一个完整的封装方案：

## axiosCostume 可以包含的内容：

### 1. 基础配置
```typescript
const axiosCostume = axios.create({
    baseURL: '后端地址',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
})
```

### 2. 请求拦截器
```typescript
axiosCostume.interceptors.request.use(
    (config) => {
        // 添加认证token
        const token = getToken()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)
```

### 3. 响应拦截器
```typescript
axiosCostume.interceptors.response.use(
    (response) => response.data,
    (error) => {
        // 统一错误处理
        if (error.response?.status === 401) {
            // 处理未授权
        }
        return Promise.reject(error)
    }
)
```

## axPost 函数实现：

```typescript
export const axPost = <T = any>(
    url: string, 
    data?: any, 
    config?: AxiosRequestConfig
): Promise<T> => {
    return axiosCostume.post(url, data, config)
}
```

## 扩展其他HTTP方法：

```typescript
export const axGet = <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return axiosCostume.get(url, config)
}

export const axPut = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return axiosCostume.put(url, data, config)
}

export const axDelete = <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return axiosCostume.delete(url, config)
}
```

## 高级扩展功能：

### 1. 类型安全的API
```typescript
interface ApiResponse<T> {
    code: number
    data: T
    message: string
}

export const axPostWithType = <T = any>(
    url: string, 
    data?: any
): Promise<ApiResponse<T>> => {
    return axiosCostume.post(url, data)
}
```

### 2. 文件上传
```typescript
export const axUpload = (url: string, file: File, onProgress?: (progress: number) => void) => {
    const formData = new FormData()
    formData.append('file', file)
    
    return axiosCostume.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
            if (onProgress && progressEvent.total) {
                const progress = (progressEvent.loaded / progressEvent.total) * 100
                onProgress(progress)
            }
        }
    })
}
```

### 3. 取消请求
```typescript
export const createCancelToken = () => {
    return axios.CancelToken.source()
}
```

这样的封装可以提供统一的错误处理、认证管理、类型安全和更好的开发体验。您希望我帮您实现完整的封装吗？
*/
import axios from 'axios'

const axiosCostume = axios.create({
  baseURL: '后端地址',
  timeout: 5000
})
export const axPost = () => {
  //
}
