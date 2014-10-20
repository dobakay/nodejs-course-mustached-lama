var apiCalls = require('./api-calls');
var localStorage = require('./localstorage');



function processArticles (error, response, body) {
    // checks for each if there's a stored article
    var newArticleIds = JSON.parse(body);
    var localArticles = localStorage.articles;

    localArticles = updateWithNewArticles(newArticleIds, localArticles);
    console.log(localArticles);
        // if bool flag is UP
            // stores the new articles object in the "localStorage"
            // sends request to notifier to do some slave work
}

function updateWithNewArticles (newArticleIds, localArticles) {
    var newLocalArticles = localArticles;
    for (var i = 0; i < newArticleIds.length; i++) {
        if(!localArticles[newArticleIds[i]]) {
            apiCalls.getArticle(newArticleIds[i], function (error, response, body, id) {
                var article = JSON.parse(body);
                localArticles[article.id] = article;
            });
        }
    }
    return newLocalArticles;
}

function updateWithUpdatedArticles (updatedArticleIds, localArticles) {
    var newLocalArticles = localArticles;
    for (var i = 0; i < updatedArticleIds.length; i++) {
        if(!!newLocalArticles[updatedArticleIds[i]]) {

        }
    };
    return newLocalArticles;
}


setInterval(function scraperHeartBeat () {
    // checks connectivity to hacker news
        // gets top 100 and loops through them
        apiCalls.getTopArticles(processArticles);

    // if no connectivity logs a message
}, 1000); //scrapes HN every two minutes

function getTopArticles () {
    apiCalls.getTopArticles(function (err, response, body) {
        // body is an array of HN ids
        for (var i = 0; i < body.length; i++) {

        };
    });
}
