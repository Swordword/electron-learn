const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const rendererConfig = {
  // mode: 'development',
  mode: 'production',
  entry: path.resolve(__dirname, '../src/renderer/renderer.tsx'),
  target: 'electron-renderer',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.ts(x)$/,
        include: /src/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/renderer/index.html'),
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/renderer/'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
}

module.exports = rendererConfig
