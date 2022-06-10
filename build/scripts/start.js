const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
// const waitOn = require("wait-on");
const devWebpackConfig = require("../webpack/webpack.dev.config");

startApp();

function startApp() {
  console.log("__dirname", __dirname);

  // 启动编译
  const compiler = webpack(devWebpackConfig); // 构建 renderer 编译器实例
  const server = new WebpackDevServer(devWebpackConfig.devServer, compiler);
  const port = devWebpackConfig.devServer.port;

  // 执行 webpack-dev-server 监听
  server.startCallback(() => {
    console.log(`Successfully started server on http://localhost:${port}`);
  });

  // 等待开发代码编译成功
  // waitOn({
  //   resources: [`http://localhost:${port}`],
  //   timeout: "300000", // 等待的时间
  // })
  //   .then(() => {
  //     console.log(`本地开发服务器启动成功: http://localhost:${port}`);
  //   })
  //   .catch((err) => {
  //     console.log(`本地开发服务器启动失败, error: ${err} `);
  //   });
}
