(function () {
  'use strict';

  var app = angular.module('TelegraphApp');

  app.controller('NewsDetailsController', ['$scope', '$state', '$stateParams',
      'HTMLFetchFactory',
    function ($scope, $state, $stateParams, HTMLFetchFactory) {

      $scope.title = '';
      $scope.htmlContent = '';
      $scope.newsId = $stateParams.newsId;

      var url = 'http://www.telegraphindia.com/' + $stateParams.newsurl + '.jsp';
      HTMLFetchFactory.getHTML(url)
        .then(function (data) {
          if (data) {
            $scope.title = data.title;
            $scope.htmlContent = data.content.replace(/src=/gi, 'ng-src=');
          } else {
            $scope.htmlnotparsed = true;
          }
        }, function (err) {
          $scope.htmlnotparsed = true;
          console.log(err);
        });

      // Toggle the sidebar for detailed view
      // angular.element('#wrapper').addClass('toggled');

    }]);

})();
