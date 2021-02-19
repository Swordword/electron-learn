const { app, BrowserWindow } = require('electron')

function createWindow() {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  })
  // win.loadFile('index.html')
  win.loadURL('http://localhost:8080/')
}
app.on('ready', createWindow)
