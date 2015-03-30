
'use strict';

var marko = require('marko');
var dataProviders = require('./dataProviders');
var _ = require('underscore');

function sortedGroupBy(list, groupByIter, sortByIter) {
    var groupBy, sortBy;

    if (_.isArray(groupByIter)) {
        groupBy = function groupBy(obj) {
            return _.map(groupByIter, function(key, value) {
                return obj[key];
            });
        }
    } else {
        var groupBy = groupByIter;
    }

    if (_.isArray(sortByIter)) {
        sortBy = function sortBy(obj) {
            return _.map(sortByIter, function(key, value) {
                return obj[key];
            });
        }
    } else {
        var sortBy = sortByIter;
    }
    var groups = _.groupBy(list, groupBy);
    _.each(groups, function(value, key, list) {
        list[key] = _.sortBy(value, sortBy);
    });
    return groups;
}

function sortReleases (releases) {
    return releases;
}

function releases (req, res) {
    var template = marko.load(require.resolve('../views/releases.marko'));

    var grouped = sortedGroupBy(releaseArray, function (release) {
        return release.format.type;
    }, 'year');

    var context = {
        releasesDataProvider: grouped
    };

    console.log(grouped);

    template.render(context, res);
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

var releaseArray = [
    {
        'id': 1,
        'title': 'Box Frenzy!',
        'format': {
            'id': 1,
            'type': 'Album'
        },
        'artists': [
            {
                'id': 1,
                'title': 'Pop Will Eat Itself'
            }
        ],
        'year': 1987,
        'tracks': [
            {
                'id': 1,
                'position': 1,
                'title': 'Grebo Guru',
                'length': '3:56'
            },
            {
                'id': 2,
                'position': 2,
                'title': 'Beaver Patrol',
                'length': '3:08'
            },
            {
                'id': 3,
                'position': 3,
                'title': 'Let\'s Get Ugly',
                'length': '4:00'
            },
            {
                'id': 4,
                'position': 4,
                'title': 'U.B.L.U.D.',
                'length': '3:49'
            },
            {
                'id': 5,
                'position': 5,
                'title': 'Inside You',
                'length': '2:37'
            }
        ],
        'versions': [
            {
                'id': 1,
                'title': 'Box Frenzy!',
                'format': 'CD',
                'type': 'Album',
                'label': {
                    'id': 1,
                    'title': 'Chapter 22'
                },
                'date': 1987,
                'country': {
                    'id': 1,
                    'title': 'UK'
                },
                'catalogue': 'CHAP LP 18'
            }
        ],
        'images': {
        }
    },
    {
        'id': 2,
        'title': 'This is the Day... This is the Hour... This is This!',
        'format': {
            'id': 1,
            'type': 'Album'
        },
        'year': 1995
    },
    {
        'id': 3,
        'title': 'The Pop Will Eat Itself Cure for Sanity',
        'format': {
            'id': 1,
            'type': 'Album'
        },
        'year': 1990
    },
    {
        'id': 4,
        'title': 'Very Metal Noise Pollution',
        'format': {
            'id': 2,
            'type': 'Single or EP'
        },
        'year': 1989
    }
];

