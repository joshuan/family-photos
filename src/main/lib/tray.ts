import * as path from 'path';
import { app, Tray, nativeImage, screen } from 'electron';

let tray = null;

// https://electronjs.org/docs/api/native-image#supported-formats
const iconPaths: { [platform: string]: string } = {
    linux: 'assets/icons/png/128x128.png',
    darwin: 'assets/icons/png/24x24.png',
    win32: 'assets/icons/win/app.ico'
};

const getIcon = () => {
    const iconFile = iconPaths[process.platform];

    if (!iconFile) {
        throw new Error('Unknown platform for select icon file');
    }

    return path.resolve(path.join(__dirname, '../../', iconFile));
};

app.on('ready', () => {
    const iconPath = getIcon();
    const icon = nativeImage.createFromPath(iconPath);
    const { scaleFactor } = screen.getPrimaryDisplay();
    
    tray = new Tray(icon.resize({
        width: 22 / scaleFactor,
        height: 22 / scaleFactor
    }));
});