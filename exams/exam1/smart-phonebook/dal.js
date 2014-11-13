'use strict';
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Schema = mongoose.Schema;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    var ContactSchema = new Schema({
        phoneNumber:  String,
        personName: String
    });

    var GroupSchema = new Schema({
        groupName: String,
        contacts: [{ type: Schema.ObjectId, ref : 'contacts'}]
    });
    module.exports.Contact = db.model('contacts', ContactSchema);
    module.exports.Group = db.model('groups', GroupSchema);
});

