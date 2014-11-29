var fs = require('fs');
var MAX_FILE_SIZE = 5000000; // 5MB
var ContentStream = require('./contentsStream');

(function main () {
    var writeStream = fs.createWriteStream('dump-file');
    var contentStream = new ContentStream(MAX_FILE_SIZE, 1000);

    contentStream.pipe(writeStream);
})();
