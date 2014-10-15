var methods = (function() {
    'use strict';

    var methods = {};

    var chirps = [];
    var users = {};


    ///////////////////////
    // Helper functions  //
    ///////////////////////
    function makeid()
    {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    function generateChirpId () {
        return makeid();
    }

    function generateUserId () {
        return makeid();
    }

    function userAlreadyRegistered (userName) {
        var isRegistered = false;
        for(var userId in users) {
            if(users[userId].userName === userName) {
                isRegistered = true;
                break;
            }
        }
        return isRegistered;
    }

    function filterChirpsByIdOrUserId (id) {
        var filteredById = chirps.filter(function(chirp){
            chirp.chirpId === id;
        });
        var filteredByUserId = chirps.filter(function(chirp){
            chirp.userId === id;
        });

        return filteredById.concat(filteredByUserId);
    }

    ////////////////////
    // Main Functions //
    ////////////////////


    methods.addChirp = function (user, key, text) {
        var chirpId = generateChirpId();
        chirps.unshift({
            chirpId: chirpId,
            userName: user,
            userId: key,
            chirpText: text
            chipTime: Date.now()
        });
        return chirpId;
    }

    methods.getAllChirps = function () {
        return chirps;
    }

    methods.getUserChirps = function (userId) {
        var userChirps = [];
        for (var i = 0; i < chirps.length; i++) {
            if(chirps[i].userId === userId) {
                userChirps.push(chirps[i]);
            }
        };
        return userChirps;
    }

    methods.getUserChirpsCount = function (userId) {
        var counter = 0;
        for (var i = 0; i < chirps.length; i++) {
            if(chirps[i].userId === userId) {
                counter++;
            }
        }
        return counter;
    }

    methods.getUsers = function () {
        var returnedUsers = users;
        for (var i = 0; i < returnedUsers.length; i++) {
            returnedUsers[i].chirps = methods.getUserChirpsCount(returnedUsers[i].userId);
        }
        return returnedUsers;
    }

    methods.getChirps = function (id) {
        var filteredChirps = filterChirpsByIdOrUserId(id);
        return filteredChirps;
    }

    methods.registerUser = function (userName) {
        if(userAlreadyRegistered(userName)) {
            var err = 'User with name ' + userName + ' is already registed';
            throw {
                message: err,
                type: 'userError'
            }
        }
        else {
            var userId = generateUserId();
            users.userId = {
                userId: userId,
                userName: userName
            }
            return {
                userId: userId,
                userName: userName
            }
        }
    }

    methods.deleteChirp = function (chirpId, userId) {
        var chirpIndex = null,
            removedChirp = null;

        for (var i = 0; i < chirps.length; i++) {
            if((chirps[i].chirpId === chiprId) &&
                (chiprs[i].userId === userId)) {
                chirpIndex = i;
                break;
            }
        };

        if(chirpIndex !== null) {
            removedChirp = chirps.splice(chirpIndex, 1);
            return removedChirp;
        }
        else {
            var err = 'No chirp with id ' + chirpId + ' and userId ' + userId;
            throw {
                message: err,
                type: 'chirpError'
            }
        }
    }

    methods.getState = function () {
        return {
            chirps: chirps,
            users: users
        }
    }

    return methods;

}());


module.exports = methods;
