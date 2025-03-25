angular.module('unittestDemoModule', [])
.controller('UnitTestDemoController', ['$scope', function($scope) {
  console.log("UnitTestDemoController loaded");

  $scope.snippetCode = 
`<!DOCTYPE html>
<html ng-app="unittestDemoApp">
<head>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"></script>
  <script>
    angular.module('unittestDemoApp', [])
    .controller('UnitTestDemoController', ['$scope', function($scope) {
      $scope.message = "Testing Example";
      $scope.reverseMessage = function() {
        return $scope.message.split('').reverse().join('');
      };
    }]);
  </script>
</head>
<body ng-controller="UnitTestDemoController">
  <p>Original: {{ message }}</p>
  <p>Reversed: {{ reverseMessage() }}</p>
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
        iframeDoc.defaultView.angular.bootstrap(appElement, ['unittestDemoApp']);
      }
    }, 100);
  };
}]);
