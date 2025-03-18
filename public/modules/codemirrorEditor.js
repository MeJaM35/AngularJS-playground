// public/modules/codemirrorEditor.js
angular.module('codeMirrorModule', [])
.directive('codeMirrorEditor', ['ThemeService', function(ThemeService) {
  return {
    restrict: 'A',
    scope: {
      codeContent: '='
    },
    link: function(scope, element, attrs) {
      // Set theme based on current mode
      const theme = ThemeService.isDarkMode ? 'material' : 'duotone-light';
      
      // Initialize CodeMirror from the textarea element
      var editor = CodeMirror.fromTextArea(element[0], {
        mode: attrs.mode || "javascript",
        lineNumbers: true,
        theme: theme,
        lineWrapping: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        indentUnit: 2,
        tabSize: 2
      });
      
      // Watch for changes in the bound variable and update the editor content
      scope.$watch('codeContent', function(newVal) {
        if(newVal !== editor.getValue()) {
          editor.setValue(newVal || "");
        }
      });
      
      // Update the scope variable when the editor content changes
      editor.on("change", function(cm) {
        scope.$applyAsync(function() {
          scope.codeContent = cm.getValue();
        });
      });
      
      // Listen for theme changes
      scope.$on('themeChanged', function(event, isDarkMode) {
        editor.setOption('theme', isDarkMode ? 'material' : 'duotone-light');
      });
    }
  };
}]);