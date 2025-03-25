angular.module('debugInfoDemoModule', [])
.controller('DebugInfoDemoController', ['$scope', function($scope) {
  console.log("DebugInfoDemoController loaded");

  $scope.snippetCode = 
`<!DOCTYPE html>
<html ng-app="debugInfoDemoApp">
<head>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
  <script>
    angular.module('debugInfoDemoApp', [])
    .config(['$compileProvider', function($compileProvider) {
      $compileProvider.debugInfoEnabled(true); // Enables debug info for inspection
    }])
    .controller('DebugInfoDemoController', ['$scope', function($scope) {
      $scope.message = "Debug Info Demo";
    }]);
  </script>
</head>
<body ng-controller="DebugInfoDemoController">
  <h1>{{ message }}</h1>
  <p>Check the console and run:</p>
  <code>angular.element(document.querySelector('[ng-controller]')).scope()</code>
</body>
</html>`;

  $scope.updateIframe = function() {
    var iframe = document.getElementById('liveDemoIframe');
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    iframeDoc.open();
    iframeDoc.write($scope.snippetCode);
    iframeDoc.close();

    setTimeout(function() {
      if (iframeDoc.defaultView.angular) {
        var appElement = iframeDoc.querySelector('[ng-app]');
        if (appElement) {
          var appScope = iframeDoc.defaultView.angular.element(appElement).scope();
          if (appScope) {
            appScope.$destroy();
          }
        }
      }
      var appElement = iframeDoc.querySelector('[ng-app]');
      if (appElement) {
        iframeDoc.defaultView.angular.bootstrap(appElement, ['debugInfoDemoApp']);
      }
    }, 100);
  };
}]);
