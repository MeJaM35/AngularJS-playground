angular.module('scopeDemoModule', [])
.controller('ScopeDemoController', ['$scope', function($scope) {
  console.log("ScopeDemoController loaded");

  // Basic AngularJS Scope Example in snippet code
  $scope.snippetCode = 
`<!DOCTYPE html>
<html ng-app="scopeDemoApp">
<head>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
  <script>
    angular.module('scopeDemoApp', [])
    .controller('ScopeDemoController', ['$scope', function($scope) {
      // Controller scope variable
      $scope.greeting = "Hello, Edgeverve Team!";
    }]);
  </script>
</head>
<body ng-controller="ScopeDemoController">
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
          iframeDoc.defaultView.angular.bootstrap(appElement, ['scopeDemoApp']);
        } else {
          console.error("No 'ng-app' element found in the iframe.");
        }
      } catch (error) {
        console.error("Error during iframe AngularJS initialization:", error);
      }
    }, 200); // Increased delay to ensure the iframe's body is available
  };
}]);
