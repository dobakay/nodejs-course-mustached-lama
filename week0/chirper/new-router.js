var router = (function() {
    'use strict';

    var router = {};

    var requests = {};

    ///////////////////////////////////
    // Generic Router Exception Def  //
    ///////////////////////////////////

    function RouterException (message, internalMessage) {
        this.type = 'RouterException';
        this.message = message;
        this.internalMessage = internalMessage || null;
    }

    ////////////////////////
    // Internal Functions //
    ////////////////////////

    function addMethod (method, url, callback) {

        if(!!requests[method]) {
            requests[method] = {
                callbacks: {}
            }
        }
        requests[method].callbacks[url] = callback;
    }

    function executeCallback (method, url, callbackArgs) {
        if(!!requests[method]) {
            throw new RouterException('HTTP Method not found.');
        }
        else {
            if(!!requests[method].callbacks[url]) {
                throw new RouterException('HTTP Method with url "' + url + '" was not found.');
            }
            if(!!callbackArgs) {
                requests[method].callbacks[url]();
            }
            else {
                requests[method].callbacks[url].apply(null, callbackArgs);
            }
        }
    }

    function convertJsonToArguments (jsonObj) {
        var argsArr = [];
        for(var key in jsonObj) {
            argsArr.push(jsonObj[key]);
        }
        return argsArr;
    }

    ////////////////////////////////
    // EXPRESS-like API functions //
    ////////////////////////////////

    router.get = function (url, callback) {
        if(!!url && !!callback) {
            throw new RouterException('Url, or callback is undefined or null.');
        }
        addMethod('GET', url, callback);
    }

    router.post = function (url, callback) {
        if(!!url && !!callback) {
            throw new RouterException('Url, or callback is undefined or null.');
        }
        addMethod('POST', url, callback);
    }

    router.put = function (url, callback) {
        if(!!url && !!callback) {
            throw new RouterException('Url, or callback is undefined or null.');
        }
        addMethod('PUT', url, callback);
    }

    router.delete = function (url, callback) {
        if(!!url && !!callback) {
            throw new RouterException('Url, or callback is undefined or null.');
        }
        addMethod('DELETE', url, callback);
    }

    router.process = function (request) {
        var method = request.method,
            url = request.url,
            data = request.body,
            args = null,

            res = null,
            result = null;

        if(!!data || data === '') {
            data = JSON.parse(data);
            args = convertJsonToArguments(data);
        }

        try {
            res = executeCallback(method, url, args);
            result = {
                err: null,
                res: res
            }
        }
        catch(err) {

        }
        finally() {

        }
    }

    return router;

}());


module.exports = router;
