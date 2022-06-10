const { merge } = require("webpack-merge");
const BaseConfig = require("./webpack.base.config");

//定义目录
const publicPath = `${process.cwd()}/public`;

module.exports = merge(BaseConfig, {
  mode: "development",
  devServer: {
    static: {
      directory: publicPath, // 服务的根目录，用于静态文件
    },
    hot: true,
    host: "0.0.0.0",
    port: 8009,
  },
});
