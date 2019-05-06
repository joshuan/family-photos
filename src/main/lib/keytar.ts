import * as keytar from 'keytar';
import logs from './log';

const SERVICE = 'FAMILY_PHOTOS';
const ACCOUNT = 'GOOGLE_PHOTOS';

type TokenTypes = 'ACCESS' | 'REFRESH' | 'ID';

const getAccountName = (type: TokenTypes) => {
    return `${ACCOUNT}_${type}_TOKEN`;
}

export const getToken = (type: TokenTypes) => {
    return keytar.getPassword(SERVICE, getAccountName(type));
}

export const saveToken = (token: string, type: TokenTypes) => {
    return keytar.setPassword(SERVICE, getAccountName(type), token);
};
