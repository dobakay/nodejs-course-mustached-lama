var methods = require('./methods');
var router = require('./router');


var requestHandler = (function() {
    'use strict';

    var requestHandler = {};

    ///////////////////////////////
    // Inner Response Functions  //
    ///////////////////////////////

    function returnDataResponse (response, responseData) {
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(responseData, null, 3));
    }

    function returnErrorResponse (response, statusCode, error) {
        response.writeHead(statusCode, error.message, {'Content-Type': 'text/html'});
        response.end();
    }

    function returnDefaultResponse (response) {
        response.writeHead(200, "OK", {'Content-Type': 'text/html'});
        response.end();
    }

    //////////////////////
    // Attaching Rouing //
    //////////////////////

    function attachingRoutes () {
        // NOTE: response is always the first argument for the callbacks

        // GET /all_chirps - returns all the chirps for all the users we have. Newest chirps should be first.
        router.get('/all_chirps', function (response) {
            var allChirps = methods.getAllChirps();
            returnDataResponse(response, allChirps);
        });
        // GET /my_chirps - expects user and key as arguments. Returns all chirps of user
        router.get('/my_chirps', function (response, user, key) {
            var userChirps = methods.getUserChirps(user, key);
            returnDataResponse(reponse, userChirps);
        });
        // GET /chirps - expects either chirpId or userId as an argument. If given both ignores chirpId. Returns a list of chirps.
        router.get('/chirps', function (response, id) {
            var chirps = methods.getChirps(id); // returns an array of chirps even if the specified id is of a single chirp
            returnDataResponse(response, chirps);
        });
        // GET /all_users - returns all the registered users.
        router.get('/get_users', function (response) {
            var users = methods.getAllUsers();
            returnDataResponse(response, users);
        });

        // POST /register - expects user as argument. Creates a new user and returns a key for that user. If
        // the user already exists just returns a 409 response code.
        router.post('/register', function (response, user) {
            try {
                var userId = methods.registerUser(user);
                returnDataResponse(response, {key: userId});
            }
            catch(err) {
                returnErrorResponse(response, 409, err);
            }
        });
        // POST /chirp - expects user, key and chirpText arguments. Creates a new chirp on behalf of user and
        // returns a chirpId, which should be unique for every chirp!
        router.post('/chirp', function (response, user, key, chirpText) {
            var chirpId = methods.addChirp(user, key, chirpText);
                returnDataResponse(response, {chirpId: chirpId});
        });

        // DELETE /chirp - expects key and chirpId as arguments. Deletes the chirp with the given id if the
        // key matches the key of the chirp owner. Otherwise returns a 403 response code.
        router.delete('/chirp', function (response, key, chirpId) {
            try {
                var chirp = methods.deleteChirp(key, chirpId);
                returnDataResponse(response, {removedChirp: chirp});
            }
            catch(err) {
                returnErrorResponse(response, 403, err);
            }
        });
    }

    /////////////////////////////
    // Main Handler Functions  //
    /////////////////////////////

    requestHandler.serve = function (requestData) {
        if(requestData.body === '') {
            requestData.body = undefined;
        }
        router.process(requestData);
    }

    requestHandler.init = function () {
        attachingRoutes();
    }

    return requestHandler;

}());

requestHandler.init();

module.exports = requestHandler;
