const webpack = require('webpack')

const mainConfig = require('./webpack.main')
const rendererConfig = require('./webpack.renderer')
const env = 'production'

function buildRenderer() {
  console.log('fn buildRenderer')
  rendererConfig.mode = env
  return new Promise((resolve) => {
    const compiler = webpack(rendererConfig)
    compiler.close(() => {
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

buildRenderer().then(() => {
  console.log('done')
  process.exit()
})
