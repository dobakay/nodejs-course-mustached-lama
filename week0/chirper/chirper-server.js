var http = require('http');
var handler = require('./handler');

var server = http.createServer(function (req, res) {
    var payload = '';
    req.on('data', function (chunk) {
        payload += chunk;
    });

    req.on('end', function () {
        handler.serve({
            response: res,
            body: payload,
            method: req.method,
            url: req.url
        });
    });
});

server.listen(9000);

