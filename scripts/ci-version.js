const fs = require('fs');
const path = require('path');
const debug = require('debug')('scripts:version');
const { CI, BRANCH, BUILD, PR, TAG } = require('./ci-env');
const packageJson = require('../package.json');

let fixVersion = null;

if (CI) {
    if (PR) {
        fixVersion = `${packageJson.version}-pr${PR}.${BUILD}`
    }
    if (!TAG) { // Push to branch
        fixVersion = `${packageJson.version}-${BRANCH}.${BUILD}`
    }
}

if (fixVersion !== null) {
    debug('Fix version to %s', fixVersion);
    packageJson.version = fixVersion;

    fs.writeFileSync(path.resolve(path.join(__dirname, '../package.json')), JSON.stringify(packageJson, null, 4));
} else {
    debug('Do not fix version');
}
