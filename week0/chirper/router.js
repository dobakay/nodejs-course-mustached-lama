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

    /**
     * Executes one of the predefined actions depending on the given parameters object in the process function.
     * @param  {[type]} method       'GET/POST/PUT/DELETE'
     * @param  {[type]} url          '/example/url'. Url that we get from the http request object.
     * @param  {[type]} callbackArgs callbackArgs[0] is always a http response object.
     *                               The rest are fields of the json object passed with the request (if such an object
     *                               was passed)
     * @return {[type]}              [description]
     */
    function executeCallback (method, url, response, callbackArgs) {
        if(!!requests[method]) {
            throw new RouterException('HTTP Method not found.');
        }
        else {
            if(!!requests[method].callbacks[url]) {
                throw new RouterException('HTTP Method with url "' + url + '" was not found.');
            }
            if(!!callbackArgs) {
                requests[method].callbacks[url](response);
            }
            else {
                callbackArgs.unshift(response);
                requests[method].callbacks[url].apply(null, callbackArgs);
            }
        }
    }

    function convertJsonToArguments (jsonObj) {
        return Object.keys(jsonObj).map(function (key) {return jsonObj[key]});
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
            response = request.response;
            data = request.body,
            args = null;

        if(!!data || data === '') {
            data = JSON.parse(data);
            args = convertJsonToArguments(data);
        }

        try {
            executeCallback(method, url, response, args);
        }
        catch(err) {
            console.log(err.type);
            console.log(err.message);
            console.log(err.internalMessage);
        }
        finally() {

        }
    }

    return router;

}());


module.exports = router;
