(function () {
  'use strict';

  var app = angular.module('TelegraphApp');

  app.factory('RSSEnrichFactory', ['$http', '$q', function ($http, $q) {
    return {
      getDetails: function (url) {
        var defer = $q.defer();

        $http.get('/enrichRSS?rssURL=' + url)
          .success(function (data) {
            defer.resolve(data);
          })
          .error(function () {
            defer.reject({
              error: 'rss link could not be enriched'
            });
          });

        return defer.promise;
      }
    };
  }]);
})();
