var curl = require('curlrequest');
var fs = require('fs');
var config = null;

(function loadConfig () {
    config = (JSON.parse(fs.readFileSync("./config.json", "utf8")));
})();


function requestAllChirps () {
    var options = {
        url: config.url + '/all_chirps',
        method: 'GET'
    };

    curl.request(options, function (err, file) {
        //file is a Buffer
    });
}

function requestUserChirps (userId) {
    var options = {
        url: config.url + '/my_chirps',
        method: 'GET',
        headers: {
          queryString: {
             key: userId
          }
       }
    };

    curl.request(options, function (err, file) {
        //file is a Buffer
    });
}

function requestChirps (id) { //id is either userId or chirpId
    var options = {
        url: config.url + '/chirps',
        method: 'GET',
        headers: {
          queryString: {
             id: userId
          }
       }
    };

    curl.request(options, function (err, file) {
        //file is a Buffer
    });
}

function sendChirp (chirpText) {
    var options = {
        url: config.url + '/chirp',
        method: 'POST',
        headers: {
          queryString: {
             user: userId,
             key: userkey,
             chirpText: chirpText
          }
       }
    };

    curl.request(options, function (err, file) {
        //file is a Buffer
    });
}

function registerUser (userName) {
    console.log(config);
    var options = {
        url: config.url + 'register',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            queryString: {
               user: userName
            }
       }
    };

    curl.request(options, function (err, file) {
        //file is a Buffer
        file = file.split('\r\n');
        console.log(file);
    });
}

function getAllUsers () {
    var options = {
        url: config.url + '/all_users',
        method: 'GET',
    };

    curl.request(options, function (err, file) {
        //file is a Buffer
    });
}

function deleteChirp (chirpId) {
    var options = {
        url: config.url + '/chirp',
        method: 'DELETE',
    };

    curl.request(options, function (err, file) {
        //file is a Buffer
    });
}


module.exports = {
    allChirps: requestAllChirps,
    userChirps: requestUserChirps,
    chirps: requestChirps,
    sendChirp: sendChirp,
    register: registerUser,
    allUsers: getAllUsers,
    deleteChirp: deleteChirp
};
