// public/modules/codemirrorEditor.js
angular.module('codeMirrorModule', [])
.directive('codeMirrorEditor', function() {
  return {
    restrict: 'A',
    scope: {
      codeContent: '='
    },
    link: function(scope, element, attrs) {
      // Initialize CodeMirror from the textarea element
      var editor = CodeMirror.fromTextArea(element[0], {
        mode: "javascript",
        lineNumbers: true,
        theme: "default"
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
    }
  };
});
