var express = require('express');
var bodyparser = require('body-parser');
var mapper = require('./site-mapper');


var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.get('/sitemap', function (request, response) {
    var mapId = request.body.url;

    mapper.getSiteMap(mapId, function(id, siteMap) {
        if(id === null) {
            response.json(siteMap);
            response.end();
        }
        else {
            response.json({
                mappedSiteId: id
            });
            response.end();
        }
    });
});

app.post('/map', function (request, response) {
    var url = request.body.url;

    var mappedId = mapper.map(url);

    response.json({
        mappedSiteId: mappedId
    });
    response.end();
});

