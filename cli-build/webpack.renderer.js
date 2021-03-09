const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const rendererConfig = {
  // mode: 'development',
  entry: path.join(__dirname, '../src/renderer/renderer.tsx'),
  target: 'electron-renderer',
  devtool: 'source-map',
  module: {
    rules: [
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
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
  },
  // devServer: {
  //   contentBase: path.join(__dirname, '../dist'),
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/renderer/index.html'),
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/renderer/'),
    },
    extensions:['.ts','.tsx','.js','.jsx']
  },
}

module.exports = rendererConfig
