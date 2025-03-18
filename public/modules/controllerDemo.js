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
    iframeDoc.open();
    iframeDoc.write($scope.snippetCode);
    iframeDoc.close();
  };
}]);
