var mcontentgenerator = (function() {
    'use strict';

    var mcontentgenerator = {};

    mcontentgenerator.attachMailContents = function (userItemsMatches) {
        for(var key in userItemsMatches) {
            userItemsMatches[key].mailContent = generateContent(userItemsMatches[key]);
        }
        return userItemsMatches;
    }

    function generateContent (userItemsMatch) {
        var mailContent = {};
        mailContent.title = "HackerNews update";
        mailContent.html = generateHtmlContent(userItemsMatch.matches, userItemsMatch.user);
        mailContent.plainText = generateTextContent(userItemsMatch.matches, userItemsMatch.user);
        return mailContent;
    }

    function generateHtmlContent (matches, user) {
        var resultMarkup = ''
        if(matches.story) {
            resultMarkup += generateStoryHtml(matches.story, user);
        }
        if(matches.comment) {
            resultMarkup += generateCommentHtml(matches.comment, user);
        }
        return resultMarkup;
    }

    function generateStoryHtml (stories, user) {
        var resultString = '<ul>';
        for (var i = 0; i < stories.length; i++) {
            resultString += '<li> '+
                '<p>Story:</p>' +
                '<a target="_blank" href="' + stories[i].matchedItem.url + '">' + stories[i].matchedItem.title + '</a>' +
                '<p>Contains one(more) of the words:' + getMatchingKeywords(stories[i].matchIndexes, user) + '</p>' +
            '</li>';
        }
        resultString += '</ul>';
        return resultString;
    }

    function getMatchingKeywords (matchingIds, user) {
        var result = '';
        for (var i = 0; i < matchingIds.length; i++) {
            result += user.keyWordsSets[matchingIds[i]].toString();
        }
        return result;
    }

    function generateCommentHtml (comments, user) {
        var resultString = '<ul>';
        for (var i = 0; i < comments.length; i++) {
            resultString += '<li> '+
                '<p>Comment:</p>' +
                '<p>' + comments[i].matchedItem.text + '</p>' +
                '<p>Contains one(more) of the words:' + getMatchingKeywords(comments[i].matchIndexes, user) + '</p>' +
            '</li>';
        }
        resultString += '</ul>';
        return resultString;
    }

    function generateTextContent (matches, user) {
        return '';
    }

    return mcontentgenerator;

}());

module.exports = mcontentgenerator;
