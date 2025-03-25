angular.module('debuggerDemoModule', [])
.controller('DebuggerDemoController', ['$scope', function($scope) {
  console.log("DebuggerDemoController loaded");
  

  $scope.snippetCode = 
`<!DOCTYPE html>
<html ng-app="debuggerDemoApp">
<head>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
  <script>
    angular.module('debuggerDemoApp', [])
    .controller('DebuggerDemoController', ['$scope', function($scope) {
      $scope.value = 10;
      $scope.increment = function() {
        console.log('Before increment:', $scope.value);
        debugger; // Breakpoint for inspection
        $scope.value++;
        console.log('After increment:', $scope.value);
      };
    }]);
  </script>
</head>
<body ng-controller="DebuggerDemoController">
  <p>Value: {{ value }}</p>
  <button ng-click="increment()">Increment Value</button>
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
        iframeDoc.defaultView.angular.bootstrap(appElement, ['debuggerDemoApp']);
      }
    }, 100);
  };
}]);
