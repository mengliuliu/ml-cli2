const os = require('os')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const WebpackBar = require('webpackbar')
const { envConfig, pathConfig, getCssLoaders, getBabelOptions } = require('./config')
const { PROJECT_ROOT, PROJECT_SRCPATH, PROJECT_DISTPATH, PROJECT_PUBLICPATH } = pathConfig
const { isDev } = envConfig
const threads = os.cpus().length - 1

module.exports = {
    entry: path.resolve(PROJECT_SRCPATH, 'index.tsx'),
    output: {
        path: PROJECT_DISTPATH,
        // filename: `js/[name]${isDev ? '' : '.[contenthash:6]'}.js`,
        filename: `js/[name].[contenthash:6].js`,
        chunkFilename: `js/[name].[contenthash:6].chunk.js`,
        clean: true,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
            '@src': path.resolve(PROJECT_ROOT, './src'),
            '@components': path.resolve(PROJECT_ROOT, './src/components'),
            '@utils': path.resolve(PROJECT_ROOT, './src/utils'),
        },
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.(tsx?|jsx?)$/,
                        include: PROJECT_SRCPATH,
                        use: [
                            {
                                loader: 'thread-loader',
                                options: {
                                    workers: threads, // 开启多进程打包
                                },
                            },
                            {
                                loader: 'babel-loader',
                                options: getBabelOptions(),
                            },
                        ],
                    },
                    {
                        test: /\.css$/i,
                        use: getCssLoaders(3),
                    },
                    {
                        test: /\.less$/i,
                        use: getCssLoaders(4),
                    },
                    {
                        test: /\.(png|jpg|gif|jpeg|svg|mov|mp4|webp)$/,
                        type: 'asset',
                        parser: {
                            dataUrlCondition: {
                                maxSize: 4 * 1024, // 4kb
                            },
                        },
                        generator: {
                            filename: 'images/[name].[contenthash:6][ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'test html-webpack-plugin',
            filename: 'index.html',
            template: path.join(PROJECT_PUBLICPATH, './index.html'),
            // cache: fale, // 特别重要：防止之后使用v6版本 copy-webpack-plugin 时代码修改一刷新页面为空问题。
            // minify: isDev
            //     ? false
            //     : {
            //           removeAttributeQuotes: true,
            //           collapseWhitespace: true,
            //           removeComments: true,
            //           collapseBooleanAttributes: true,
            //           collapseInlineTagWhitespace: true,
            //           removeRedundantAttributes: true,
            //           removeScriptTypeAttributes: true,
            //           removeStyleLinkTypeAttributes: true,
            //           minifyCSS: true,
            //           minifyJS: true,
            //           minifyURLs: true,
            //           useShortDoctype: true,
            //       },
        }),
        new MiniCssExtractPlugin({
            ignoreOrder: true,
            filename: isDev ? 'css/[name].css' : 'css/[name].[contenthash:6].css',
            chunkFilename: isDev ? 'css/[id].css' : 'css/[id].[contenthash:6].css',
        }),
        new ForkTsCheckerWebpackPlugin(),
        new WebpackBar({
            name: isDev ? '正在启动' : '正在打包',
            color: '#fa8c16',
        }),
    ],
}
