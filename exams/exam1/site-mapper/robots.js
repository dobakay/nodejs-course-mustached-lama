var robotsModule = (function() {
    'use strict';
    var robots = require('robots');
    var Q = require('q');
    var robotsModule = {};
    var parser = null;

    robotsModule.init = function (url) {
        var deferred = Q.defer();
        parser = new robots.RobotsParser();
        parser.setUrl( url + '/robots.txt', function(parserObj, success) {
            if(success) {
                deferred.resolve();
            }
        });
        return deferred.promise;
    }

    robotsModule.checkUrl = function (url, doneCallback) {
        parser.canFetch('*', url, doneCallback);
    }


    return robotsModule;

}());


module.exports = robotsModule;
