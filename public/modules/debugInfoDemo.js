angular.module('debugInfoDemoModule', [])
.config(['$compileProvider', function($compileProvider) {
  $compileProvider.debugInfoEnabled(true);
}])
.controller('DebugInfoDemoController', ['$scope', '$timeout', '$compile', function($scope, $timeout, $compile) {
  console.log("DebugInfoDemoController loaded");

  $scope.debugOutput = {
    message: '',
    debugInfo: {},
    errors: []
  };

  $scope.snippetCode = 
`<!DOCTYPE html>
<html>
<head>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.js"></script>
  <script>
    // Error handler
    window.onerror = function(msg, url, line, col, error) {
      window.parent.postMessage({
        type: 'error',
        error: { message: msg, stack: error ? error.stack : null }
      }, '*');
      return false;
    };

    // Forward console messages
    (function(console) {
      var methods = ['log', 'debug', 'error', 'info', 'warn'];
      methods.forEach(function(method) {
        var original = console[method];
        console[method] = function() {
          original.apply(console, arguments);
          window.parent.postMessage({
            type: 'console',
            method: method,
            args: Array.from(arguments)
          }, '*');
        };
      });
    })(window.console);

    // Initialize app after DOM loaded
    document.addEventListener('DOMContentLoaded', function() {
      angular.module('debugInfoDemoApp', [])
      .config(['$compileProvider', function($compileProvider) {
        $compileProvider.debugInfoEnabled(true);
      }])
      .controller('DebugInfoDemoController', ['$scope', function($scope) {
        $scope.message = "Debug Info Demo";
        
        $scope.debugInfo = {
          angularVersion: angular.version,
          scopeId: $scope.$id,
          timestamp: new Date().toISOString()
        };

        window.parent.postMessage({
          type: 'debugInfo',
          data: {
            message: $scope.message,
            debugInfo: $scope.debugInfo
          }
        }, '*');

        $scope.triggerError = function() {
          throw new Error('Test error from DebugInfoDemo');
        };
      }]);

      // Manual bootstrap
      angular.bootstrap(document.body, ['debugInfoDemoApp']);
    });
  </script>
  <style>
    .debug-info { 
      background: #f0f0f0; 
      padding: 10px; 
      margin: 10px 0; 
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .debug-value {
      font-family: monospace;
      white-space: pre-wrap;
    }
  </style>
</head>
<body ng-controller="DebugInfoDemoController">
  <h1>{{message}}</h1>
  
  <div class="debug-info">
    <h3>Debug Information:</h3>
    <div class="debug-value">{{debugInfo | json}}</div>
    <p>Angular Debug Elements: Check elements for .ng-scope and .ng-binding classes</p>
  </div>

  <button ng-click="triggerError()">Trigger Test Error</button>
</body>
</html>`;

  // Listen for messages from iframe
  window.addEventListener('message', function(event) {
    $scope.$apply(function() {
      if (event.data.type === 'debugInfo') {
        $scope.debugOutput = event.data.data;
      } else if (event.data.type === 'error') {
        $scope.debugOutput.errors.push(event.data.error);
      } else if (event.data.type === 'console') {
        console[event.data.method].apply(console, event.data.args);
      }
    });
  });

  $scope.updateIframe = function() {
    var iframe = document.getElementById('liveDemoIframe');
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    try {
      iframeDoc.open();
      iframeDoc.write($scope.snippetCode);
      iframeDoc.close();
    } catch (error) {
      console.error('Error in updateIframe:', error);
      $scope.debugOutput.errors.push(error);
    }
  };

  // Initialize on load
  $timeout($scope.updateIframe, 0);
}]);
