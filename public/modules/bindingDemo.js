angular.module('featurePlayground', ['ngRoute', 'bindingDemoModule', 'routingDemoModule'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      template: '<h2>Welcome to the Feature Playground!</h2><p>Select a demo from the navigation above.</p>'
    })
    .when('/binding', {
      templateUrl: 'templates/binding-demo.html',
      controller: 'BindingDemoController'
    })
    .when('/routing', {
      templateUrl: 'templates/routing-demo.html',
      controller: 'RoutingDemoController'
    })
    .otherwise({ redirectTo: '/' });
}]);
angular.module('bindingDemoModule', [])
.controller('BindingDemoController', ['$scope', function($scope) {
  console.log("BindingDemoController loaded");
  $scope.message = "Hello, AngularJS!";
}]);
