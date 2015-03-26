
'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var routes = require('./lib/routes');

app.get('/releases', routes.releases);
app.get('/release/:id', routes.release);

app.listen(port, function () {
    console.log('Server started on port: ', port);
});

