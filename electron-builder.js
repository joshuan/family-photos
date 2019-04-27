module.exports = {
  appId: 'ru.joshuan.family-photos.app',
  productName: 'Family Photos',
  copyright: '© 2019 Evgeniy Shershnev',
  directories: {
    output: 'build/app'
  },
  publish: {
    provider: 'generic',
    url: 'https://app.family-photos.joshuan.ru/desktop/',
    channel: 'beta'
  },
  artifactName: 'FamilyPhotos_${version}.${ext}',
  mac: {
    target: [ 
      'dmg',
      'zip'
    ],
    category: 'public.app-category.photography',
    identity: null
  },
  win: {
    target: [
      'nsis'
    ]
  },
  linux: {
    target: [
      'AppImage',
      'deb'
    ],
    category: 'Graphics'
  }
};
