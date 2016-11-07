const fs = require('fs');
const path = require('path');
const glob = require('glob');

module.exports = function (webpackConfig, env) {
  webpackConfig.babel.babelrc = false;
  webpackConfig.resolve = {
    modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
    extensions:['','.web.js','.js','.json','.jsx']
  };
  webpackConfig.babel.plugins.push('transform-runtime');

  webpackConfig.babel.plugins.push(['import', {
    style: 'css',  // if true, use less
    libraryName: 'antd-mobile',
  }]);

  // Enable hmr for development.
  if (env === 'development') {
    webpackConfig.babel.plugins.push(['dva-hmr', {
      entries: [
        './src/entry/index.js',
      ],
    }]);
  }

  // Parse all less files as css module.
  webpackConfig.module.loaders.forEach(function (loader, index) {
    if (loader.test.toString() === '/\\.module\\.less$/') {
      loader.test = /\.less$/;
    }
  });

  return webpackConfig;
};
