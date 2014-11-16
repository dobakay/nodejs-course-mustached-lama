var localStorage = (function() {
    'use strict';
    var storage = require('node-persist');


    var localStorage = {};
    var maps = null;

    localStorage.storeInLocal = function (key, object) {
        storage.setItem(key, object);
    }

    localStorage.getFromLocal = function (key) {
        return storage.getItem(key);
    }

    localStorage.init = function () {
        storage.initSync({
            // getting out of node_module directory
            dir:'../../persist',
            stringify: JSON.stringify,
            parse: JSON.parse,
            encoding: 'utf8',
            logging: false,  // can also be custom logging function
            continuous: true,
            interval: false
        });
    };

    localStorage.init();

    return localStorage;

}());


module.exports = localStorage;
