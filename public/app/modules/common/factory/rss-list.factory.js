(function () {
  'use strict';

  var app = angular.module('TelegraphApp');

  app.factory('RSSListFactory', ['$http', '$q', function ($http, $q) {
    return {
      /**
       * Get's RSS Feed link list
       * @returns {Object} Object containing the link list
       */
      getRSSList: function () {
        var defer = $q.defer();

        $http.get('../../../configs/rss_feed_links.json')
          .success(function (data) {
            defer.resolve(data);
          })
          .error(function () {
            defer.reject({
              error: 'feed link not found'
            });
          });

        return defer.promise;
      },

      /**
       * Get's RSS Section for an id
       * @param   {String} id ID for a RSS Section
       * @returns {Object} RSS Section
       */
      getRSSSection: function (id) {
        var defer = $q.defer();

        this.getRSSList().
        then(function (data) {
            var rssSection = _.find(data.feedURLs, function (el) {
              return el.id === id;
            });
            if (!rssSection) {
              defer.reject(false);
            } else {
              defer.resolve(rssSection);
            }
          },
          function () {
            defer.reject(false);
          });

        return defer.promise;
      }
    };
  }]);
})();
