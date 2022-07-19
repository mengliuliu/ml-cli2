//在请求url前添加baseurl
const formatUrl = (url: string) => {
    const env = process.env.NODE_ENV
    if (env === 'development') var baseUrl = '/api'
    else var baseUrl: string = window.config.serverAddress
    return baseUrl + url
}

export { formatUrl }
