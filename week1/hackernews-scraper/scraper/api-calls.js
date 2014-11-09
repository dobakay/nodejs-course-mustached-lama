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

    calls.getArticle = function (articleId, callback) {
        requestMod({
            uri: hn.item.replace('{{id}}', articleId),
            method: "GET",
        }, function (error, response, body) {
            callback(error, response, body);
        });
    }

    calls.getTopArticles = function (callback) {
        requestMod({
            uri: hn.topStories,
            method: "GET",
        }, function (error, response, body) {
            callback(error, response, body);
        });
    }

    calls.getMaxItem = function (callback) {
        requestMod({
            uri: hn.maxitem,
            method: "GET",
        }, function (error, response, body) {
            callback(error, response, body);
        });
    }

    calls.getUpdates = function (callback) {
        requestMod({
            uri: hn.updates,
            method: "GET",
        }, function (error, response, body) {
            callback(error, response, body);
        });
    }

    return calls;

}());


module.exports = calls;
