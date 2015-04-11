(function () {
  'use strict';

  var app = angular.module('TelegraphApp');

  app.filter('cleanurl', function () {
    return function (input) {
      return input.replace('http://www.telegraphindia.com', '').replace('.jsp', '');
    };
  });

  app.controller('NewsListController', ['$scope', '$state', '$stateParams', 'RSSEnrichFactory', 'RSSListFactory', function ($scope, $state, $stateParams, RSSEnrichFactory, RSSListFactory) {

    var newsId = $stateParams.newsId,
      rssURL = '';

    $scope.newsTitle = '';

    $scope.newsList = [];
    RSSListFactory.getRSSList().
    then(function (data) {
        var rssSection = _.find(data.feedURLs, function (el) {
          return el.id === newsId;
        });
        if (!rssSection) {
          // Route to home page if not a valid RSS response
          $state.go('home');
        } else {
          $scope.newsTitle = rssSection.name;
          // Clean the URL
          rssURL = rssSection.link;
          RSSEnrichFactory.getDetails(rssURL).
          then(function (data) {
            $scope.newsList = data;
          }, function (err) {
            $scope.noData = true;
            console.log(err);
          });
        }
      },
      function (err) {
        console.log(err);
      });

    }]);

})();
