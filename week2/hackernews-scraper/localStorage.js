var localStorage = (function() {
    'use strict';
    var storage = require('node-persist');


    var localStorage = {};
    var items = null;
    var maxItem = null;
    var subscribers = null;

    localStorage.loadFromLocal = function () {
        items = storage.getItem('items');
        maxItem = storage.getItem('maxItem');
        subscribers = storage.getItem('subscribers')

        if(!items) {
            items = {}
        }

        if(!subscribers) {
            subscribers = {};
        }
    }

    localStorage.storeInLocal = function (key, object) {
        storage.setItem(key, object);
    }

    localStorage.init = function () {
        storage.initSync({
            // getting out of node_module directory
            // and creating a file in the hackernews folder
            dir:'../../persist',
            stringify: JSON.stringify,
            parse: JSON.parse,
            encoding: 'utf8',
            logging: false,  // can also be custom logging function
            continuous: true,
            interval: false
        });
        localStorage.loadFromLocal();
        localStorage.items = items;
        localStorage.maxItem = maxItem;
        localStorage.subscribers = subscribers;
    };

    localStorage.init();

    return localStorage;

}());


module.exports = localStorage;
