var comparer = (function() {
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
            userItemsMatches[subKey] = {};
            userItemsMatches[subKey].matches = getItemsByUserPreferences(subscribers[subKey]);
            userItemsMatches[subKey].user = subscribers[subKey];
        }
        return userItemsMatches;
    }

    function getItemsByUserPreferences (user) {
        var filteredByTypeItems = getItemsByUserTypePreferences(user.type);
        // console.log('items by type: ' + JSON.stringify(filteredByTypeItems));
        var filteredByKeySetItems = getItemsByUserKeyWordsPreferences(user,filteredByTypeItems);
        // console.log('items by type: ' + JSON.stringify(filteredByTypeItems));
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
                if(itemKeywordsMatchIndexes.length !== 0) {
                    // console.log(JSON.stringify(itemKeywordsMatchIndexes));
                    if(!filteredItems[type]) {
                        filteredItems[type] = [];
                    }
                    filteredItems[type].push({
                        matchedItem: items[type][itemIndex],
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
        for (var wordsetKey in user.keyWordsSets) {
            if(itemContainsKeywords(item, user.keyWordsSets[wordsetKey])) {
                keywordSetIndexes.push(wordsetKey);
            }
        }
        return keywordSetIndexes;
    }

    function itemContainsKeywords (item, kewordsSet) {
        var fieldToCheck = (item.type === 'comment')? 'text': 'title';
        var fieldValue = item[fieldToCheck].toLowerCase();
        for (var i = 0; i < kewordsSet.length; i++) {
            if(fieldValue.indexOf(kewordsSet[i].toLowerCase()) !== -1) {
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
        var collection = generateFeedList();
        console.log('FINALL RESULT: '+JSON.stringify(collection));
        return collection;
    }

    return comparer;

}());

module.exports = comparer;
