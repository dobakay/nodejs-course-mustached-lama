var htmlgetter = (function() {
    'use strict';
    var request = require('request');
    var Q = require('q');

    var getter = {};
    var defaultCallback = null;

    getter.getPage = function (url, callback) {
        var deferred = Q.defer();
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                deferred.resolve(body);
            }
            else {
                deferred.reject(error);
            }
        });

        return deferred.promise;
    }

    return getter;

}());


module.exports = htmlgetter;
