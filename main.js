const { app, BrowserWindow } = require('electron')
app.on('ready', () => {
  let mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  })
  mainWindow.webContents.openDevTools()
  mainWindow.loadFile('index.html');
})
