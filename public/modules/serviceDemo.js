// public/modules/serviceDemo.js
angular.module('serviceDemoModule', [])
// Define a simple service that returns an array of items
.service('ItemService', function() {
  this.getItems = function() {
    return ['Apple', 'Banana', 'Cherry', 'Date'];
  };
})
// Create a controller that uses the service
.controller('ServiceDemoController', ['$scope', 'ItemService', function($scope, ItemService) {
  console.log("ServiceDemoController loaded");
  $scope.items = ItemService.getItems();
}]);
