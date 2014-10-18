var calls = (function() {
    'use strict';
    var requestMod = require('request');

    // Hacker News API url and routes
    // Description: https://github.com/HackerNews/API
    var hn = {};
    hn.apiUrl = 'https://hacker-news.firebaseio.com',
    hn.item = hn.apiUrl + '/v0/item/{{id}}.json?print=pretty', // stories, comments, jobs
    hn.user = hn.apiUrl +  '/v0/user/{{id}}.json?print=pretty', // users
    hn.topStories = hn.apiUrl + '/v0/topstories.json?print=pretty', //last 100 stories
    hn.maxitem = hn.apiUrl + '/v0/maxitem.json?print=pretty', // latest article
    hn.updates = hn.apiUrl + '/v0/updates.json?print=pretty' // changed items, user profiles

    var calls = {};

    calls.testConnectivity = function () {
        requestMod( hn.apiUrl, function (error, response, html) {
            if (!error && response.statusCode === 200) {
                return true;
            }
            else {
                return false;
            }
        });
    }

    calls.getArticle = function (articleId) {
        requestMod({
            uri: hn.item.replace('{{id}}', articleId),
            method: "GET",
        }, function(error, response, body) {
            console.log(body);
        });
    }

    calls.getTopArticles = function () {
        requestMod({
            uri: hn.topStories,
            method: "GET",
        }, function(error, response, body) {
            console.log(body);
        });
    }

    calls.getMaxItem = function () {
        requestMod({
            uri: hn.maxitem,
            method: "GET",
        }, function(error, response, body) {
            console.log(body);
        });
    }

    calls.getUpdates =function () {
        requestMod({
            uri: hn.updates,
            method: "GET",
        }, function(error, response, body) {
            console.log(body);
        });
    }

    return calls;

}());


module.exports = calls;
