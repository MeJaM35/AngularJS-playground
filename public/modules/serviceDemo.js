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
    iframeDoc.open();
    iframeDoc.write($scope.snippetCode);
    iframeDoc.close();

    // Delay the AngularJS bootstrap to ensure the body is available
    setTimeout(function() {
      // Manually bootstrap AngularJS within the iframe
      var script = iframeDoc.createElement('script');
      script.type = 'text/javascript';
      script.innerHTML = "angular.bootstrap(iframeDoc.documentElement, ['serviceDemoApp']);";
      iframeDoc.body.appendChild(script);
    }, 0);
  };
}]);
