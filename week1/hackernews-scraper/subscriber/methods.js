var methods = (function() {
    'use strict';
    var generatekey = require('generate-key');
    var storage = require('node-persist');

    var methods = {};
    var subs = null;

    methods.init = function () {
        storage.initSync();
        loadfromLocal();
    }

    function loadfromLocal () {
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

        if(!!subs[userId]) {
            subs[userId].keyWordsSets.push(keywords);
        }
        else {
            subs[userId] = {
                subscriberId: userId,
                email: userMail,
                keyWordsSets: [keywords]
            }
        }

        console.log(subs);

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

    methods.init();

    return methods;

}());

module.exports = methods;
