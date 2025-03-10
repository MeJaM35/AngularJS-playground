angular.module('routingDemoModule', [])
.controller('RoutingDemoController', ['$scope', function($scope) {
  console.log("RoutingDemoController loaded");
  $scope.info = "This is the routing demo view!";
}]);
