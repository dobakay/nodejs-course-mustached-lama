var Transform = require('stream').Transform;
var util = require('util');

function RegExStream(regex) {

    // if constructor function was invoked without the new operator
    if(!(this instanceof RegExStream)) {
        return (new RegExStream(regex));
    }

    // calling Transform stream constructor
    Transform.call(this,{ objectMode: true });

    // if regex parameter is a string, not a RegExp object
    if(!(regex instanceof RegExp)) {
        regex = new RegExp(regex, 'gi');
    }

    // making a new instance (copy of the regex object)
    // so if we make some changes to it, they won't reflect in the
    // original object
    this._pattern = this._clonePattern(regex);

    this._inputBuffer = "";
}

util.inherits(RegExStream, Transform);

RegExStream.prototype._clonePattern = function(pattern) {
    var parts = pattern.toString().slice(1).split('/');
    var regex = parts[0];
    var flags = (parts[1] || 'g');

    if(flags.indexOf('g') !== -1){
        flags += 'g';
    }

    return (new RegExp(regex, flags));
}

RegExStream.prototype._transform = function(chunk, encoding, done) {

    this._inputBuffer += chunk.toString('utf8');

    var nextOffset = null;

    var match = this._pattern.exec(this._inputBuffer);

    while(match !== null) {
        if (this._pattern.lastIndex < this._inputBuffer.length) {
            this.push(match[0]);

            nextOffset = this._pattern.lastIndex;
        }
        else {
            nextOffset = match.index;
        }

        match=this._pattern.exec(this._inputBuffer);
    }

    if (nextOffset !== null) {
        this._inputBuffer = this._inputBuffer.slice(nextOffset);
    }
    else {
        this._inputBuffer = "";
    }

    this._pattern.lastIndex = 0;

    // execute afterproccessing callback
    done();
}


RegExStream.prototype._flush = function(done) {
    var match = this._pattern.exec(this._inputBuffer);

    while(match !== null) {
        this.push(match[0]);
    }

    this._inputBuffer = "";

    // end of the output stream
    this.push(null);

    done();
};


module.exports = RegExStream;
