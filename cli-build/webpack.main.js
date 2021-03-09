const path = require('path')
process.env.BABEL_ENV = 'main'

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, '../src/main/electron.ts'),
  },
  target: 'electron-main',
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: /src/,
        use: [{ loader: 'ts-loader' }],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'electron.js',
  },
  devServer: {
    contentBase: './dist',
  },
}
