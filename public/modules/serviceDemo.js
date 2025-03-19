// public/modules/serviceDemo.js
angular.module('serviceDemoModule', [])
.controller('ServiceDemoController', ['$scope', function($scope) {
  console.log("ServiceDemoController loaded");
  $scope.items = ["Item 1", "Item 2", "Item 3"];
  $scope.snippetCode = 
`<!DOCTYPE html>
<html ng-app="serviceDemoApp">
<head>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
  <script>
    angular.module('serviceDemoApp', [])
    .service('DataService', function() {
      this.getItems = function() {
        return ['Item 1', 'Item 2', 'Item 3'];
      };
    })
    .controller('DemoController', ['$scope', 'DataService', function($scope, DataService) {
      $scope.items = DataService.getItems();
    }]);
  </script>
</head>
<body ng-controller="DemoController">
  <div>
    <h2>Service Demo</h2>
    <p>This demo shows data provided by an AngularJS service.</p>
    <ul>
      <li ng-repeat="item in items">{{ item }}</li>
    </ul>
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
          iframeDoc.defaultView.angular.bootstrap(appElement, ['serviceDemoApp']);
        } else {
          console.error("No 'ng-app' element found in the iframe.");
        }
      } catch (error) {
        console.error("Error during iframe AngularJS initialization:", error);
      }
    }, 200); // Increased delay to ensure the iframe's body is available
  };
}]);
