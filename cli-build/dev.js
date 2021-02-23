const electron = require('electron')
const webpack = require('webpack')
const path = require('path')
const { spawn } = require('child_process')
const WebpackDevServer = require('webpack-dev-server')
const webpackHotMiddleware = require('webpack-hot-middleware')

const mainConfig = require('./webpack.main')
const rendererConfig = require('./webpack.renderer')
const env = 'development'

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
    mainConfig.mode = env
    const compiler = webpack(mainConfig)
    // compiler.hooks.watchRun.tapAsync('')
    compiler.close(()=>{
      resolve()
    })
    compiler.watch({}, (err, stats) => {
      if (err) {
        console.error(err)
        return
      }
    })
  })
}

function buildRenderer() {
  return new Promise((resolve) => {
    rendererConfig.mode = env
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
  var args = [path.join(__dirname, '../dist/electron.js')]
  let electronProcess = spawn(electron, args)
  electronProcess.on('close', () => {
    process.exit()
  })
}

main()
