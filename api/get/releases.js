
var g = require('dyson-generators');
var f = require('faker');

module.exports = {
    path: '/releases',
    collection: true,
    template: {
        id: g.id,
        title: f.company.companyName()
    }
};

