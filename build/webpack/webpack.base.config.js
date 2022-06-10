const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

//定义目录
const srcPath = `${process.cwd()}/src`;
const distPath = `${process.cwd()}/dist`;
const publicPath = `${process.cwd()}/public`;

module.exports = {
  entry: path.resolve(srcPath, "index.js"),
  output: {
    path: distPath,
    filename: "js/[name].[contenthash:6].bundle.js",
    assetModuleFilename: "images/[hash][ext][query]",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.less$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|jpeg|svg|mov|mp4|webp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 4kb
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "test html-webpack-plugin",
      template: path.join(publicPath, "./index.html"),
    }),
    new MiniCssExtractPlugin({
      ignoreOrder: true,
      filename: "css/[name].[contenthash:6].css",
      chunkFilename: "css/[id].[contenthash:6].css",
    }),
  ],
};
