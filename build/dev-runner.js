const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const mainConfig = require('./webpack.main')
const rendererConfig = require('./webpack.renderer')

function main() {
  greeting()
}

function greeting() {
  console.log('start building...')
}

function buildRenderer() {}
function buildMain() {
  mainConfig.entry.main
}

function startElectron() {}

main()
