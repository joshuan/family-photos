const branch = process.env.TRAVIS_BRANCH || 'master';
const channel = branch === 'master' ? 'latest' : 'beta';

module.exports = {
  appId: 'ru.joshuan.family-photos.app',
  productName: 'Family Photos',
  copyright: '© 2019 Evgeniy Shershnev',
  directories: {
    output: 'build/app'
  },
  files: [
    "build/main/**/*",
    "node_modules/**/*"
  ],
  publish: {
    provider: 'generic',
    url: `https://s3.eu-central-1.amazonaws.com/family-photos-app/${branch}/`,
    channel
  },
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
