const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'
// 环境变量配置
const envConfig = {
    isDev,
}

//定义目录
const PROJECT_ROOT = path.resolve(process.cwd())
const PROJECT_SRCPATH = path.resolve(process.cwd(), './src')
const PROJECT_DISTPATH = path.resolve(process.cwd(), './dist')
const PROJECT_PUBLICPATH = path.resolve(process.cwd(), './public')
const pathConfig = {
    PROJECT_ROOT,
    PROJECT_SRCPATH,
    PROJECT_DISTPATH,
    PROJECT_PUBLICPATH,
}

const serverConfig = {
    SERVER_HOST: '0.0.0.0',
    SERVER_PORT: 8009,
}

const getCssLoaders = (n) =>
    [
        {
            loader: MiniCssExtractPlugin.loader,
        },
        {
            loader: 'css-loader',
            options: {
                sourceMap: isDev,
            },
        },
        {
            loader: 'postcss-loader',
            options: {
                sourceMap: isDev,
            },
        },
        {
            loader: 'less-loader',
            options: {
                sourceMap: isDev,
            },
        },
    ].slice(0, n)

module.exports = { envConfig, pathConfig, serverConfig, getCssLoaders }
