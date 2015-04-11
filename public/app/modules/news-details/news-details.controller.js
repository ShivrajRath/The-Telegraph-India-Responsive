(function () {
  'use strict';

  var app = angular.module('TelegraphApp');

  app.controller('NewsDetailsController', ['$scope', '$state', '$stateParams', 'HTMLFetchFactory', function ($scope, $state, $stateParams, HTMLFetchFactory) {

    $scope.htmlContent = '';
    var url = 'http://www.telegraphindia.com/' + $stateParams.newsurl + '.jsp';
    HTMLFetchFactory.getHTML(url)
      .then(function (data) {
        $scope.htmlContent = data;
      }, function (err) {
        $scope.htmlnotparsed = true;
        console.log(err);
      });

    }]);

})();
