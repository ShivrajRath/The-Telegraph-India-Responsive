var FeedParser = require('feedparser');
var request = require('request');

(function () {
  'use strict';

  module.exports = {

    parse: function (url, callback) {
      console.log(url);
      var req = request(url),
        feedparser = new FeedParser(),
        data = [];

      req.on('error', function (err) {
        console.log('Request Error ' + err);
      });

      req.on('response', function (res) {
        var stream = this;

        if (res.statusCode !== 200) {
          return this.emit('error', new Error('Bad status code'));
        }

        stream.pipe(feedparser);
      });


      feedparser.on('error', function (err) {
        console.log('Feedparser Error ' + err);
        // callback(err);
      });

      feedparser.on('readable', function () {
        // This is where the action is!
        var stream = this,
          item;

        while (item = stream.read()) {
          data.push(item);
        }
      });

      feedparser.on('end', function () {
        if (data.length) {
          callback(null, data);
        } else {
          callback('Data not available at present');
        }
      });
    }
  };
})();
