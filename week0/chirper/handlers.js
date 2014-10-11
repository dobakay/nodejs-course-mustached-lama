var methods = require('./methods');
var router = require('./router');


var requestHandler = (function() {
    'use strict';

    var requestHandler = {};

    function attachingRoutes () {
        // NOTE: response is always the first argument for the callbacks
        // GET
        router.get('/all_chirps', function (response, args) {
            methods.getAllChirps();
        });
        router.get('/my_chirps', function (response, args) {
            methods.getUserChirps();
        });

        // POST
        router.post('/register', function (response, args) {
            methods.registerUser();
        });
        router.post('/chirp', function (response, args) {
            methods.addChirp();
        });

        // DELETE
        router.delte('/chirp', function (response, args) {
            methods.deleteChirp();
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
    }

    requestHandler.serve = function (requestData) {
        router.process(requestData);
    }

    requestHandler.init = function () {
        attachingRoutes();
    }

    return requestHandler;

}());

requestHandler.init();
module.exports = requestHandler;
