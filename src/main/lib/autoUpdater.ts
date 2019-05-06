import { autoUpdater } from 'electron-updater';
import log from './log';

autoUpdater.logger = log;

log.verbose(`Updater channel: ${autoUpdater.channel}`);

autoUpdater.on('checking-for-update', () => {
  log.verbose(`Update URL: "${autoUpdater.getFeedURL()}"`);
});

autoUpdater.on('update-available', (info) => {
  log.debug(`Update available: ${JSON.stringify(info, null, 4)}`);
});

autoUpdater.on('update-not-available', (info) => {
  log.debug(`Update not available: ${JSON.stringify(info, null, 4)}`);
});

// autoUpdater.on('error', (err) => {
//   log.error('[Joshuan] Error in auto-updater. ' + err);
// });

autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  log.verbose(log_message);
});

autoUpdater.on('update-downloaded', (info) => {
  log.debug(`Update downloaded: ${JSON.stringify(info, null, 4)}`);
});

export const init = () => {
  autoUpdater.checkForUpdatesAndNotify();
};

export default autoUpdater;