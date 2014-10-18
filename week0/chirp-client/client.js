var ArgumentParser  = require('argparse').ArgumentParser;
var parser = new ArgumentParser({ description: 'chirping client' });
var serverCalls = require('./server-calls');
'use strict';

///////////////////
// register user //
///////////////////
parser.addArgument(['--register'], {
    dest: 'command',
    action: 'storeConst',
    constant: serverCalls.register
});

parser.addArgument(['--user'], {
    dest: 'user',
    type: 'string'
});


//////////////////////
// create new chirp //
//////////////////////
parser.addArgument(['--create'], {
    dest: 'command',
    action: 'storeConst',
    constant: serverCalls.sendChirp
});

parser.addArgument(['--message'], {
    dest: 'message',
    type: 'string'
});


//////////////////
//get my chirps //
//////////////////
parser.addArgument(['--getself'], {
    dest: 'command',
    action: 'storeConst',
    constant: serverCalls.userChirps
});


////////////////////
// get all chirps //
////////////////////
parser.addArgument(['--getall'], {
    dest: 'command',
    action: 'storeConst',
    constant: serverCalls.allChirps
});


//////////////////
// delete chirp //
//////////////////
parser.addArgument(['--delete'], {
    dest: 'command',
    action: 'storeConst',
    constant: serverCalls.deleteChirp
});

parser.addArgument(['--chirpid'], {
    dest: 'chirpid',
    type: 'string'
});

///////////////
// Execution //
///////////////
var args = parser.parseArgs(process.argv.slice(2));

(function executeCommands (args) {
    if(!!args.user) {
        args.command(args.user);
    }
    else if(!!args.chirpid) {
        args.command(args.chirpid)
    }
    else if(!!args.message) {
        args.command(args.message);
    }
    else {
        args.command();
    }
})(args);
