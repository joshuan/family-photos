const debug = require('debug')('scripts:env');
const {
    CI, 
    TRAVIS_BRANCH, 
    TRAVIS_BUILD_NUMBER, 
    TRAVIS_PULL_REQUEST, 
    TRAVIS_TAG
  } = process.env;

const variables = {
    CI: CI === 'true',
    BRANCH: TRAVIS_BRANCH,
    BUILD: TRAVIS_BUILD_NUMBER && parseInt(TRAVIS_BUILD_NUMBER, 10),
    PR: TRAVIS_PULL_REQUEST && TRAVIS_PULL_REQUEST !== 'false' && parseInt(TRAVIS_PULL_REQUEST, 10),
    TAG: TRAVIS_TAG ? TRAVIS_TAG : false
};

debug('Environment variables: %O', variables);

module.exports = variables;
