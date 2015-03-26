
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

module.exports = {
    releases: releases
};

