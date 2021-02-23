const { app, BrowserWindow } = require('electron')

let mainWindow

function createWindow() {
  let mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  const winURL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:8080`
    : `file://${__dirname}/index.html`

  mainWindow.loadURL(winURL)
  mainWindow.webContents.openDevTools()
}
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
app.on('ready', createWindow)
