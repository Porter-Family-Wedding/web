  
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('HappyPack');

const rules = require('./rules');

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || '8080';

const API_URL = process.env.API_URL || 'http://localhost:3000';

module.exports = {
  mode: 'development',
  entry: { main: './src/js/main.js' },
  devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
  output: {
    publicPath: '/assets/build/',
    path: path.join(process.cwd(), 'assets', 'build'),
    filename: '[name].js',
    // Settings to better support source map file paths
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      js: path.join(process.cwd(), 'src', 'js'),
      img: path.join(process.cwd(), 'src', 'img'),
    },
  },
  module: { rules },
  devServer: {
    contentBase: './src',
    // Show our build stats
    noInfo: false,
    // enable HMR
    hot: true,
    // embed the webpack-dev-server runtime into the bundle
    inline: true,
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true,
    port: PORT,
    host: HOST,
    watchOptions: {
      poll: 1000,
    },
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  plugins: [
    new HappyPack({
      threads: 4,
      loaders: ['babel-loader?cacheDirectory=true'],
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      files: {
        js: ['[name].js'],
      },
    }),
    new webpack.DefinePlugin({
      globals: {
        API_URL: JSON.stringify(API_URL),
      },
    }),
  ],
};