var http = require('http');
var handler = require('./handler');

var server = http.createServer(function (req, res) {
    var payload = '';
    req.on('data', function (chunk) {
        payload += chunk;
    });

    req.on('end', function () {
        handler.serve({
            body: payload,
            method: req.method,
            url: req.url
        });

        // if(result.err) {
        //     switch(result.err.type){
        //         case 'userError':
        //             res.writeHead(409, result.err.message, {'Content-Type': 'text/html'});
        //             res.end();
        //         break;
        //         case 'chirpError':
        //             res.writeHead(403, result.err.message, {'Content-Type': 'text/html'});
        //             res.end();
        //         break;
        //     }
        // }
        // else if(result.res) {
        //     res.setHeader('Content-Type', 'application/json');
        //     res.end(JSON.stringify(result.res, null, 3));
        // }
        // else {
        //     res.writeHead(200, "OK", {'Content-Type': 'text/html'});
        //     res.end();
        // }
    })
});

server.listen(9000);

