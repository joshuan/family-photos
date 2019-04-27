import { app, remote } from 'electron';

export default !(app || remote.app).isPackaged;
