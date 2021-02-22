const path = require('path')
process.env.BABEL_ENV = 'main'
module.exports = {
  mode: 'development',
  entry: {
    main: path.join(__dirname, '../src/main/electron.ts'),
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
    path: path.join(__dirname, '../dist'),
    filename: 'main.js',
  },
  devServer: {
    contentBase: './dist',
  },
}
