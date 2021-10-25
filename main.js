// modules
const { join } = require('path');
const { 
    app, 
    BrowserWindow, 
    Menu, 
    MenuItem,
    shell
} = require('electron');

// mac platform
const isMac = process.platform === 'darwin';

const template = [
    ...(isMac ? [{
        label: app.name,
        submenu: [
            { role: 'quit' }
        ]
    }] : []),
    isMac ? { role: 'close' } : { role: 'quit' }
];

// create window
function createWindow () {
    // init window
    const mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        minWidth: 1024,
        minHeight: 768,
        icon: join(__dirname, 'icon.png'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: join(__dirname, 'preload.js')
        }
    });

    // load file
    mainWindow.loadFile(join(__dirname, 'app/index.html'));

    // menu
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

// start window
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// close window
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
