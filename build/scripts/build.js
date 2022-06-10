const webpack = require("webpack");
const proWebpackConfig = require("../webpack/webpack.pro.config");

function startApp() {
  // 启动编译
  const compiler = webpack(proWebpackConfig); // 构建 renderer 编译器实例
  compiler.run((err, stats) => {
    if (err) {
      console.log("err", err);
    }
  });
}

startApp();
