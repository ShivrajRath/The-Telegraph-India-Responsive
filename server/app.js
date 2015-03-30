(function () {
    'use strict';

    // Node dependencies
    var express = require('express');

    // Creation of app
    var app = express();

    // Internal dependencies
    var pageEnrich = require('./page-enrich');
    var rssParse = require('./rss-parse');

    // Config File
    var config = require('./config.json')[app.get('env')];

    // API LIST
    app.get('/', function (req, res) {
        res.send('This one is working');
    });

    app.get('/rss-enrich', function (req, res) {

        // rssURL sent to be parsed
        var rssURL = req.query.rssURL;

        if (rssURL) {
            rssParse.parse(rssURL, function (err, data) {
                if (err || !data) {
                    res.status(500).json({
                        error: 'RSS URL not sent'
                    });
                } else {
                    pageEnrich.getPageData(data, function (err, data) {
                        if (err || !data) {
                            res.status(500).json({
                                error: 'Page enrichment failed'
                            });
                        }
                        res.json(data);
                    });
                }
            });
        } else {
            res.status(500).json({
                error: 'RSS URL not sent'
            });
        }

    });

    // APP LISTNER
    var port = process.env.PORT || config.port;
    app.listen(port);
    console.log('Application started on port: ' + port);
})();