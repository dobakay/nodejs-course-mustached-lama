'use strict';
var express = require('express');
var bodyparser = require('body-parser');
var contacts = require('/contacts');

var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.post('/newcontact', function (request, response) {
    var data = request.body;
    contacts.createContact(data, function (err, contact) {
        response.status(200);
        response.end();
    });
});

app.get('/allcontacts', function (request, response) {
    response.json(contacts.getAllContacts());
});

app.get('/contact/:user_id', function (request, response) {
    reponse.json(contacts.getContact(request.param(user_id)));
});

app.delete('/deletecontact', function (request, response) {
    var data = request.body;
    contacts.removeContact(data.id, function(err, delContact) {
        response.json(delContact);
    });
});

app.listen(8000);
