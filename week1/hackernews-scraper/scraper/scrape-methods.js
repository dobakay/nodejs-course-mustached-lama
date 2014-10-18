var methods = (function() {
    'use strict';
    var generatekey = require('generate-key');
    var storage = require('node-persist');


    var methods = {};
    var articles = null;

    (function init () {
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
        loadFromLocal();
    })();

    function loadFromLocal () {
        articles = storage.getItem('articles');

        if(!articles) {
            articles = {}
        }
        else {
            articles = articles;
        }
    }

    function storeInLocal (newJsonState) {
        storage.setItem('articles', newJsonState);
    }


    return methods;

}());
