const log = require('electron-log');
const isDev = require('./isDev');

// electron-log
//
// By default it writes logs to the following locations:
//
// on Linux: ~/.config/<app name>/log.log
// on OS X: ~/Library/Logs/<app name>/log.log
// on Windows: %USERPROFILE%\AppData\Roaming\<app name>\log.log
log.transports.file.level = isDev ? 'silly' : 'debug';
log.transports.console.level = isDev ? 'debug' : 'info';

log.catchErrors();

module.exports = log;