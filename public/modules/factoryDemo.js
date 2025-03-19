angular.module('factoryDemoModule', [])
.factory('DataFactory', function() {
  var items = ['Item 1', 'Item 2', 'Item 3'];
  return {
    getItems: function() {
      return items;
    }
  };
})
.controller('FactoryDemoController', ['$scope', 'DataFactory', function($scope, DataFactory) {
  console.log("FactoryDemoController loaded");
  $scope.items = DataFactory.getItems();
  $scope.snippetCode = 
`<!DOCTYPE html>
<html ng-app="factoryDemoApp">
<head>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
  <script>
    angular.module('factoryDemoApp', [])
    .factory('DataFactory', function() {
      var items = ['Item 1', 'Item 2', 'Item 3'];
      return {
        getItems: function() {
          return items;
        }
      };
    })
    .controller('DemoController', ['$scope', 'DataFactory', function($scope, DataFactory) {
      $scope.items = DataFactory.getItems();
    }]);
  </script>
</head>
<body ng-controller="DemoController">
  <div>
    <h2>Factory Demo</h2>
    <p>This demo shows how to use AngularJS factories.</p>
    <ul>
      <li ng-repeat="item in items track by $index">{{ item }}</li>
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
          iframeDoc.defaultView.angular.bootstrap(appElement, ['factoryDemoApp']);
        } else {
          console.error("No 'ng-app' element found in the iframe.");
        }
      } catch (error) {
        console.error("Error during iframe AngularJS initialization:", error);
      }
    }, 200); // Increased delay to ensure the iframe's body is available
  };
}]);