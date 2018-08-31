const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('./dist'),
    filename: 'index.js',
    publicPath: '/',
  },
  plugins: [
    new CopyWebpackPlugin([{ from: './public' }]),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  devServer: {
    contentBase: path.resolve('./dist'),
    historyApiFallback: true,
    hot: true,
    port: 8767,
    proxy: {
      '/redfish': {
        target: 'https://ilorestfulapiexplorer.ext.hpe.com',
        secure: false,
      },
    },
  },
};
