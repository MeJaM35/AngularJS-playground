angular.module('templateDemoModule', [])
.controller('TemplateDemoController', ['$scope', function($scope) {
  console.log("TemplateDemoController loaded");
  $scope.snippetCode = 
`<!DOCTYPE html>
<html ng-app="templateDemoApp">
<head>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
  <script>
    angular.module('templateDemoApp', [])
    .controller('DemoController', ['$scope', function($scope) {
      $scope.message = "Hello, AngularJS Templates!";
    }]);
  </script>
</head>
<body ng-controller="DemoController">
  <div>
    <h2>Template Demo</h2>
    <p>{{ message }}</p>
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
      script.innerHTML = "angular.bootstrap(iframeDoc.documentElement, ['templateDemoApp']);";
      iframeDoc.body.appendChild(script);
    }, 100); // Increased delay to ensure body is available
  };
}]);