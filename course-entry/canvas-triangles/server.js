var browserify = require('browserify'),
    http = require('http'),
    fs = require('fs');


fs.readFile('./index.html', function (err, html) {
    if (err) {
        throw err;
    }
    http.createServer(function(req, res) {

        if (req.url === '/') {
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        }
        else if (req.url === '/bundle.js') {
            res.setHeader('content-type', 'application/javascript');
            var b = browserify(__dirname + '/app.js').bundle();
            b.on('error', console.error);
            b.pipe(res);
        }
        else res.writeHead(404, 'not found')
    }).listen(8000);
    console.log('server running on port 8000');
});
