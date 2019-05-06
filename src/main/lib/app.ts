import { BrowserWindow } from 'electron';
import { createWindow, isWindowCreated } from './win';
import { getToken } from './keytar';
import { wait as waitAuth } from './auth';

export const open = async (): Promise<BrowserWindow> => {
    let token = await getToken('ACCESS');

    if (!token) {
        token = await waitAuth();
    }

    return createWindow(token);
};
