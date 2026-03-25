const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'preview/src/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist/preview'),
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
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: '18',
                  },
                },
              ],
              ['@babel/preset-react'],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        type: 'asset/inline',
      },
      {
        test: /\.html$/,
        type: 'asset/source',
        include: path.resolve(__dirname, 'src/myAgentWebview/webview'),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'preview/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'preview/chat-panel.html'),
          to: path.resolve(__dirname, 'dist/preview/chat-panel.html'),
        },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'preview'),
    },
    historyApiFallback: true,
    host: '127.0.0.1',
    port: 3001,
    open: true,
    hot: true,
  },
  devtool: 'source-map',
};
