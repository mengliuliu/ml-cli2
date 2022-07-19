import { message } from 'antd'
import axios, { AxiosInstance } from 'axios'

export default class HttpRequest {
    instance: AxiosInstance
    constructor() {
        this.instance = this.createAxiosInstance()
    }
    /**
     * 创建 axios 实例
     *
     * @param {Object} options 用户自定义配置
     * @return {Axios} 返回 axios 实例
     * @memberof HttpRequest
     */
    createAxiosInstance(): AxiosInstance {
        const axiosInstance = axios.create({
            timeout: 120 * 1000,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            withCredentials: true,
        })
        this.interceptors(axiosInstance)
        return axiosInstance
    }
    /**
     * 拦截器
     *
     * @param {Axios} instance
     * @memberof HttpRequest
     */
    interceptors(instance: AxiosInstance) {
        // 请求拦截器
        instance.interceptors.request.use(
            (config: any) => {
                if (localStorage.getItem('token')) {
                    // config.headers['X-Access-Token'] = localStorage.getItem('token') //把localStorage的token放在Authorization里
                }
                return config
            },
            (error) => Promise.reject(error),
        )

        // 响应拦截器
        // 响应拦截器
        instance.interceptors.response.use(
            (response) => {
                const { status, data, config } = response
                // 正常响应
                if (status === 200 || status < 300 || status === 304) {
                    if (config.url!.includes('handleResponse')) {
                        return Promise.resolve(data)
                    } else {
                        return Promise.resolve(data.data)
                    }

                    // if (data.returnCode % 1000 === 0) {
                    //     return Promise.resolve(data.data)
                    // } else {
                    //     //其他状态统一捕获并返回错误提示
                    //     message.error(data.returnDesc || '请求失败')
                    //     return Promise.reject(false)
                    // }
                } else {
                    return Promise.reject(response)
                }
            },
            (error) => {
                // 处理响应错误
                // this.errorHandle(error)
                return Promise.reject(error)
            },
        )
    }
    /**
     * 错误处理
     * @param err
     */
    errorHandle(err: any) {
        // 判断服务器响应
        if (err.response) {
            switch (err.response.status) {
                // 用户无权限访问接口
                case 401:
                    message.error('未授权，请先登录')
                    break
                case 403:
                    message.error('服务器拒绝访问')
                    break
                case 404:
                    message.error('请求的资源不存在')
                    break
                case 500:
                    message.error('服务器异常，请稍后再试')
                    break
            }
        } else if (err.message.includes('timeout')) {
            message.error('连接超时')
        } else if (err.code === 'ECONNABORTED' || err.message === 'Network Error' || !window.navigator.onLine) {
            message.error('网络已断开，请检查连接')
        } else {
            // 进行其他处理
            console.error(err.stack)
        }
    }
}
