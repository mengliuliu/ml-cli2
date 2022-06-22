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
    filename: "js/[name].[contenthash:6].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js?|ts?|tsx?|jsx?)$/,
        include: srcPath,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              // 开启babel的缓存
              // cacheDirectory: true,
              presets: [
                [
                  "@babel/preset-env",
                  // {
                  //   // useBuiltIns: usage 会根据配置的浏览器兼容，实现了按需添加
                  //   useBuiltIns: "usage",
                  //   corejs: 3,
                  //   // 不以commonjs打包，方便tree-shaking
                  //   modules: false,
                  // },
                ],
                // "@babel/preset-react",
                // "@babel/preset-typescript",
              ],
              // plugins: [
              //   ["@babel/plugin-proposal-decorators", { legacy: true }],
              //   ["@babel/plugin-proposal-class-properties"],
              //   // ["@babel/plugin-syntax-dynamic-import"],
              // ],
            },
          },
        ],
      },
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
        generator: {
          filename: "images/[name].[contenthash:6][ext]",
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
      chunkFilename: "css/[name].[contenthash:6].css",
    }),
  ],
};
