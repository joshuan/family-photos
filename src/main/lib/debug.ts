import { app } from 'electron';
import log from './log';

log.info('App starting...');
log.verbose(`App name: ${app.getName()}`);
log.verbose(`App version: ${app.getVersion()}`);
log.verbose(`App locale: ${app.getLocale()} (code: ${app.getLocaleCountryCode()})`);

log.verbose(`Metriks: ${JSON.stringify(app.getAppMetrics(), null, 4)}`);
app.getGPUInfo('basic').then((data) => {
    log.verbose(`GPU info: ${JSON.stringify(data, null, 4)}`);
});

app.on('ready', () => {
    log.verbose('Node:', process.versions.node);
    log.verbose('Electron:', process.versions.electron);
    log.verbose('Chrome:', process.versions.chrome);
    log.verbose('Modules:', process.versions.modules);
});