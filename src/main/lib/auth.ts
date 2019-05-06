import { BrowserWindow } from 'electron';
import log from './log';
import { saveToken } from './keytar';
import { getTokens, getUrl } from './googleOAuth2';

let win: BrowserWindow | null = null;

const waitApprovalCode = (): Promise<string> => {
    return new Promise((resolve) => {
        if (win === null) {
            throw new Error('Can not wait approval token because auth window is not setted.');
        }

        win.webContents.on('did-navigate', (event, pageUrl) => {
            log.debug('Navigate to:', pageUrl);
    
            const url = new URL(pageUrl);
    
            if (url.pathname.includes('oauth2/approval')) {
                const token = url.searchParams.get('approvalCode');
    
                if (!token) {
                    throw new Error('Search params page with oauth2/approval do not have approval code!');
                }
                
                log.debug('Approval code:', token);
    
                resolve(token);
            }
        });
    });
};

export const start = async (): Promise<BrowserWindow> => {
    win = new BrowserWindow({
        width: 600,
        height: 800,
        webPreferences: {
            nodeIntegration: false
        }
    });

    const url = getUrl();

    log.debug('Auth url:', url);

    await win.loadURL(url);

    return win;
};

export const wait = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (win === null) {
            start()
                .then(async (authWin) => {
                    const code = await waitApprovalCode();

                    authWin.close();

                    const tokens = await getTokens(code);

                    await saveToken(tokens.access, 'ACCESS');
                    await saveToken(tokens.refresh, 'REFRESH');
                    await saveToken(tokens.id, 'ID');

                    resolve(tokens.access);
                });
        }
    });
};
