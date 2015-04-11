(function () {
  'use strict';

  var app = angular.module('TelegraphApp');

  app.controller('NewsListController', ['$scope', '$state', '$stateParams', 'RSSEnrichFactory', 'RSSListFactory', function ($scope, $state, $stateParams, RSSEnrichFactory, RSSListFactory) {

    var newsId = $stateParams.newsId,
      rssURL = '';

    $scope.newsList = [];
    RSSListFactory.getRSSList().
    then(function (data) {
        var rssSection = _.find(data.feedURLs, function (el) {
          return el.id === newsId;
        });
        if (!rssSection) {
          // Route to home page
          $state.go('home');
        } else {
          rssURL = rssSection.link;
          RSSEnrichFactory.getDetails(rssURL).
          then(function (data) {
            $scope.newsList = data;
          }, function (err) {
            console.log(err);
          });
        }
      },
      function (err) {
        console.log(err);
      });

    }]);

})();
