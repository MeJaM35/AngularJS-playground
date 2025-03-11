// public/modules/httpDemo.js
angular.module('httpDemoModule', [])
.controller('HttpDemoController', ['$scope', '$http', function($scope, $http) {
  console.log("HttpDemoController loaded");
  // Initialize an empty array for items
  $scope.items = [];

  // Use $http to fetch data from the API endpoint
  $http.get('/api/items')
    .then(function(response) {
      $scope.items = response.data.items;
      console.log("Items fetched:", $scope.items);
    }, function(error) {
      console.error("Error fetching items:", error);
    });
}]);
