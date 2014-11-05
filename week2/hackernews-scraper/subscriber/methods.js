var methods = (function() {
    'use strict';
    var generatekey = require('generate-key');
    var localStorage = require('../localStorage.js');

    var methods = {};
    var subs = localStorage.subscribers;

    function getUserIdByEmail (userMail) {
        for(var subId in subs) {
            if(subs[subId].email === userMail) {
                return subId;
            }
        }
        return null;
    }

    function areKeywordSetsEqual (keywordSet1, keywordSet2) {
        if(keywordSet1.length !== keywordSet2.length) {
            return false;
        }
        for (var i = 0; i < keywordSet1.length; i++) {
            if(keywordSet1[i] !== keywordSet2[i]) {
                return false;
            }
        }
        return true;
    }

    function checkUserContainsKeywords (user, keywords) {
        for (var setKey in user.keyWordsSets) {
            if( areKeywordSetsEqual(user.keyWordsSets[setKey], keywords)) {
                return true;
            }
        }
        return false;
    }

    methods.subscribeUser = function(userMail, keywords, notificationType) {
        var userId = getUserIdByEmail(userMail);
        if(!userId) {
            userId = generatekey.generateKey();
            subs[userId] = {
                subscriberId: userId,
                email: userMail,
                keyWordsSets: {},
                type: notificationType
            }
        }
        var keyWordsSetId = generatekey.generateKey();
        if(!checkUserContainsKeywords(subs[userId], keywords)) {
            subs[userId].keyWordsSets[keyWordsSetId] = keywords;
        }
        subs[userId].type = notificationType;

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
