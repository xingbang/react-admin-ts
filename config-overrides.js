const { override, addLessLoader, adjustStyleLoaders, fixBabelImports, addWebpackAlias, addWebpackPlugin } = require('customize-cra');
const path = require('path');
const WebpackBar = require('webpackbar');

module.exports = override(
  // 别名设置
  addWebpackAlias({
    '@src': path.resolve(__dirname, './src')
  }),
  // 针对antd 实现按需打包
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true //自动打包相关的样式 默认为 style:'css'
  }),
  // 使用less-loader对源码重的less的变量进行重新制定，设置antd自定义主题
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        //'@primary-color': '#4B32C3'
      }
    },
    sourceMap: true
  }),
  adjustStyleLoaders(({ use: [, css] }) => {
    css.options.sourceMap = true;
    css.options.modules = {
      // 配置默认的样式名称规则
      localIdentName: '[name]__[local]--[hash:base64:5]',
      getLocalIdent: (loaderContext, localIdentName, localName, options) => {
        // 处理antd 的样式
        //if (loaderContext.resourcePath.includes('node_modules')) {
        return localName;
        //}
      }
    };
  }),
  addWebpackPlugin(new WebpackBar())
);
