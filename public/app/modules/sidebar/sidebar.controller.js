(function () {
  'use strict';

  var app = angular.module('TelegraphApp');

  app.controller('SideBarController', ['RSSListFactory', '$scope', function (RSSListFactory, $scope) {
    $scope.navList = [];

    RSSListFactory.getRSSList().
    success(function (data) {
      $scope.navList = data.feedURLs;
    }).
    error(function (data) {
      console.log('Error fetching the navlist. Error desc: ' + data);
    });

    }]);
})();
