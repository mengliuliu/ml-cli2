const webpack = require('webpack')
const { merge } = require('webpack-merge')
const BaseConfig = require('./webpack.base.config')
const { pathConfig, serverConfig } = require('./config')
const { PROJECT_PUBLICPATH } = pathConfig
const { SERVER_HOST, SERVER_PORT } = serverConfig

module.exports = merge(BaseConfig, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        static: {
            directory: PROJECT_PUBLICPATH, // 服务的根目录，用于静态文件
        },
        hot: true,
        host: SERVER_HOST,
        port: SERVER_PORT,
        // stats: 'errors-only', // 终端仅打印 error
        compress: true, // 是否启用 gzip 压缩
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
})
