angular.module('routingDemoModule', [])
.controller('RoutingDemoController', ['$scope', function($scope) {
  console.log("RoutingDemoController loaded");
  $scope.info = "Welcome to the Routing Demo!";
  $scope.snippetCode = 
`<!DOCTYPE html>
<html ng-app="routingDemoApp">
<head>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular-route.min.js"></script>
  <script>
    angular.module('routingDemoApp', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider
        .when('/home', {
          template: '<h2>Home</h2><p>Welcome to the home page!</p>'
        })
        .when('/about', {
          template: '<h2>About</h2><p>Learn more about us on this page.</p>'
        })
        .otherwise({ redirectTo: '/home' });
    }]);
  </script>
</head>
<body>
  <nav>
    <a href="#!/home">Home</a> |
    <a href="#!/about">About</a>
  </nav>
  <div ng-view></div>
</body>
</html>`;

  $scope.updateIframe = function() {
    var iframe = document.getElementById('liveDemoIframe');
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    // Clear the iframe content and write the new snippet
    iframeDoc.open();
    iframeDoc.write($scope.snippetCode);
    iframeDoc.close();

    // Delay to ensure the iframe's DOM is fully loaded
    setTimeout(function() {
      try {
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
          iframeDoc.defaultView.angular.bootstrap(appElement, ['routingDemoApp']);
        } else {
          console.error("No 'ng-app' element found in the iframe.");
        }
      } catch (error) {
        console.error("Error during iframe AngularJS initialization:", error);
      }
    }, 200); // Increased delay to ensure the iframe's body is available
  };
}]);
