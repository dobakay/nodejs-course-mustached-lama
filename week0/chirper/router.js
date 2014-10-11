var methods = require('./methods');


// GET /all_chirps - returns all the chirps for all the users we have. Newest chirps should be first.
// POST /chirp - expects user, key and chirpText arguments. Creates a new chirp on behalf of user
// POST /register - expects user as argument. Creates a new user and returns a key for that user. If the user already exists just returns a 409 response code.
// GET /my_chirps - expects user and key as arguments. Returns all chirps of user
// DELETE /chirp - expects key and chirpId as arguments. Deletes the chirp with the given id if the key matches the key of the chirp owner. Otherwise returns a 403 response code.

function router (request) {
    var res = null,
        finalResult = null;
    try {
        switch(request.method) {
            case 'GET':
                if(request.url.indexOf('/all_chirps') !== -1) {
                    res = methods.getAllChirps();
                }
                else if(request.url.indexOf('/my_chirps') !== -1) {
                    var data = JSON.parse(request.body);
                    res = methods.getUserChirps(data.user, data.key);
                }
            break;
            case 'POST':
                if(request.url.indexOf('/register') !== -1) {
                    var data = JSON.parse(request.body);
                    res = methods.registerUser(data.user);
                }
                if(request.url.indexOf('/chirp') !== -1) {
                    var data = JSON.parse(request.body);
                    res = methods.addChirp(data.name, data.key, data.chirpText);
                }
            break;
            case 'DELETE':
                if(request.url.indexOf('/chirp') !== -1) {
                    var data = JSON.parse(request.body);
                    res = methods.deleteChirp(data.chirpid, data.key);
                }
            break;

        }

        finalResult = {
            err: null,
            res: res
        };
    }
    catch(err) {
        finalResult = {
            err: err,
            res: null
        }
    }
    finally {
        console.log(methods.getState());
        return finalResult;
    }
}

module.exports = router;

