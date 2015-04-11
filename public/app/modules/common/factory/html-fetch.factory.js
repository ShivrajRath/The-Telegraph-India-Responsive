(function () {
  'use strict';

  var app = angular.module('TelegraphApp');

  app.factory('HTMLFetchFactory', ['$http', '$q', function ($http, $q) {
    return {
      getHTML: function (url) {
        var defer = $q.defer();

        $http.get('/getHTML?url=' + url)
          .success(function (data) {
            defer.resolve(data);
          })
          .error(function () {
            defer.reject({
              error: 'html could not be parsed'
            });
          });

        return defer.promise;
      }
    };
  }]);
})();
