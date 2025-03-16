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
    iframeDoc.open();
    iframeDoc.write($scope.snippetCode);
    iframeDoc.close();

    // Delay the AngularJS bootstrap to ensure the body is available
    setTimeout(function() {
      // Manually bootstrap AngularJS within the iframe
      var script = iframeDoc.createElement('script');
      script.type = 'text/javascript';
      script.innerHTML = "angular.bootstrap(iframeDoc.documentElement, ['factoryDemoApp']);";
      iframeDoc.body.appendChild(script);
    }, 100); // Increased delay to ensure body is available
  };
}]);