var methods = (function() {
    'use strict';
    var generatekey = require('generate-key');
    var localStorage = require('../localStorage.js');

    var methods = {};
    var subs = localStorage.subscribers;

    methods.subscribeUser = function(userMail, keywords, notificationType) {
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
                    keyWordsSetId: keywords
                },
                type: notificationType
            }
        }

        localStorage.storeInLocal('subscribers', subs);

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

            localStorage.storeInLocal('subscribers', subs);

            return true;
        }
    }

    methods.getAllSubscribers = function() {
        var subsList = [];
        for (var key in subs) {
            subsList.push(subs[key]);
        }

        return subsList;
    }

    return methods;

}());

module.exports = methods;
