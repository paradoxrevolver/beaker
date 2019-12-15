let menu = [{
  label: 'File',
  submenu: [{
    label: 'New',
    accelerator: 'CmdOrCtrl+N',
    role: 'new',
  }, {
    label: 'Open',
    accelerator: 'CmdOrCtrl+O',
    role: 'open',
  }, {
    type: 'separator'
  }, {
    label: 'Save',
    accelerator: 'CmdOrCtrl+S',
    role: 'save',
  }, {
    label: 'Save As',
    accelerator: 'CmdOrCtrl+Shift+S',
    role: 'saveAs',
  }, {
    label: 'Export...',
    submenu: [{
      label: '.png',
      accelerator: 'CmdOrCtrl+Shift+A',
    }, {
      label: '.jpg',
    }]
  }, {
    type: 'separator'
  }, {
    label: 'Quit',
    accelerator: 'CmdOrCtrl+W',
    role: 'quit',
  }]
}, {
  label: 'Edit',
  submenu: [{
    label: 'Undo',
    accelerator: 'CmdOrCtrl+Z',
    role: 'undo'
  }, {
    label: 'Redo',
    accelerator: 'CmdOrCtrl+Y',
    role: 'redo'
  }, {
    type: 'separator'
  }, {
    label: 'Copy',
    accelerator: 'CmdOrCtrl+C',
    role: 'copy'
  }, {
    label: 'Cut',
    accelerator: 'CmdOrCtrl+X',
    role: 'cut'
  }, {
    label: 'Paste',
    accelerator: 'CmdOrCtrl+V',
    role: 'paste'
  }, {
    label: 'Select All',
    accelerator: 'CmdOrCtrl+A',
    role: 'selectAll'
  }]
}, {
  label: 'Window',
  submenu: [{
    label: 'Inspect',
    accelerator: (() => {
      if (process.platform === 'darwin') {
        return 'Alt+Command+I'
      } else {
        return 'Ctrl+Shift+I'
      }
    })(),
    click: (item, focusedWindow) => {
      if (focusedWindow) {
        focusedWindow.toggleDevTools()
      }
    }
  }]
}];

console.log(menu);

module.exports = { menu }
