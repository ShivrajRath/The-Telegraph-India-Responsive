(function () {
  'use strict';

  var app = angular.module('TelegraphApp');

  app.controller('NewsDetailsController', ['$scope', '$state', '$stateParams', 'HTMLFetchFactory', function ($scope, $state, $stateParams, HTMLFetchFactory) {

    $scope.title = '';
    $scope.htmlContent = '';
    var url = 'http://www.telegraphindia.com/' + $stateParams.newsurl + '.jsp';
    HTMLFetchFactory.getHTML(url)
      .then(function (data) {
        if (data) {
          $scope.title = data.title;
          $scope.htmlContent = data.content;
        } else {
          $scope.htmlnotparsed = true;
        }
      }, function (err) {
        $scope.htmlnotparsed = true;
        console.log(err);
      });

    }]);

})();
