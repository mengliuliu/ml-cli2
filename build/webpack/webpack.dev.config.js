const { merge } = require('webpack-merge')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const BaseConfig = require('./webpack.base.config')
const { pathConfig, serverConfig, proxyConfig, envConfig } = require('./config')
const { PROJECT_PUBLICPATH } = pathConfig
const { SERVER_HOST, SERVER_PORT } = serverConfig
const { isDev } = envConfig

module.exports = merge(BaseConfig, {
    mode: 'development',
    devtool: 'eval-source-map',
    target: isDev === 'development' ? 'web' : 'browserslist',
    devServer: {
        static: {
            directory: PROJECT_PUBLICPATH, // 服务的根目录，用于静态文件
        },
        hot: true,
        host: SERVER_HOST,
        port: SERVER_PORT,
        // stats: 'errors-only', // 终端仅打印 error
        compress: true, // 是否启用 gzip 压缩
        proxy: proxyConfig,
    },
    // plugins: [new webpack.HotModuleReplacementPlugin()],
    plugins: [new ReactRefreshPlugin()],
})
