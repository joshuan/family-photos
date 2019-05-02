import { app, BrowserWindow, ipcMain } from 'electron';
import autoUpdater from './lib/autoUpdater';
import keys from './lib/keytar';
import log from './lib/log';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null = null;

log.info('App starting...');
log.verbose(`App name: ${app.getName()}`);
log.verbose(`App version: ${app.getVersion()}`);
log.verbose(`App locale: ${app.getLocale()} (code: ${app.getLocaleCountryCode()})`);

log.verbose(`Metriks: ${JSON.stringify(app.getAppMetrics(), null, 4)}`);
app.getGPUInfo('basic').then((data) => {
    log.verbose(`GPU info: ${JSON.stringify(data, null, 4)}`);
});

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1200,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    
    // and load the index.html of the app.
    win.loadFile('index.html');

    // Open the DevTools.
    win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });

    ipcMain.on('app:ready', (event: Event, data: any) => {
        if (win) {
            win.webContents.send('app:ready:reply', data);
        }
    });

    keys();
    autoUpdater.checkForUpdatesAndNotify();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    log.verbose('Node:', process.versions.node);
    log.verbose('Electron:', process.versions.electron);
    log.verbose('Chrome:', process.versions.chrome);
    log.verbose('Modules:', process.versions.modules);

    createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
