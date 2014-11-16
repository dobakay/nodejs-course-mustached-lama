var mapper = (function() {
    'use strict';
    var localStorage = require('./storage');
    var generatekey = require('generate-key');
    var htmlgetter = require('./html-getter');
    var parser = require('./parser');
    var robots = require('./robots');
    var mapBuilder = require('./map-builder');
    var Q = require('q');

    var siteMapper = {};

    var _startCrawlingIterrationIndex = 0;
    var _crawledPagesCount = 4;

    siteMapper.getSiteMap = function (id, callback ) {
        var map = localStorage.getFromLocal(id);
        callback(map);
    }

    siteMapper.map = function (url) {
        var mapId = generatekey.generateKey();
        robots.init(url)
            .then(function () {

                var queue = [url];
                var map = {
                    "id": mapId,
                    "status": "building",
                    "sitemap": {}
                };
                var visitedUrls = [];
                localStorage.storeInLocal(mapId, map);
                asyncLoop(url, queue, visitedUrls, _startCrawlingIterrationIndex, _crawledPagesCount, map, iteration, function done(finalMap) {
                    map.status = "done";
                    map.sitemap = finalMap;
                    console.log('done done');
                    localStorage.storeInLocal(mapId, map);
                });
            });

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
        robots.checkUrl(nextUrl, function(accessGranted) {
            if(accessGranted) {
                visitedUrls.push(nextUrl);
                crawl(base, nextUrl, visitedUrls)
                    .then(function (filteredUrls) {
                        queue = queue.concat(filteredUrls);
                        map.sitemap[nextUrl] = filteredUrls;
                        callback(base, queue, map, visitedUrls);
                    });
            }
            else {
                console.log('Can not access url:' + nextUrl);
            }
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
