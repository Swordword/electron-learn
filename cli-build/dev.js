const electron = require('electron')
const webpack = require('webpack')
const path = require('path')
const { spawn } = require('child_process')
const WebpackDevServer = require('webpack-dev-server')
const webpackHotMiddleware = require('webpack-hot-middleware')

const mainConfig = require('./webpack.main')
const rendererConfig = require('./webpack.renderer')
const dev = 'development'

let hotMiddleware

function main() {
  greeting()
  Promise.all([buildMain(), buildRenderer()])
    .then(() => {
      startElectron()
    })
    .catch((err) => {
      throw err
    })
}

function greeting() {
  console.log('start building...')
}

function buildMain() {
  return new Promise((resolve) => {
    mainConfig.mode = dev
    const compiler = webpack(mainConfig)
    // compiler.hooks.watchRun.tapAsync('')
    compiler.watch({}, (err, stats) => {
      if (err) {
        console.error(err)
        return
      }
      resolve()
    })
  })
}

function buildRenderer() {
  return new Promise((resolve) => {
    rendererConfig.mode = dev
    const compiler = webpack(rendererConfig)
    hotMiddleware = webpackHotMiddleware(compiler, {
      log: false,
      heartbeat: 2500,
    })

    const server = new WebpackDevServer(compiler, {
      contentBase: path.join(__dirname, '../'),
      quiet: true,
      before(app, ctx) {
        app.use(hotMiddleware)
        ctx.middleware.waitUntilValid(() => {
          resolve()
        })
      },
    })

    server.listen(8080)
  })
}

function startElectron() {
  console.log('fn startElectron')
  var args = [path.join(__dirname, '../dist/main.js')]
  let electronProcess = spawn(electron, args)
  electronProcess.on('close', () => {
    process.exit()
  })
}

main()
