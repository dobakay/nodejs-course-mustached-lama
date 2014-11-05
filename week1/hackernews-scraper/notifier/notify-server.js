'use strict';
var express = require('express');
var bodyparser = require('body-parser');
var comparer = require('./comparer');
var mcontentgenerator = require('./mailcontentgenerator');
var mailer = require('./mailer');

var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.get('/newArticles', function (request, response) {
    var matchesCollection = comparer.notifySubscribers();
    var matchesWithMail = mcontentgenerator.attachMailContents(matchesCollection);
    mailer.mail(matchesWithMail);
    response.status(200);
    response.end();
});

app.listen(9000);

