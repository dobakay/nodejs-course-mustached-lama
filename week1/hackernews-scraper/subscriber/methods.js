var methods = (function() {
    'use strict';
    var generatekey = require('generate-key');
    var storage = require('node-persist');

    var methods = {};
    var subs = null;

    (function init () {
        storage.initSync({
            dir:'../persist',
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
        subs = storage.getItem('subs');

        if(!subs) {
            subs = {}
        }
        else {
            subs = JSON.parse(subs);
        }
    }

    function storeInLocal (newJsonState) {
        storage.setItem('subscribers', JSON.stringify(newJsonState));
    }

    methods.subscribeUser = function(userMail, keywords) {
        var userId = generatekey.generateKey();
        var keyWordsSetId = generatekey.generateKey();

        if(!!subs[userId]) {
            subs[userId].keyWordsSets[keyWordsSetId] = keywords;
        }
        else {
            subs[userId] = {
                subscriberId: userId,
                email: userMail,
                keyWordsSets: {
                    keyWordsSetId: keywords;
                }
            }
        }

        // storing in localStorage the newSubsState
        storeInLocal(subs);

        return {
            email: userMail,
            subscriberId: userId
        }
    }

    methods.unSubscribeUser = function (subscriberId) {
        if(!subs[subscriberId]) {
            throw {
                message: 'No subscriber with id: ' + subscriberId,
                type: 'MethodsException'
            }
        }
        else {
            delete subs[subscriberId];

            storeInLocal(subs);

            return true;
        }
    }

    methods.getAllSubscribers = function() {
        var subsList = [];
        console.log('test');
        for (var key in subs) {
            subsList.push(subs[key]);
        }

        return subsList;
    }

    return methods;

}());

module.exports = methods;
