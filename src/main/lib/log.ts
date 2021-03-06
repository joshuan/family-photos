import log, { ILogLevel } from 'electron-log';
import isDev from './isDev';

let consoleLevel = 'info';

// electron-log
//
// By default it writes logs to the following locations:
//
// on Linux: ~/.config/<app name>/log.log
// on OS X: ~/Library/Logs/<app name>/log.log
// on Windows: %USERPROFILE%\AppData\Roaming\<app name>\log.log
log.transports.file.level = isDev ? 'silly' : 'debug';
log.transports.console.level = isDev ? 'debug' : 'info';

log.transports.console.format = '%c{h}:{i}:{s}.{ms}%c [{level}] › {text}';

if (process.argv.includes('--verbose')) {
    log.transports.console.level = 'verbose';
}

if (process.argv.includes('--debug')) {
    log.transports.console.level = 'debug';
}

log.catchErrors();

export const getLogLevel = (): ILogLevel => {
    return log.transports.console.level || 'silly';
};

export default log;