const debug = require('debug')('electron-builder');
const { CI, BRANCH, BUILD, PR, TAG } = require('./scripts/ci-env');
const buildVariant = (() => {
  if (!CI) { return 'local'; }
  if (TAG) { return 'tag'; }
  if (PR) { return 'pr'; }
  return 'branch';
})();

const dirName = {
  local: '',
  tag: '',
  pr: `/pull-${PR}`,
  branch: `/branch-${BRANCH}`
}[buildVariant];

module.exports = {
  appId: 'ru.joshuan.family-photos.app',
  productName: 'Family Photos',
  copyright: '© 2019 Evgeniy Shershnev',
  directories: {
    output: `build/app${dirName}`
  },
  files: [
    "index.html",
    "build/main/**/*",
    "build/renderer/**/*",
    "node_modules/**/*"
  ],
  publish: CI && {
    provider: 'generic',
    url: {
      branch: `https://s3.eu-central-1.amazonaws.com/family-photos-app-dev${dirName}/`,
      pr: `https://s3.eu-central-1.amazonaws.com/family-photos-app-dev${dirName}/`,
      tag: 'https://s3.eu-central-1.amazonaws.com/family-photos-app/'
    },
    channel: {
      branch: 'beta',
      pr: 'alpha',
      tag: 'latest'
    }[buildVariant]
  },
  buildVersion: CI && BUILD,
  artifactName: 'FamilyPhotos_${version}.${ext}',
  mac: {
    target: [ 
      'dmg',
      'zip'
    ],
    category: 'public.app-category.photography',
    identity: null,
    icon: './assets/icons/mac/app.icns'
  },
  win: {
    target: [
      'nsis'
    ],
    icon: './assets/icons/win/app.ico'
  },
  linux: {
    target: [
      'AppImage',
      'deb'
    ],
    category: 'Graphics',
    icon: './assets/icons/png'
  }
};
