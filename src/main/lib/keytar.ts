import * as keytar from 'keytar';
import logs from './log';

const SERVICE = 'FAMILY_PHOTOS';
const ACCOUNT = 'FAMILY_PHOTOS_ACCOUNT';

// @ts-ignore
const log = (...args) => logs.info('[Keytar]', ...args);

export default () => {
    log('Start');

    keytar
        .findCredentials(SERVICE)
        .then((value) => {
            log('Found credentionals:', value);

            return keytar.setPassword(SERVICE, ACCOUNT, 'superpuperpassword');
        })
        .then(() => {
            log('Password was saved');

            return keytar.getPassword(SERVICE, ACCOUNT);
        })
        .then((data) => {
            log('Password was getted:', data);

            return keytar.findCredentials(SERVICE);
        })
        .then((value) => {
            log('Found credentionals:', value);
        })
        .catch((error) => {
            log('Error:', error);
        });
};
