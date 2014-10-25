 comparer = (function() {
    'use strict';

    var storage = require('node-persist');

    var comparer = {};
    var subs = null;
    var articles = null;

    function loadFromLocal (key) {
        return storage.getItem(key) || {};
    }

    function getUserSets (id) {
        return subs[id].keyWordsSets;
    }

    function isArticleInteresting (articleId, userKeywordSet) {
        for (var i = 0; i < userKeywordSet.length; i++) {
            if( articles[articleId].title.indexOf(userKeywordSet[i])) {
                return true;
            }
        }
        return false;
    }

    function filterArticlesByKeywordSets (userId) {
        var userSets = getUserSets(userId);
        var interestingArticles = [];
        for (var i = 0; i < userSets.length; i++) {
            for (var articleKey in artciles) {
                if( isArticleInteresting(articleKey, userSets[i])) {
                    interestingArticles.push(artciles[articleKey]);
                }

            }
        }
        return interestingArticles;
    }

    function generateInterestedSubs () {
        var userArticleMatches = {};
        for (var subKey in subs) {
            userArticleMatches[subKey] = filterArticlesByKeywordSets(subKey);
        }
        return userArticleMatches;
    }

    function attachMails (collection) {
        for(var key in collection) {
            collection[key].email = subs[key].email;
        }
        console.log(collection);
        return collection;
    }

    comparer.notifySubscribers = function () {
        var collection = generateInterestedSubs();
        collection = attachMails(collection);
        // TODO: send mails by SMTP using collections
    }

    function init () {
        storage.initSync({
            dir:'../../../persist',
            stringify: JSON.stringify,
            parse: JSON.parse,
            encoding: 'utf8',
            logging: false,  // can also be custom logging function
            continuous: true,
            interval: false
        });
        subs = loadFromLocal('subs');
        articles = loadFromLocal('articles');
    };
    init();

    return comparer;

}());

module.exports = comparer;
