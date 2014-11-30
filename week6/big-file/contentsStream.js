var Readable = require('stream').Readable;
var util = require('util');
var numberGenerator = require('./number-gen');

function ContentStream (size, numbersPerChunk, opt) {
    // if we forgot the new operator before constructor function
    if(!(this instanceof ContentStream)) {
        return (new ContentStream(size, numbersPerChunk, opt));
    }

    opt = opt || {};
    Readable.call(this, opt);
    this.size = size;
    this.numbersPerChunk = numbersPerChunk || 1000;
}

util.inherits(ContentStream, Readable);

ContentStream.prototype._read = function() {
    var chunk = this.generateChunk();
    var chunkSize = getStringSizeInBytes(chunk);

    this.size -= chunkSize;

    if(this.size <= 0) {
        this.push(chunk.replace(',',''));
        this.push(null);
    }
    else {
        this.push(chunk);
    }
}

ContentStream.prototype.generateChunk = function (numbersCount) {
    var chunk = '';
    var numbersCount = numbersCount || this.numbersPerChunk;

    for (var i = 0; i < numbersCount; i++) {
        if(i < numbersCount - 1) {
            chunk += '' + numberGenerator(1,10) + ',';
        }
        else {
            chunk += '' + numberGenerator(1,10);
        }
    }

    return chunk;
}


function getStringSizeInBytes(str) {
    return Buffer.byteLength(str, 'utf8');
}


module.exports = ContentStream;
