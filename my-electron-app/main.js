const { app, BrowserWindow, Tray } = require('electron');

function createWindow() {
  this.win = new BrowserWindow({
    width: 1000,
    height: 650,
    icon: './iqnet-naranja.ico',
  });

  this.win.loadURL('https://gestion.iqnetcomunicaciones.com/');
  this.win.on('closed', () => {
    this.win = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (this.win === null) {
    createWindow();
  }
});