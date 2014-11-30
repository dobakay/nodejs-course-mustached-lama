var Writable = require('stream').Writable;
var util = require('util');
var bignum = require('bignum');

function CalculationStream (opt) {
    opt = opt || {};
    Writable.call(this, opt);
    this.sum = bignum(0);
    this.accumulator = '';
}

util.inherits(CalculationStream, Writable);

CalculationStream.prototype._write = function(chunk, encoding, done) {
    if(chunk === null) {
        this.parseNumbersToSum(this.accumulator);
        this.accumulator = '';
    }
    else {
        var chunkString = chunk.toString(),
            lastCommaIndex = chunkString.lastIndexOf(','),
            parsable = '',
            rest = '';

        if(lastCommaIndex > -1) {
            parsable = chunkString.substring(0, lastCommaIndex);
            rest = chunkString.replace(parsable, '');
        }
        else {
            parsable = chunkString;
        }

        parsable = this.accumulator + parsable;
        this.accumulator = rest;

        this.parseNumbersToSum(parsable);
        done();
    }
}

CalculationStream.prototype.parseNumbersToSum = function(numberString) {
    var numbers = numberString.split(',');
    var tempSum = 0;
    for (var i = 0; i < numbers.length; i++) {
        tempSum += numbers[i];
    };
    this.sum.add(tempSum);
}

CalculationStream.prototype.end = function(chunk, encoding, done) {
    console.log(this.sum.toString());
};

module.exports = CalculationStream;
