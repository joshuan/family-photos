import { ipcRenderer } from 'electron';

console.log('Start');

ipcRenderer.send('app:ready', { foo: 'bar' });

ipcRenderer.on('app:ready:reply', (event: Event, data: any) => {
    console.log('app:ready:reply', JSON.stringify(data));
});
