(function () {
  'use strict';

  var app = angular.module('TelegraphApp', ['ng', 'ui.router', 'ngSanitize']);

  //Application Router
  app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('home', {
        url: '/',
        template: '<h1>Hello World</h1>'
      })
      .state('news-list', {
        url: '/newslist/:newsId',
        templateUrl: './app/modules/news-list/news-list.html',
        controller: 'NewsListController'
      })
      .state('news-details', {
        url: '/newsdetails/{newsurl:.*}',
        templateUrl: './app/modules/news-details/news-details.html',
        controller: 'NewsDetailsController'
      });
    $urlRouterProvider.otherwise('/');
  });
})();
