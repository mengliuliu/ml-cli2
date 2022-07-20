const path = require('path')
const { merge } = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
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
        ].filter(Boolean),
        splitChunks: {
            chunks: 'all',
            name: false,
        },
    },
})
