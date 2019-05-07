import { getPassword, setPassword } from 'keytar';
import { keytar as config } from '../config';

type TokenTypes = 'ACCESS' | 'REFRESH' | 'ID';

const getAccountName = (type: TokenTypes) => {
    return `${config.ACCOUNT}_${type}_TOKEN`;
}

export const getToken = (type: TokenTypes) => {
    return getPassword(config.SERVICE, getAccountName(type));
}

export const saveToken = (token: string, type: TokenTypes) => {
    return setPassword(config.SERVICE, getAccountName(type), token);
};
