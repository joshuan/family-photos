import got from 'got';
import { URL } from 'url';
import log from './log';
import { auth as config } from '../config'

interface ITokens {
    access: string;
    refresh: string;
    id: string;
}

export const getTokens = async (approvalToken: string): Promise<ITokens> => {
    const response = await got('https://www.googleapis.com/oauth2/v4/token', {
        method: 'POST',
        form: true,
        body: {
            code: approvalToken,
            client_id: config.client_id,
            client_secret: config.client_secret,
            redirect_uri: 'urn:ietf:wg:oauth:2.0:oob:auto',
            grant_type: 'authorization_code'
        }
    });

    if (response.statusCode !== 200 || !response.body) {
        log.debug('Response status code:', response.statusCode);
        log.debug('Response body:', response.body);
        
        throw new Error('WTF?');
    }

    const body = JSON.parse(response.body);

    return {
        access: body.access_token,
        refresh: body.refresh_token,
        id: body.id_token
    };
};

export const getUrl = (): string => {
    const params: { [key: string]: string } = {
        response_type: 'code',
        redirect_uri: 'urn:ietf:wg:oauth:2.0:oob:auto',
        client_id: config.client_id,
        scope: config.scopes.join(' ')
    };

    const authUrl = new URL('https://accounts.google.com/o/oauth2/auth');

    Object.keys(params).forEach((key) => {
        authUrl.searchParams.append(key, params[key]);
    });

    return authUrl.toString();
};
