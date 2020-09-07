const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('HappyPack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const rules = require('./rules');

module.exports = {
  mode: 'production',
  entry: { main: './src/js/main.js' },
  output: {
    publicPath: '/',
    path: path.join(process.cwd(), 'build'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      js: path.join(process.cwd(), 'src', 'js'),
      img: path.join(process.cwd(), 'src', 'img'),
    },
  },
  module: { rules },
  optimization: {
    splitChunks: {
      chunks: 'async',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
      },
    },
    minimize: true,
  },
  plugins: [
    new HappyPack({
      threads: 4,
      loaders: ['babel-loader'],
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      files: {
        js: ['main.js'],
      },
    }),
    new webpack.DefinePlugin({
      globals: {
        API_URL: JSON.stringify(process.env.API_URL),
      },
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/favicon.ico',
        to: path.join(process.cwd(), 'build'),
      },
      {
        from: 'src/img/*',
        to: path.join(process.cwd(), 'build', 'img'),
        flatten: true,
      },
    ]),
  ],
};