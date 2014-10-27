var mcontentgenerator = (function() {
    'use strict';

    var mcontentgenerator = {};

    mcontentgenerator.attachMailContents = function (userItemsMatches) {
        for(var key in userItemsMatches) {
            userItemsMatches.mailContent = generateContent(userItemsMatches[key]);
        }
        return userItemsMatches;
    }

    function generateContent (userItemsMatch) {
        var mailContent = {};
        mailContent.title = "HackerNews update";
        mailContent.html = generateHtmlContent(userItemsMatches.matches, userItemsMatches.user);
        mailContent.plainText = generateTextContent(userItemsMatches.matches, userItemsMatches.user);
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

    }

    function generateCommentHtml (comments, user) {

    }

    function generateTextContent (matches, user) {

    }

    return mcontentgenerator;

}());

module.exports = mcontentgenerator;
