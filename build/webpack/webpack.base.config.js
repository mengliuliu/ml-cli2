const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { envConfig, pathConfig, getCssLoaders } = require('./config')
const { PROJECT_ROOT, PROJECT_SRCPATH, PROJECT_DISTPATH, PROJECT_PUBLICPATH } = pathConfig
const { isDev } = envConfig

module.exports = {
    entry: path.resolve(PROJECT_SRCPATH, 'index.tsx'),
    output: {
        path: PROJECT_DISTPATH,
        filename: `js/[name]${isDev ? '' : '.[contenthash:6]'}.js`,
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
                test: /\.(tsx?|jsx?)$/,
                include: PROJECT_SRCPATH,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            // 开启babel的缓存
                            cacheDirectory: true,
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        //   // useBuiltIns: usage 会根据配置的浏览器兼容，实现了按需添加
                                        useBuiltIns: 'usage',
                                        corejs: 3,
                                        //   // 不以commonjs打包，方便tree-shaking
                                        //   modules: false,
                                    },
                                ],
                                '@babel/preset-react',
                                '@babel/preset-typescript',
                            ],
                            plugins: [
                                ['@babel/plugin-proposal-decorators', { legacy: true }],
                                ['@babel/plugin-proposal-class-properties', { loose: true }],
                                //   // ["@babel/plugin-syntax-dynamic-import"],
                            ],
                        },
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
            filename: 'css/[name].[contenthash:6].css',
            chunkFilename: 'css/[name].[contenthash:6].css',
        }),
        new ForkTsCheckerWebpackPlugin(),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: false,
        },
    },
}
