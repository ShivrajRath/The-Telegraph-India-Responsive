(function () {
  'use strict';

  var app = angular.module('TelegraphApp', ['ng', 'ui.router']);

  //Application Router
  app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        template: '<h1>Hello World</h1>'
      });
    $urlRouterProvider.otherwise('/');
  });
})();
