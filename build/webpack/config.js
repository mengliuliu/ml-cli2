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

const proxyConfig = {
    '/api/': {
        target: 'http://mengliublog.com:3000',
        changeOrigin: true,
        pathRewrite: {
            '/api': '',
        },
    },
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

const getBabelOptions = () => {
    const plugins = [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties'],
    ]
    if (isDev) plugins.push('react-refresh/babel')
    return {
        cacheDirectory: true, // 开启babel缓存
        cacheCompression: false, // 关闭缓存文件压缩
        presets: [
            [
                '@babel/preset-env',
                {
                    //   // useBuiltIns: usage 会根据配置的浏览器兼容，实现了按需添加
                    useBuiltIns: 'usage',
                    corejs: 3,
                    //   // 不以commonjs打包，方便tree-shaking
                    modules: false,
                },
            ],
            '@babel/preset-react',
            '@babel/preset-typescript',
        ],
        plugins,
    }
}

module.exports = { envConfig, pathConfig, serverConfig, proxyConfig, getCssLoaders, getBabelOptions }
