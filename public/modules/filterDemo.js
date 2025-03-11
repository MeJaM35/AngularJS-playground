// public/modules/filterDemo.js
angular.module('filterDemoModule', [])
// Custom filter to reverse a string
.filter('reverse', function() {
  return function(input) {
    if (!input) return '';
    return input.split('').reverse().join('');
  };
})
.controller('FilterDemoController', ['$scope', function($scope) {
  console.log("FilterDemoController loaded");
  $scope.sampleText = "AngularJS is awesome!";
}]);
