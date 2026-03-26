const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const cuiSourceDir = path.resolve(__dirname, 'src/CUI');
const copyPatterns = [
  {
    from: path.resolve(__dirname, 'src/weAgent/ai-chat-viewer/dist/lib'),
    to: path.resolve(__dirname, 'dist/weAgent'),
    globOptions: {
      ignore: ['**/index.js', '**/index.js.map', '**/index.d.ts'],
    },
  },
];

if (fs.existsSync(cuiSourceDir)) {
  copyPatterns.push({
    from: cuiSourceDir,
    to: path.resolve(__dirname, 'dist/CUI'),
  });
}

module.exports = {
  entry: path.resolve(__dirname, 'src/weAgent/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist/weAgent'),
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
  plugins: [
    new CopyWebpackPlugin({
      patterns: copyPatterns,
    }),
  ],
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
        include: path.resolve(__dirname, 'src/weAgent/webview'),
      },
    ],
  },
  devtool: 'source-map',
};
