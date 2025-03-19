angular.module('controllerDemoModule', [])
.controller('ControllerDemoController', ['$scope', function($scope) {
  console.log("ControllerDemoController loaded");

  // Basic AngularJS Controller Example in snippet code
  $scope.snippetCode = 
`<!DOCTYPE html>
<html ng-app="controllerDemoApp">
<head>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
  <script>
    angular.module('controllerDemoApp', [])
    .controller('ControllerDemoController', ['$scope', function($scope) {
      // Controller variable
      $scope.greeting = "Hello from AngularJS Controller!";
    }]);
  </script>
</head>
<body ng-controller="ControllerDemoController">
  <h1>{{ greeting }}</h1> <!-- AngularJS Binding to scope.greeting -->
</body>
</html>`;

  // Function to dynamically load the snippet into an iframe for live demo
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
        iframeDoc.defaultView.angular.bootstrap(appElement, ['controllerDemoApp']);
      }
    }, 100); // Delay to ensure the iframe's body is available
  };
}]);
