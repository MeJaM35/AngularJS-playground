// public/modules/animationDemo.js
angular.module('animationDemoModule', ['ngAnimate'])
.controller('AnimationDemoController', ['$scope', function($scope) {
  console.log("AnimationDemoController loaded");
  $scope.isVisible = false;
  $scope.toggleVisibility = function() {
    $scope.isVisible = !$scope.isVisible;
  };
}]);
