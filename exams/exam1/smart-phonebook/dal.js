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

    var Contact = db.model('contacts', ContactSchema);

    var GroupSchema = new Schema({
        groupName: String,
        contacts: [{ type: Mongoose.Schema.ObjectId, ref : 'contacts'}]
    });

    var Group = db.model('groups', GroupSchema);

});


module.export
