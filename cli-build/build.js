const webpack = require('webpack')

const mainConfig = require('./webpack.main')
const rendererConfig = require('./webpack.renderer')
const env = 'production'

function main() {
  Promise.all([buildMain(), buildRenderer()])
    .then(() => {
      startBuild()
    })
    .catch((err) => {
      throw err
    })
}

function buildMain() {
  console.log('fn buildMain')
  mainConfig.mode = env
  return new Promise((resolve) => {
    const compiler = webpack(mainConfig)
    // compiler.close(()=>{
    //   resolve()
    // })
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
  console.log('fn buildRenderer')
  rendererConfig.mode = env
  return new Promise((resolve) => {
    const compiler = webpack(rendererConfig)
    // compiler.close(()=>{
    //   resolve()
    // })
    compiler.watch({}, (err, stats) => {
      if (err) {
        console.error(err)
        return
      }
      resolve()
    })
  })
}

function startBuild() {
  process.exit()
}
main()
