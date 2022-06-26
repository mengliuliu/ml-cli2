// class Bork {
//   //Property initializer syntax
//   instanceProperty = "bork";
//   boundFunction = () => {
//     return this.instanceProperty;
//   };

//   //Static class properties
//   static staticProperty = "babelIsCool";
//   static staticFunction = function () {
//     return Bork.staticProperty;
//   };
// }

// let myBork = new Bork();

//Property initializers are not on the prototype.
// console.log(myBork.__proto__.boundFunction); // > undefined

//Bound functions are bound to the class instance.
// console.log(myBork.boundFunction.call(undefined)); // > "bork"

//Static function exists on the class.
// console.log(Bork.staticFunction()); // > "babelIsCool"

let n: number = 5;
let s = 's';
console.log(n);
let obj = {
    '@babel/core': '^7.18.5',
    '@babel/plugin-proposal-decorators': '^7.18.2',
    '@babel/preset-env': '^7.18.2',
    '@babel/preset-react': '^7.17.12',
    '@babel/preset-typescript': '^7.17.12',
    'babel-loader': '^8.2.5',
    'cross-env': '^7.0.3',
    'css-loader': '^6.7.1',
    'file-loader': '^6.2.0',
    'html-webpack-plugin': '^5.5.0',
    less: '^4.1.2',
    'less-loader': '^11.0.0',
    'mini-css-extract-plugin': '^2.6.0',
    webpack: '^5.72.1',
    'webpack-cli': '^4.9.2',
    'webpack-dev-server': '^4.9.2',
};
