import { BrowserWindow, ipcMain } from 'electron';
import { getLogLevel } from './log';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null = null;

export const isWindowCreated = (): boolean => {
    return win === null;
}

export const getWindow = (): BrowserWindow => {
    if (win === null) {
        throw new Error('Window is not created!');
    }

    return win;
}

export const sendEvent = (event: string, data?: any) => {
    if (win === null) {
        throw new Error('Can not send event, because window is not created!');
    }

    win.webContents.send(event, data);
}

export const createWindow = (token: string): BrowserWindow => {
    if (!isWindowCreated()) {
        throw new Error('Can not create similar window');
    }

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
    if (['debug', 'verbose'].includes(getLogLevel())) {
        win.webContents.openDevTools();
    }

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });

    ipcMain.on('app:ready', (event: Event) => {
        sendEvent('google:token', token);
    });

    return win;
}