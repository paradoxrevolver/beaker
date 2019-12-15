const { app, BrowserWindow, Menu } = require('electron');
const { menu } = require('./menu.js');

const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 720;

// global reference to the window object so that it isn't garbage collected
let win;

function createWindow() {
  // this is the window that appears!
  win = new BrowserWindow({
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    webPreferences: {
      nodeIntegration: true
    },
  });

  // first window immediately loads index.html
  win.loadFile('index.html');

  // when this specific window is closed
  win.on('closed', () => {
    // dereference BrowserWindow object on close to garbage collect it
    win = null;
  });
}

/* ON APP CHANGES  */

// as soon as app is ready
app.on('ready', () => {
  createWindow();
  let appMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(appMenu);
});

// when all windows have been closed
app.on('window-all-closed', () => {
  // if the platform is darwin we may not want to quit the process when
  // all windows are closed... we'll wait for the user to explicitly
  // close the process.
  if (process.platform !== 'darwin') app.quit();
});

// when app is activated
app.on('activate', () => {
  // create a window if win isn't already created
  if(win === null) createWindow();
});
