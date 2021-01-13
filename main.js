const { app, BrowserWindow } = require('electron')
app.on('ready', () => {
  let mainWindow = new BrowserWindow({
    width: 1600,
    height: 1200,
    webPreferences: {
      nodeIntegration: true,
    },
  })
  mainWindow.loadFile('index.html');
  mainWindow.webContents.openDevTools()
  // let secondWindow = new BrowserWindow({
  //   width:400,
  //   height:300, 
  //   webPreferences:{
  //     nodeIntegration:true
  //   },
  //   parent:mainWindow
  // })
  // secondWindow.loadFile('second.html')
})
