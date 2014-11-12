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
        var counter = 1;
        var nextUrl = null;
        while( queue.length > 0 && counter < 500) {
            nextUrl = queue.shift();
            visitedUrls.push(nextUrl);
            crawl(url, nextUrl, visitedUrls)
                .then(function (filteredUrls) {
                    console.log(filteredUrls);
                    queue = queue.concat(filteredUrls);
                    counter++;
                });
        }
        return mapId;
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
