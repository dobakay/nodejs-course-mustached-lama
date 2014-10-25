'use strict';
var express = require('express');
var bodyparser = require('body-parser');
var methods = require('./methods');

var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.post('/subscribe', function (request, response) {
    var data = request.body;

    var result = methods.subscribeUser(data.email, data.keywords, data.type);
    console.log(data);
    response.json(result);
});

app.post('/unsubscribe', function (request, response) {
    var data = request.body;

    try {
        var isRemoved = methods.unSubscribeUser(data.subscriberId);

        response.status(200);
        response.end();
    }
    catch(err) {
        console.log(err.message);
    }
});

app.get('/listSubscribers', function (request, response) {
    var allSubs = methods.getAllSubscribers();
    response.json(allSubs);
    response.end();
});

app.listen(8000);
