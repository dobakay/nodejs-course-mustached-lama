var http = require('http');

var server = http.createServer(function (clientReq, clientReq) {
    var options = {
        host: 'google.com',
        port: 80,
        path: clientReq.url,
        method: 'GET'
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
