const { join } = require('path')
process.env.BABEL_ENV = 'main'
module.exports = {
  mode: 'development',
  entry: {
    main: join(__dirname, '../src/main/electron.ts'),
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
    path: __dirname + '/dist',
    filename: 'electron.js',
  },
  devServer: {
    contentBase: './dist',
  },
}
