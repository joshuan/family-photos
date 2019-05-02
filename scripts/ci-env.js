const debug = require('debug')('scripts:env');
const {
    CI, 
    TRAVIS_BRANCH: BRANCH, 
    TRAVIS_BUILD_NUMBER: BUILD, 
    TRAVIS_PULL_REQUEST: PR, 
    TRAVIS_TAG: TAG
  } = process.env;

const variables = {
    CI,
    BRANCH,
    BUILD,
    PR,
    TAG
};

debug('Environment variables: %O', variables);

module.exports = variables;
