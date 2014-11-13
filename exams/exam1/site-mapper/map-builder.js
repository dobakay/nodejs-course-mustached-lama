var builder = (function() {
    'use strict';
    var select = require('soupselect').select;
    var Q = require('q');
    var urlParse = require('url');
    var builderModule = {};

    builderModule.buildMap = function (base, dom, visitedUrls) {
        var deferred = Q.defer();
        var urls = [];

        select(dom, "a").forEach(function(element) {
            if(checkUrl(base, element.attribs.href, visitedUrls)) {
                if(element.attribs.href.indexOf('/') === 0) {
                    urls.push(urlParse.parse(base).hostname + element.attribs.href);
                }
                else {
                    urls.push(element.attribs.href);
                }
            }
        });
        // console.log(urls);
        deferred.resolve(urls);

        return deferred.promise;
    }

    function checkUrl (baseUrl, url, visitedUrls) {
        // apperantly some urls are returned undefined from the soupselect
        if(!!url && url.length === 1) {
            // case when href is '/' or '#'
            return false;
        }
        else if (!!url && url.indexOf('/') === 0 && (visitedUrls.indexOf(url) === -1)) {
            // console.log('partial url: ' + url);
            // case when we have some relative path /route/to/something
            return true;
        }
        else if(!!url && urlParse.parse(baseUrl).hostname === urlParse.parse(url).hostname) {
            // console.log('full url: ' + url);
            // case where we have a full url 'http://www.url.com/example'
            return true;
        }
        return false
    }

    return builderModule;

}());

module.exports = builder
