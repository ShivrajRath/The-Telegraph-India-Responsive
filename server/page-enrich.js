var read = require('node-readability');

(function () {
    'use strict';

    function getHTML(url, callback) {
        read(url, function (err, article) {
            if (err) {
                callback(err);
            }
            // Main Article
            console.log(article.content);

            // Close article to clean up jsdom and prevent leaks
            article.close();
        });
    }

    module.exports = {
        getPageData: function (rssData, callback) {
            var pageData = [];

            rssData.forEach(function (item) {
                pageData.push({
                    'title': item.title,
                    'description': item.description,
                    'link': item.link,
                    'pubDate': item.meta.pubDate,
                    'html': getHTML(item.link)
                });
            });

            callback(null, pageData);
        }
    };
})();