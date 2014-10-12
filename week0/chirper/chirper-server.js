var walter = require('./walter/walter');
var methods = require('./methods');
'use strict';

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


////////////////////////
// Attaching Routing  //
////////////////////////


(function initChirper () {
    // GET /all_chirps - returns all the chirps for all the users we have. Newest chirps should be first.
    walter.get('/all_chirps', function (request, response) {
        console.log(request);

        // var allChirps = methods.getAllChirps();
        // returnDataResponse(response, allChirps);
    });
    // GET /my_chirps - expects user and key as arguments. Returns all chirps of user
    walter.get('/my_chirps', function (request, response) {
        console.log(request);
        // var userChirps = methods.getUserChirps(user, key);
        // returnDataResponse(reponse, userChirps);
    });
    // GET /chirps - expects either chirpId or userId as an argument. If given both ignores chirpId. Returns a list of chirps.
    walter.get('/chirps', function (request, response) {
        console.log(request);
        // var chirps = methods.getChirps(id); // returns an array of chirps even if the specified id is of a single chirp
        // returnDataResponse(response, chirps);
    });
    // GET /all_users - returns all the registered users.
    walter.get('/get_users', function (request, response) {
        console.log(request);
        // var users = methods.getAllUsers();
        // returnDataResponse(response, users);
    });

    // POST /register - expects user as argument. Creates a new user and returns a key for that user. If
    // the user already exists just returns a 409 response code.
    walter.post('/register', function (request, response) {
        var json = JSON.parse(request.payload);
        try {
            var userInfo = methods.registerUser(json.user);
            console.log(userInfo);
            returnDataResponse(response, {key: userInfo.userId});
        }
        catch(err) {
            returnErrorResponse(response, 409, err);
        }
    });
    // POST /chirp - expects user, key and chirpText arguments. Creates a new chirp on behalf of user and
    // returns a chirpId, which should be unique for every chirp!
    walter.post('/chirp', function (request, response) {
        var json = JSON.parse(request.payload),
            user = json.user,
            key = json.key,
            chirpText = json.chirpText;
        console.log(request);

        var chirpId = methods.addChirp(user, key, chirpText);
            returnDataResponse(response, {chirpId: chirpId});
    });

    // DELETE /chirp - expects key and chirpId as arguments. Deletes the chirp with the given id if the
    // key matches the key of the chirp owner. Otherwise returns a 403 response code.
    walter.delete('/chirp', function (request, response) {
        console.log(request);
        // try {
        //     var chirp = methods.deleteChirp(key, chirpId);
        //     returnDataResponse(response, {removedChirp: chirp});
        // }
        // catch(err) {
        //     returnErrorResponse(response, 403, err);
        // }
    });



    walter.serve(1337);
})();


