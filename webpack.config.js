const webpackMain = require('./build/webpack.main')
const webpackRenderer = require('./build/webpack.renderer')

module.exports = [webpackMain, webpackRenderer]
