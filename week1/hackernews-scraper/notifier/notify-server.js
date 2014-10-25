'use strict';
var express = require('express');
var bodyparser = require('body-parser');
var comparer = require('./comparer');

var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.get('/newArticles', function (request, response) {
    comparer.notifySubscribers();
    response.status(200);
    response.end();
});

app.listen(9000);

