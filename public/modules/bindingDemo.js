angular.module('featurePlayground', ['ngRoute', 'ngAnimate', 'bindingDemoModule', 'routingDemoModule', 'directiveDemoModule', 'httpDemoModule', 'filterDemoModule', 'animationDemoModule', 'templateDemoModule'])
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
    .when('/directive', {
      templateUrl: 'templates/directive-demo.html',
      controller: 'DirectiveDemoController'
    })
    .when('/service', {
      templateUrl: 'templates/service-demo.html',
      controller: 'ServiceDemoController'
    })
    .when('/http', {
      templateUrl: 'templates/http-demo.html',
      controller: 'HttpDemoController'
    })
    .when('/filter', {
      templateUrl: 'templates/filter-demo.html',
      controller: 'FilterDemoController'
    })
    .when('/animation', {
      templateUrl: 'templates/animation-demo.html',
      controller: 'AnimationDemoController'
    })
    .when('/template', {
      templateUrl: 'templates/template-demo.html',
      controller: 'TemplateDemoController'
    })
    .otherwise({ redirectTo: '/' });
}]);

angular.module('bindingDemoModule', [])
.controller('BindingDemoController', ['$scope', function($scope) {
  console.log("BindingDemoController loaded");
  $scope.message = "Hello, AngularJS!";
  $scope.snippetCode = 
`<!DOCTYPE html>
<html ng-app="bindingDemoApp">
<head>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
  <script>
    angular.module('bindingDemoApp', [])
    .controller('DemoController', ['$scope', function($scope) {
      $scope.message = "Hello, AngularJS!";
    }]);
  </script>
</head>
<body ng-controller="DemoController">
  <p>Type a message:</p>
  <input type="text" ng-model="message" placeholder="Enter your message">
  <p>Your message: <span>{{ message }}</span></p>
</body>
</html>`;

  $scope.updateIframe = function() {
    var iframe = document.getElementById('liveDemoIframe');
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write($scope.snippetCode);
    iframeDoc.close();
  };
}]);

