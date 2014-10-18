var apiCalls = require('./api-calls');
var localStorage = require('./localstorage');


setInterval(function scraperHeartBeat () {
    // checks connectivity to hacker news

        // gets top 100 and loops through them

            // checks for each if there's a stored article

                // if not adds article to the new articles object that's gonna replace the old one
                //  changes bool flag that there are new updates in HN

        // if bool flag is UP
            // stores the new articles object in the "localStorage"
            // sends request to notifier to do some slave work



    // if no connectivity logs a message
}, 120000); //scrapes HN every two minutes

function getTopArticles () {
    apiCalls.getTopArticles(function (err, response, body) {
        // body is an array of HN ids
        for (var i = 0; i < body.length; i++) {

        };
    });
}
