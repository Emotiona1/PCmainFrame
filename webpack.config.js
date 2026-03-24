const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/myAgentWebview/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist/myAgentWebview'),
    filename: 'index.js',
    clean: true,
    publicPath: 'auto',
    library: {
      type: 'commonjs2',
      export: 'default',
    },
    globalObject: 'this',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
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
        test: /\.(png|jpe?g|gif|webp|svg)$/i,
        type: 'asset/inline',
      },
      {
        test: /\.html$/,
        type: 'asset/source',
        include: path.resolve(__dirname, 'src/myAgentWebview/webview'),
      },
    ],
  },
  devtool: 'source-map',
};
