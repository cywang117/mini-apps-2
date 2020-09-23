const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'client', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ],
  },
  devServer: {
    proxy: {
      '/': 'http://localhost:3000'
    },
    contentBase: path.resolve(__dirname, 'public'),
    compress: true,
    hot: true,
    open: true
  },
  devtool: 'eval-cheap-source-map',
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'client', 'index.html')
    })
  ]
};
