const fs = require('fs');
const path = require('path');
const glob = require('glob');

const webpack = require('atool-build/lib/webpack');
const pxtorem = require('postcss-pxtorem');


module.exports = function (webpackConfig, env) {
  webpackConfig.babel.babelrc = true;

  webpackConfig.babel.plugins.push('transform-runtime');

  webpackConfig.babel.plugins.push(['import', {
    style: 'css',  // if true, use less
    libraryName: 'antd-mobile',
  }]);

  webpackConfig.postcss.push(pxtorem({
    rootValue: 100,
    propWhiteList: [],
  }));

  return webpackConfig;
};
