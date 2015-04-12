(function () {
  'use strict';

  var app = angular.module('TelegraphApp', ['ng', 'ui.router']);

  //Application Router
  app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('home', {
        url: 'newslist/front-page'
      })
      .state('news-list', {
        url: '/newslist/:newsId',
        templateUrl: './app/modules/news-list/news-list.html',
        controller: 'NewsListController'
      })
      .state('news-details', {
        url: '/newsdetails/:newsId/{newsurl:.*}',
        templateUrl: './app/modules/news-details/news-details.html',
        controller: 'NewsDetailsController'
      });
    $urlRouterProvider.otherwise('/newslist/front-page');
  });

})();
