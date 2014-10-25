 comparer = (function() {
    'use strict';

    var localStorage = require('../localStorage');

    var comparer = {};

    function getUserSets (id) {
        return localStorage.subscribers[id].keyWordsSets;
    }

    function isArticleInteresting (articleId, userKeywordSet) {
        for (var i = 0; i < userKeywordSet.length; i++) {
            if( localStorage.items[articleId].title.indexOf(userKeywordSet[i])) {
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
        for (var subKey in localStorage.subscribers) {
            userArticleMatches[subKey] = filterArticlesByKeywordSets(subKey);
        }
        return userArticleMatches;
    }

    function attachMails (collection) {
        for(var key in collection) {
            collection[key].email = localStorage.subscribers[key].email;
        }
        return collection;
    }

    comparer.notifySubscribers = function () {
        var collection = generateInterestedSubs();
        collection = attachMails(collection);
        // TODO: send mails by SMTP using collections
    }

    return comparer;

}());

module.exports = comparer;
