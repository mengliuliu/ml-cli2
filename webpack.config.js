const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  devtool: "inline-source-map",
  mode: "development",
  output: {
    filename: "js/[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      //层叠样式表抽离
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset",
        generator: {
          filename: "images/[name].[contenthash:6].[ext]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 低于4kb转换成data URI
          },
        },
      },
      //本地资源,由于是客户端本地打包，图片资源不需要使用url-loader转为base64注入js bundle中
      //   {
      //     test: /\.(png|jpg|gif|jpeg)$/,
      //     use: {
      //       loader: "file-loader",
      //       options: {
      //         name: "images/[name].[contenthash:6].[ext]",
      //         esModule: false, // file-loader 默认使用 ES6 模块解析，将其关闭，启用 CommonJS 模块，不配置这个，html 文件中的图片路径不对
      //       },
      //     },
      //     type: "javascript/auto", // 不加这个配置，一张图片打包后会生成两张
      //   },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "配置",
    }),
    //css抽取插件，用于将css文件从js中剥离成单独的css文件
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:6].css",
    }),
  ],
  //   devServer: {
  //     // 将 dist 目录下的文件 serve 到 localhost:8080 下
  //     // static: "./dist",
  //   },
  //   optimization: {
  //     runtimeChunk: "single",
  //   },
};
