var MongoClient = require('mongodb').MongoClient;
var config = require('./config');
var path = require('path');
var jsonsPath = process.argv[2];

var jsonFileName = path.basename(jsonsPath, '.json');

var people = require('./' + jsonFileName);

var insertDocuments = function(db, collectionName, item, callback) {
    var collection = db.collection(collectionName);
    collection.insert(item, function(err, result) {
        callback(result);
    });
}

MongoClient.connect(config.mongoConnectionUrl, function(err, db) {
    insertDocuments(db, 'people', people, function () {
        db.close();
    });
});
