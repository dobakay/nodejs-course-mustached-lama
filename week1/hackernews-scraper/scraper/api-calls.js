var calls = (function() {
    'use strict';

    // Hacker News API url and routes
    // Description: https://github.com/HackerNews/API
    var hn = {
        apiUrl: 'https://hacker-news.firebaseio.com',
        item: '/v0/item/', // stories, comments, jobs
        user: '/v0/user/', // users
        topstories: '/v0/topstories', //last 100 stories
        maxitem: '/v0/maxitem', // latest article
        updates: '/v0/updates' // changed items, user profiles
    }

    var calls = {};


    calls.getArticle = function (articleId) {

    }

    calls.getTopArtilces = function () {

    }

    calls.getMaxItem = function () {

    }

    calls.getUpdates =function () {

    }

    return calls;

}());
