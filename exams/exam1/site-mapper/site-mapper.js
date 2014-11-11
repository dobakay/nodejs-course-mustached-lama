var mapper = (function() {
    'use strict';
    var localStorage = require('./storage');
    var generatekey = require('generate-key');
    var htmlgetter = require('./html-getter');
    var parser = require('./parser');
    var Q = require('q');

    var siteMapper = {};

    siteMapper.getSiteMap = function (id, callback ) {

    }

    siteMapper.map = function (url) {
        var mapId = generatekey.generateKey();
        // TODO: add parsing with robots module
        // TODO: save in node-persist object with content "siteMap still building"

        // get the rawHTML from request
        // parse the rawHTML in html objects
        // soup through the html objects and get all 'a' tags
        // give the a-tags to a site-mapper function
        // store the site-map from the previous func in localStorage
        htmlgetter.getPage(url)
            .then(function(body) {
                return parser.parseHtml(body);
            })
            .then(function(parsedObjects) {
                console.log(parsedObjects);
            })
            .fail(function (err) {
                console.log(err);
            })
        return mapId;
    }

    return siteMapper;

}());

module.exports = mapper;
