var methods = require('./methods');
var router = require('./new-router');


var requestHandler = (function() {
    'use strict';

    var requestHandler = {};

    function attachingRoutes () {
        // GET
        router.get('/all_chirps', methods.getAllChirps);
        router.get('/my_chirps', methods.getUserChirps);

        // POST
        router.post('/register', methods.registerUser);
        router.post('/chirp', methods.addChirp);

        // DELETE
        router.delte('/chirp', methods.deleteChirp);
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
