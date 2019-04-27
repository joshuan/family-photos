const electron = require('electron');

const app = electron.app || electron.remote.app;

module.exports = !app.isPackaged;
