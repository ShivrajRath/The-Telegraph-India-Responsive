(function () {
  'use strict';

  var app = angular.module('TelegraphApp', ['ng', 'ui.router']);

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
      });
    $urlRouterProvider.otherwise('/');
  });
})();
