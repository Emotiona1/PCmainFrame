const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/myAgentWebview/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist/myAgentWebview'),
    filename: 'assets/js/[name].[contenthash:8].js',
    clean: true,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    historyApiFallback: true,
    host: '127.0.0.1',
    port: 3000,
    open: false,
    hot: true,
  },
  devtool: 'source-map',
};
