const { app, BrowserWindow } = require('electron')

function createWindow() {
  let win = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
    },
  })
  // win.loadFile('index.html')
  win.loadURL('http://localhost:8080/')
}
app.on('ready', createWindow)
