(function () {
  'use strict';

  var app = angular.module('TelegraphApp');

  app.factory('RSSListFactory', ['$http', '$q', function ($http, $q) {
    return {
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
      }
    };
  }]);
})();
