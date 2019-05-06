import { ipcRenderer } from 'electron';

console.log('Start');
console.log('Version:', process.env.VERSION);

ipcRenderer.send('app:ready', { foo: 'bar' });

ipcRenderer.on('google:token', (event: Event, token: string) => {
    console.log('google:token', JSON.stringify(token));
});
