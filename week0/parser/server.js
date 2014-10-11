var fs = require('fs');
var path = require('path');
var os = require('os');
var https = require('https');
var url = require('url');
var ArgumentParser =  require('argparse').ArgumentParser;


function removeBrackets (string) {
    return string.replace(/[\[\]']+/g, '');
}

function removeSpaces (string) {
    return string.replace(/ /g,'');
}

function parseField (string) {
    var trimmedSpaces = removeSpaces(string),
        keyVal = trimmedSpaces.split('=');
    for (var i = 0; i < keyVal.length; i++) {
        keyVal[i] = removeSpaces(keyVal[i]);
    };
    return keyVal;
}


function parseIniFileToJson (data) {
    var resultJson = {},
        lastInnerObj = null;
    for (var lineIndex = 0; lineIndex < data.length; lineIndex++) {
        if(data[lineIndex].indexOf('[') !== -1) {
            lastInnerObj = removeBrackets(data[lineIndex]); //returns string
            resultJson[lastInnerObj] = {};
        }
        if(data[lineIndex].indexOf('=') !== -1) {
            var keyVal = parseField(data[lineIndex]); //returns arr [key, val]
            resultJson[lastInnerObj][keyVal[0]] = keyVal[1];
        }
    }

    return resultJson;
}

function writeRemoteFile (text, fileUrl) {
    var n = fileUrl.lastIndexOf('/'),
        fileName = fileUrl.substring(n + 1).split('.')[0],
        json = buildFileContent(text, fileName);
    createJsonFile(json, fileName.split('.')[0] + '.json');
}

function getINIFileRemote ( fileUrl ) {
    var str = '';
    https.get(fileUrl, function(res) {
        res.on('data', function(d) {
            str+=d;
        });
        res.on('end',function(){
            str+=os.EOL;
            writeRemoteFile(str, fileUrl);
        })
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
}

function buildFileContent (text) {
    var bufferStringSplit = text.split(os.EOL);
    return parseIniFileToJson(bufferStringSplit);
}



function buildJsonFileContent (obj) {
    var linesArray = [];
    var objKeys = Object.keys(obj);
    for (var i = 0; i < objKeys.length; i++) {
        var currentKey = objKeys[i];
        linesArray.push('[' + currentKey + ']');
        // console.log(currentKey)

        var innerObjKeys = Object.keys(obj[currentKey]);
        for (var j = 0; j < innerObjKeys.length; j++) {
            linesArray.push(innerObjKeys[j] + '=' + obj[currentKey][ innerObjKeys[j] ]);
        };

        linesArray.push(os.EOL);
    };
    return linesArray;
}


function getJSONFileLocal (fileName, encoding) {
    var filePath = path.join(__dirname, fileName);
    if ( encoding === undefined ) {
        encoding = {encoding: 'utf-8'}
    }

    fs.readFile(filePath, encoding, function(err,data){
        if( err ) {
            console.log(err);
        }
        var ini = buildJsonFileContent(JSON.parse(data));
        console.log(ini);
        createIniFile(ini, fileName.split('.')[0] + '.ini');
    });
}

function createIniFile (linesArray, fileName) {
    var filePath = path.join(__dirname, fileName);
    fs.writeFile(filePath, '', {encoding: 'utf-8'}, function(err) {
        for (var i = 0; i < linesArray.length; i++) {
            fs.appendFileSync(filePath, linesArray[i] + os.EOL);
        };
    });
}

function getINIFileLocal ( fileName, encoding ) {
    var filePath = path.join(__dirname, fileName);

    if ( encoding === undefined ) {
        encoding = {encoding: 'utf-8'}
    }

    fs.readFile(filePath, encoding, function(err,data){
        if( err ) {
            console.log(err);
        }
        var json = buildFileContent(data);
        createJsonFile(json, fileName.split('.')[0] + '.json');
    });
}

function createJsonFile (json, fileName) {
    var filePath = path.join(__dirname, fileName);
    fs.writeFile(filePath,JSON.stringify(json, null, 4),function(err) {
        console.log('DONE');
    })
}

function parseFlagsAndGetfile () {
    var ArgumentParser = require('../lib/argparse').ArgumentParser;
    var parser = new ArgumentParser({
      version: '0.0.1',
      addHelp: true,
      description: 'Argparse examples: arguments'
    });
    parser.addArgument(
      [ '-f', '--foo' ],
      {
        help: 'foo bar'
      }
    );
    parser.addArgument(
      [ '-b', '--bar' ],
      {
        help: 'bar foo'
      }
    );


    parser.printHelp();
    console.log('-----------');

    var args;
    args = parser.parseArgs('-f 1 -b2'.split(' '));
    console.dir(args);
    console.log('-----------');
    args = parser.parseArgs('-f=3 --bar=4'.split(' '));
    console.dir(args);
    console.log('-----------');
    args = parser.parseArgs('--foo 5 --bar 6'.split(' '));
    console.dir(args);
    console.log('-----------');
}


function main (fileName) {
    // if(fileName.indexOf('http') !== -1) {
    //     getINIFileRemote(fileName);
    // }
    // else if( fileName.indexOf('.') !== -1){
    //     if(fileName.split('.')[1] === 'ini') {
    //         getINIFileLocal(fileName);
    //     }
    //     else if(fileName.split('.')[1] === 'json') {
    //         getJSONFileLocal(fileName);
    //     }
    // }
    // else {
        parseFlagsAndGetfile();
    // }
}

main(process.argv[2]);
