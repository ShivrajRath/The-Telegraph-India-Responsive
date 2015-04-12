(function () {
  'use strict';

  var app = angular.module('TelegraphApp');

  app.filter('cleanurl', function () {
    return function (input) {
      return input.replace('http://www.telegraphindia.com', '').replace('.jsp', '');
    };
  });

  app.controller('NewsListController', ['$scope', '$state', '$stateParams', 'RSSEnrichFactory', 'RSSListFactory', function ($scope, $state, $stateParams, RSSEnrichFactory, RSSListFactory) {

    $scope.newsId = $stateParams.newsId;
    var rssURL = '';
    $scope.newsTitle = '';
    $scope.newsList = [];

    RSSListFactory.getRSSSection($scope.newsId).
    then(function (data) {
      $scope.newsTitle = data.name;
      // Clean the URL
      rssURL = data.link;
      RSSEnrichFactory.getDetails(rssURL).
      then(function (data) {
        $scope.newsList = data;
      }, function (err) {
        $scope.noData = true;
        console.log(err);
      });
    }, function () {
      $state.go('home');
    });

    }]);

})();
