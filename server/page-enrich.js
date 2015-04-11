var read = require('node-readability');

(function () {
  'use strict';

  module.exports = {

    /**
     * Returns filtered data from enriched rss data
     * @param {Object} rssData  Raw enriched data
     * @param {Function} callback Callback function to return the filtered data
     */
    getPageData: function (rssData, callback) {
      var pageData = [];

      rssData.forEach(function (item) {
        pageData.push({
          'title': item.title,
          'description': item.description,
          'link': item.link,
          'pubDate': item.meta.pubDate
        });
      });

      callback(null, pageData);
    },

    /**
     * Get's HTML content for a url
     * @param {String} url      URL to be parse
     * @param {Function} Callback function callback to return the parsed data
     */
    getHTML: function (url, callback) {
      read(url, function (err, article) {
        if (err) {
          callback(err);
        }
        // Main Article
        callback(null, {
          content: article.content,
          title: article.title
        });

        // Close article to clean up jsdom and prevent leaks
        article.close();
      });
    }
  };
})();
