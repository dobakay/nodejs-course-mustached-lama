var parserModule = (function() {
    'use strict';
    var htmlparser = require("htmlparser");
    var Q = require('q');
    var parserModule = {};

    parserModule.parseHtml = function (html) {
        var handler = new htmlparser.DefaultHandler(function (error, dom) {
            if(!error) {
                return dom;
            }
            else {
                throw error;
            }
        });
        var deferred = Q.defer();
        var parser = new htmlparser.Parser(handler);
        parser.parseComplete(html);

        deferred.resolve(handler.dom);

        return deferred.promise;
    }

    return parserModule;

}());

module.exports = parserModule;
