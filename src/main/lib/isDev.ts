import electron from 'electron';

const app = electron.app || electron.remote.app;

export default !app.isPackaged;
