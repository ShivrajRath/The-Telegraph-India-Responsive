(function () {
    'use strict';

    // Node dependencies
    var express = require('express'),
        path = require('path');

    // Creation of app
    var app = express();

    // Public resources
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/bower_components', express.static(__dirname + '/bower_components'));

    // Internal dependencies
    var pageEnrich = require('./server/page-enrich');
    var rssParse = require('./server/rss-parse');

    // Config File
    var config = require('./server/config.json')[app.get('env')];

    app.get('/', function(req, res){
        res.sendFile(path.join(__dirname + '/public/index.html'));
    });
    
    // API LIST
    app.get('/getHTML', function (req, res) {
        // rssURL sent to be parsed
        var url = req.query.url;

        if (url) {
            pageEnrich.getHTML(url, function (err, data) {
                if (err || !data) {
                    res.status(500).json({
                        error: 'HTML extraction failed'
                    });
                }
                res.set({
                    'Content-Encoding': 'utf-8',
                    'charset': 'utf-8',
                    'Content-Type': 'text/html'
                });
                res.send(data);
            });
        } else {
            res.status(500).json({
                error: 'URL not sent'
            });
        }
    });

    app.get('/enrichRSS', function (req, res) {

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