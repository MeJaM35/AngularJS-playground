// public/modules/filterDemo.js
angular.module('filterDemoModule', [])
.controller('FilterDemoController', ['$scope', function($scope) {
  console.log("FilterDemoController loaded");
  $scope.sampleText = "Hello, AngularJS!";
  $scope.snippetCode = 
`<!DOCTYPE html>
<html ng-app="filterDemoApp">
<head>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
  <script>
    angular.module('filterDemoApp', [])
    .filter('reverse', function() {
      return function(input) {
        if (!input) return '';
        return input.split('').reverse().join('');
      };
    })
    .controller('DemoController', ['$scope', function($scope) {
      $scope.sampleText = "Hello, AngularJS!";
    }]);
  </script>
</head>
<body ng-controller="DemoController">
  <div>
    <p>Original Text: {{ sampleText }}</p>
    <p>Reversed Text: {{ sampleText | reverse }}</p>
  </div>
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
          iframeDoc.defaultView.angular.bootstrap(appElement, ['filterDemoApp']);
        } else {
          console.error("No 'ng-app' element found in the iframe.");
        }
      } catch (error) {
        console.error("Error during iframe AngularJS initialization:", error);
      }
    }, 200); // Increased delay to ensure the iframe's body is available
  };
}]);
