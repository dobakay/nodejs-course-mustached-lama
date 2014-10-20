var localStorage = (function() {
    'use strict';
    var storage = require('node-persist');


    var localStorage = {};
    var articles = null;

    localStorage.loadFromLocal = function () {
        articles = storage.getItem('articles');

        if(!articles) {
            articles = {}
        }
        else {
            articles = articles;
        }
    }

    localStorage.storeInLocal = function (newJsonState) {
        storage.setItem('articles', newJsonState);
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
    };

    localStorage.init();

    return localStorage;

}());


module.exports = localStorage;
