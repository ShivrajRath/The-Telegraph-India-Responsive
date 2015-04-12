(function () {
  'use strict';

  var app = angular.module('TelegraphApp');

  app.filter('cleanurl', function () {
    return function (input) {
      return input.replace('http://www.telegraphindia.com', '').replace('.jsp', '');
    };
  });

  app.filter('unsafe', ['$sce', function ($sce) {
    return $sce.trustAsHtml;
  }]);

})();
