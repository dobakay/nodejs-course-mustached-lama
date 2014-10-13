// We need this to build our post string
var querystring = require('querystring');
var http = require('http');
var fs = require('fs');

function postCode(url, route, codestring, port) {
  // Build the post string from an object
  var post_data = querystring.stringify({
      'compilation_level' : 'ADVANCED_OPTIMIZATIONS',
      'output_format': 'json',
      'output_info': 'compiled_code',
        'warning_level' : 'QUIET',
        'js_code' : codestring
  });

  // An object of options to indicate where to post to
  var post_options = {
      host: url,
      port: port,
      path: route,
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': post_data.length
      }
  };

  // Set up the request
  var post_req = http.request(post_options, function(res) {
      res.setEncoding('utf8');
      var result = ''
      res.on('data', function (chunk) {
          // console.log('Response: ' + chunk);
          result += chunk;
      });

      res.on('end', function () {
          console.log(result);
      })
  });

  // post the data
  post_req.write(post_data);
  post_req.end();

}


function requestAllChirps (url) {
    var chirpsStr = '';

    http.get(url, function (res) {
        res.on('data', function (d) {
            chirpsStr += d;
        });
        res.on('end', function () {
            str+=os.EOL;
            console.log(str);
        });
    });
}

function requestUserChirps (url, userId) {

}

function requestChirps (url, id) { //id is either userId or chirpId

}

function sendChirp (url, user, key, chirpText) {

}

function registerUser (url, route, port, userName) {
    var obj = {
        user: userName
    };

    postCode(url, route, port, obj);
}

function getAllUsers (url) {
    var usersStr = '';

    http.get(url, function (res) {
        res.on('data', function (d) {
            usersStr += d;
        });
        res.on('end', function () {
            str+=os.EOL;
            console.log(str);
        });
    });
}

function deleteChirp (url, key, chirpId) {

}
