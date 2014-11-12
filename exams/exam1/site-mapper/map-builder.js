var builder = (function() {
    'use strict';
    var select = require('soupselect').select;
    var Q = require('q');
    var builderModule = {};

    builderModule.buildMap = function (base, dom, visitedUrls) {
        var deferred = Q.defer();
        var urls = [];

        select(dom, "a").forEach(function(element) {
            if(checkUrl(base, element.attribs.href, visitedUrls)) {
                urls.push(element.attribs.href);
            }
        });
        // console.log(urls);
        deferred.resolve(urls);

        return deferred.promise;
    }

    function checkUrl (baseUrl, url, visitedUrls) {
        // apperantly some urls are returned undefined from the soupselect
        if(!!url && url.length === 1) {
            return false;
        }
        else if (!!url && url.indexOf('/') === 0 && (visitedUrls.indexOf(url) === -1)) {
            // console.log(url);

            // TODO: check baseurl contains url
            return true;
        }
        return false
    }

    return builderModule;

}());

module.exports = builder
