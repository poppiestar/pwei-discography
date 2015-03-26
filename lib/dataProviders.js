
'use strict';

var releases = require('./releases');

function releasesDataProvider (args, callback) {
    callback(null, releases);
}

function releaseDataProvider (args, callback) {
    callback(null, releases[0]);
}

module.exports = {
    releases: releasesDataProvider,
    release: releaseDataProvider
};

