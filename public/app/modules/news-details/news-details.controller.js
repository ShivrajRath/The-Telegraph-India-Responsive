(function () {
  'use strict';

  var app = angular.module('TelegraphApp');

  app.controller('NewsDetailsController', ['RSSListFactory', '$scope', function (RSSListFactory, $scope) {
    $scope.navList = [];

    RSSListFactory.getRSSList().
    then(function (data) {
        $scope.navList = data.feedURLs;
      },
      function (data) {
        console.log('Error fetching the navlist. Error desc: ' + data);
      });
  }]);
})();
