var localStorage = (function() {
    'use strict';
    var storage = require('node-persist');


    var localStorage = {};
    var articles = null;
    var maxItem = null;

    localStorage.loadFromLocal = function () {
        articles = storage.getItem('articles');
        maxItem = storage.getItem('maxItem');

        if(!articles) {
            articles = {}
        }
        else {
            articles = articles;
        }
    }

    localStorage.storeInLocal = function (key, object) {
        storage.setItem(key, object);
    }

    localStorage.init = function () {
        storage.initSync({
            // getting out of node_module directory
            // and creating a file in the hackernews folder
            dir:'../../../persist',
            stringify: JSON.stringify,
            parse: JSON.parse,
            encoding: 'utf8',
            logging: false,  // can also be custom logging function
            continuous: true,
            interval: false
        });
        localStorage.loadFromLocal();
        localStorage.articles = articles;
        localStorage.maxItem = maxItem;
    };

    localStorage.init();

    return localStorage;

}());


module.exports = localStorage;
