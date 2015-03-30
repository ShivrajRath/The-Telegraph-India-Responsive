var read = require('node-readability');

(function () {
    'use strict';

    function getHTML(url, callback) {
        read(url, function (err, article, meta) {
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
            var title, link, description, html, pubDate, image, date, pageData = [];

            rssData.forEach(function (item, index) {
                pageData.push({
                    'title': item.title,
                    'description': item.description,
                    'link': item.link,
                    'pubDate': item.meta.pubDate
                })
            })

            callback(null, pageData);
            //      return {
            //        'title': title,
            //        'link': link,
            //        'description': description,
            //        'html': html,
            //        'image': image,
            //        'date': date
            //      };
        }
    };
})();