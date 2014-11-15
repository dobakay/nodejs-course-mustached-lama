var mapper = (function() {
    'use strict';
    var localStorage = require('./storage');
    var generatekey = require('generate-key');
    var htmlgetter = require('./html-getter');
    var parser = require('./parser');
    var mapBuilder = require('./map-builder');
    var Q = require('q');

    var siteMapper = {};

    siteMapper.getSiteMap = function (id, callback ) {

    }

    siteMapper.map = function (url) {
        var mapId = generatekey.generateKey();
        // TODO: add parsing with robots module
        // TODO: save in node-persist object with content "siteMap still building"

        // TODO:
        // give the a-tags to a site-mapper function
        // store the site-map from the previous func in localStorage

        var queue = [url];
        var visitedUrls = [];
        asyncLoop(url, queue, visitedUrls, 0, 4, {}, iteration, function done(finalMap) {
            console.log(finalMap);
            console.log('done done');
        });
        // generateMap
        return mapId;
    }

    function asyncLoop (base, queue, visitedUrls, currentIndex, endIndex, map, iterationCallback, doneCallback) {
        if(currentIndex === endIndex || queue.length === 0) {
            return doneCallback(map);
        }
        iterationCallback(base, queue, visitedUrls, map, function nextIteration(base, queue, map, visitedUrls) {
            asyncLoop(base, queue, visitedUrls, ++currentIndex, endIndex, map, iterationCallback, doneCallback);
        });
    }

    function iteration (base, queue, visitedUrls, map, callback) {
        var nextUrl = queue.shift();
        visitedUrls.push(nextUrl);
        crawl(base, nextUrl, visitedUrls)
            .then(function (filteredUrls) {
                queue = queue.concat(filteredUrls);
                map[nextUrl] = filteredUrls;
                callback(base, queue, map, visitedUrls);
            });
    }

    function crawl (base, url, visitedUrls) {
        var deferred = Q.defer();
            // get the rawHTML from request
        htmlgetter.getPage(url)
            .then(function(body) {
                // parse the rawHTML in html objects
                return parser.parseHtml(body);
            })
            .then(function(dom) {
                // iterrate through the html objects and get all 'a' tags
                return mapBuilder.buildMap(base, dom, visitedUrls);
            })
            .done(function(map) {
                deferred.resolve(map);
            });
        return deferred.promise;
    }

    return siteMapper;

}());

module.exports = mapper;
