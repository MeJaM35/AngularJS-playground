angular.module('debuggingDemoModule', [])
.controller('DebuggingDemoController', ['$scope', function($scope) {
  console.log("DebuggingDemoController loaded");
  
  // Intentionally introduce bugs for debugging practice
  $scope.userName = "John Doe";  // Will be referenced as userNaMe in template
  $scope.items = ["Item 1", "Item 2", "Item 3"];
  // userStatus is intentionally not defined
  
  $scope.updateUser = function(username) {
    // Intentional bug: parameter name doesn't match ng-model
    console.log('Updating user:', username);
  };
}]);