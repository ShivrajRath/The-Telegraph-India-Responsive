(function () {
  'use strict';

  var path = require('path'),
    pageEnrich = require('./page-enrich'),
    rssParse = require('./rss-parse');

  module.exports = function (app) {
    app.get('/', function (req, res) {
      res.sendFile(path.join(__dirname + '/public/index.html'));
    });

    // Get's HTML content from a page URL
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

    // Enriches the RSS URL
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
  };

})();
