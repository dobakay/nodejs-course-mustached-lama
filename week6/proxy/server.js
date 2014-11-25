var http = require('http');
var url = require('url');

var server = http.http.createServer(function (clientReq, clientReq) {
    var urlParts = url.parse(clientReq.url);
    var options = {
        host: 'google.com',
        port: 80,
        path: urlParts.pathname,
        method: clientReq.method,
        headers: clientReq.headers
    };

    var proxy = http.request(options, function (serverRes) {
        serverRes.pipe(clientRes, {
            end: true
        });
    });

    clientReq.pipe(proxy, {
        end: true
    });

});


server.listen(8000);
