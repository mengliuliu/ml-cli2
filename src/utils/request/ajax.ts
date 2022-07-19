import HttpRequest from './HttpRequest'
import { formatUrl } from '../format'

const axiosInstance = new HttpRequest().instance

const get = (url: string, params?: any) => {
    const res: any = axiosInstance.get(formatUrl(url), { params })
    return res
}
const post = (url: string, params?: any) => {
    const res: any = axiosInstance.post(formatUrl(url), params)
    return res
}
export { get, post }
