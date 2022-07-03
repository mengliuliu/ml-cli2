const { merge } = require('webpack-merge')
const BaseConfig = require('./webpack.base.config')

module.exports = merge(BaseConfig, {
    mode: 'production',
    devtool: 'none',
})
