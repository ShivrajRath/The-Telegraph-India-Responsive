var read = require('node-readability');

(function () {
    'use strict';

    module.exports = {
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
        getHTML: function (url, callback) {
            read(url, function (err, article) {
                if (err) {
                    callback(err);
                }
                // Main Article
                callback(null, article.content);

                // Close article to clean up jsdom and prevent leaks
                article.close();
            });
        }
    };
})();