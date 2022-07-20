const path = require('path')
const { merge } = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const BaseConfig = require('./webpack.base.config')

module.exports = merge(BaseConfig, {
    mode: 'production',
    // devtool: 'none',
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: 'public/config.js',
                    to: 'config.js',
                },
            ],
        }),
    ],
    optimization: {
        minimize: true, // 启用代码压缩
        minimizer: [
            new TerserWebpackPlugin({
                extractComments: false, // 去除所有注释
                terserOptions: {
                    compress: { pure_funcs: ['console.log'] },
                },
            }),
            new CssMinimizerWebpackPlugin(),
            new BundleAnalyzerPlugin({
                analyzerMode: 'server', // 开一个本地服务查看报告
                analyzerHost: '127.0.0.1', // host 设置
                analyzerPort: 8888, // 端口号设置
            }),
        ],
        splitChunks: {
            chunks: 'all',
            name: false,
        },
    },
})
