
'use strict';

var releases = require('./releases');

function releasesDataProvider (args, callback) {
    callback(null, releases);
}

module.exports = {
    releases: releasesDataProvider
};

