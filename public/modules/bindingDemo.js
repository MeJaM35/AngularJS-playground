angular.module('featurePlayground', [
  'ngRoute', 
  'ngAnimate', 
  'bindingDemoModule', 
  'routingDemoModule', 
  'directiveDemoModule', 
  'serviceDemoModule', 
  'httpDemoModule', 
  'filterDemoModule', 
  'animationDemoModule', 
  'templateDemoModule', 
  'factoryDemoModule', 
  'debuggingDemoModule', // Add the new module

  'themeModule' // Add the themeModule here
])
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
    .when('/factory', {
      templateUrl: 'templates/factory-demo.html',
      controller: 'FactoryDemoController'
    })
    .when('/debugging', {
      templateUrl: 'templates/debugging-demo.html',
      controller: 'DebuggingDemoController'
    })
    
    .otherwise({ redirectTo: '/' });
}]);

angular.module('bindingDemoModule', [])
.controller('BindingDemoController', ['$scope', 'ThemeService', function($scope, ThemeService) {
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

    // Clear the iframe content and write the new snippet
    iframeDoc.open();
    iframeDoc.write($scope.snippetCode);
    iframeDoc.close();

    // Delay the AngularJS bootstrap to ensure the body is available
    setTimeout(function() {
      // Check if AngularJS is already bootstrapped in the iframe
      if (iframeDoc.defaultView.angular) {
        // Manually destroy the existing AngularJS app in the iframe
        var appElement = iframeDoc.querySelector('[ng-app]');
        if (appElement) {
          var appScope = iframeDoc.defaultView.angular.element(appElement).scope();
          if (appScope) {
            appScope.$destroy();
          }
        }
      }

      // Re-bootstrap AngularJS within the iframe
      var appElement = iframeDoc.querySelector('[ng-app]');
      if (appElement) {
        iframeDoc.defaultView.angular.bootstrap(appElement, ['bindingDemoApp']);
      }
    }, 100); // Delay to ensure the iframe's body is available
  };

  // Theme toggle functionality
  $scope.isDarkMode = ThemeService.isDarkMode;

  $scope.toggleTheme = function() {
    ThemeService.toggleTheme();
    $scope.isDarkMode = ThemeService.isDarkMode;
  };

  $scope.$on('themeChanged', function(event, isDarkMode) {
    $scope.isDarkMode = isDarkMode;
  });
}]);

