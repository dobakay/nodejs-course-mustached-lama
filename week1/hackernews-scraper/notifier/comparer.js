 comparer = (function() {
    'use strict';

    var localStorage = require('../localStorage');
    var hnItems = localStorage.items; // hacker news items from API
    var subscribers = localStorage.subscribers;

    var comparer = {};

    function filterItemsByType (type) {
        var result = hnItems.filter(function (item) {
            return item.type === type;
        });
        return result;
    }

    function generateFeedList () {
        var userItemsMatches = {};

        for (var subKey in subscribers) {
            userItemsMatches[subKey] = getItemsByUserPreferences(subscribers[subKey]);
            // send mails via another module
        }
    }

    function getItemsByUserPreferences (user) {
        var filteredByTypeItems = getItemsByUserTypePreferences(user.type);
        var filteredByKeySetItems = getItemsByUserKeyWordsPreferences(user,filteredByTypeItems);
        return filteredByKeySetItems;
    }

    function getItemsByUserTypePreferences (userTypeTypePreferences) {
        var filtered = {};
        for (var i = 0; i < userTypeTypePreferences.length; i++) {
            filtered[userTypeTypePreferences[i]] = filterItemsByType(userTypeTypePreferences[i])
        }
        return filtered;
    }

    function getItemsByUserKeyWordsPreferences (user, items) {
        var filteredItems = {};
        var itemKeywordsMatchIndexes = null;
        for (var type in items) {
            for (var itemIndex = 0; itemIndex < items[type].length; itemIndex++) {
                itemKeywordsMatchIndexes = checkItemKeywordSets(items[type][itemIndex], user);
                if(itemKeywordsMatchIndexes) {
                    if(!filteredItems[type]) {
                        filteredItems[type] = [];
                    }
                    filteredItems[type].push({
                        matchedUser: user,
                        matchedItem: item,
                        matchIndexes: itemKeywordsMatchIndexes
                    });
                    // important: it's possible we fill our matches with with empty matchIndex arrays
                    // so we must 'nullafy' ... heh what a funny word
                    // or matchesIndexes before we continue the looping
                    itemKeywordsMatchIndexes = null;
                }
            }
        }
        return filteredItems;
    }

    function checkItemKeywordSets (item, user) {
        var keywordSetIndexes = [];
        for (var i = 0; i < user.keyWordsSets.length; i++) {
            if(itemContainsKeywords(item, user.keyWordsSets[i])) {
                keywordSetIndexes.push(i);
            }
        }
        return keywordSetIndexes;
    }

    function itemContainsKeywords (item, kewordsSet) {
        var fieldToCheck = (item.type === 'comment')? 'text': 'title';
        for (var i = 0; i < kewordsSet.length; i++) {
            if(item[fieldToCheck].indexOf(kewordsSet[i]) !== -1) {
                return true;
            }
        }
        return false;
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
