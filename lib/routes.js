
'use strict';

var marko = require('marko');
var dataProviders = require('./dataProviders');

function releases (req, res) {
    var template = marko.load(require.resolve('../views/releases.marko'));

    var context = {
        releasesDataProvider: dataProviders.releases
    };

    template.stream(context).pipe(res);
}

function release (req, res) {
    var template = marko.load(require.resolve('../views/release.marko'));

    var context = {
        releaseDataProvider: dataProviders.release
    };

    template.stream(context).pipe(res);
}

module.exports = {
    releases: releases,
    release: release
};

