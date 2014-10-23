var apiCalls = require('./api-calls');
var localStorage = require('./localstorage');

var lastNewArticleId = localStorage.maxItem;
var newArticlesRange = null;
var articleBuffer = null;

function mainLoop () {
    setTimeout(function () {
        processArticles();
    }, 3000);
};
mainLoop();

function processArticles () {
    init(function afterSetup () {
        if(!!newArticlesRange && newArticlesRange.length !== 0) { // if we have new entries, iterate through them
            if(!articleBuffer) {
                articleBuffer = {};
            }
            asyncLoop(newArticlesRange.length, function iterationFunction (loop) {
                // prep articles for insertion
                var index = loop.iterration();
                apiCalls.getArticle(newArticlesRange[index], function processArticle (err, response, body) {
                    articleBuffer[ newArticlesRange[index] ] = body;
                    console.log('processed article: ' + body);

                    // important: must be in the callback
                    // next iteration
                    loop.next();
                });
            },
            function loopEndCallback () {
                // load articles in DB
                localStorage.storeInLocal('articles', articleBuffer);
                console.log('stored buffer: ' + JSON.stringify(articleBuffer));
                // clearing buffer
                articleBuffer = null;
                newArticlesRange = null;

                // listen for new changes from the API again
                mainLoop();
            });
        }
    });

    // if for some reason our newArticlesRange hasn't change try to check for changes
    // after 3 minutes
    mainLoop();
}

function init (callback) {
    apiCalls.getMaxItem(function setMaxItem(error, response, body) {
        if(lastNewArticleId === null) {
            lastNewArticleId = body;
        }
        else {
            localStorage.storeInLocal('maxItem', body);
            newArticlesRange = createNewArticlesRange(lastNewArticleId, body);
            lastNewArticleId = body;
        }
        callback();
    })
}

function createNewArticlesRange (lastArticleId, newArticleId) {
    var result = [];
    var start = parseInt(lastArticleId);
    var end = parseInt(newArticleId);

    for (var i = start; i < end; i++) {
        result.push(i);
    }
    return result;
}

/**
 * Asynchronous loop function for iterably executing asynchronous functions
 * @param  {int}   iterations how many cycles there are in the loop
 * @param  {Function}   func       the asynchronous function, takes a 'loop' parameter
 *                                 (a deffered object for asynchrous controlling, which has
 *                                  a 'next' method called every iterration after async function is executed)
 * @param  {Function} callback   function that executes always at the end of the loop
 * @return {[type]}              [description]
 */
function asyncLoop (iterations, func, callback) {
    var index = 0;
    var done = false;
    var loop = {
        next: function () {
            if(done) {
                return;
            }

            if(index < iterations) {
                func(loop);
                index++;
            }

            else {
                done = true;
                callback();
            }
        },

        iterration: function () {
            return index;
        },

        break: function () {
            done = true;
            callback();
        },

        getDoneStatus: function () {
            return done;
        }
    };

    loop.next();
    return loop;
}


