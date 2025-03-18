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
      $scope.greeting = "Hello, World!";
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
    iframeDoc.open();
    iframeDoc.write($scope.snippetCode);
    iframeDoc.close();
  };
}]);
