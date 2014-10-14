'use strikt';
var express = require('express');
var comparer = require('./comparer');

var app = express();

app.post('/newArticles', function (request, response) {
    comparer.notifySubscribers();
});

app.listen(9000);

