const path = require('path')
const { merge } = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin')
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
})
