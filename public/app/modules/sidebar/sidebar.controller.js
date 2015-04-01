(function () {
  'use strict';

  var app = angular.module('TelegraphApp');

  app.controller('SideBarController', ['$http', '$scope', function ($http, $scope) {
    $scope.navList = [];

    $http.get('../../configs/rss_feed_links.json').
      success(function (data) {
        $scope.navList = data.feedURLs;
      }).
      error(function (data) {
        console.log('Error fetching the navlist. Error desc: ' + data);
      });

    }]);
})();
