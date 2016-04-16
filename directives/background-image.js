angular.module('backgroundImage', [
    //no dependency
]).directive('backgroundImage', backgroundImage);

function backgroundImage() {
    return {
        transclude: false,
        scope: {
            // Isolated Scope
            // @ Attribute string binding
            // = Two-way model binding
            // & Callback method binding
            url: '='
        },
        link: function(scope, element) {
            scope.$watch('url', function(newValue, oldValue) {
                element[0].style.backgroundImage = 'url(' + newValue + ')';
            });
        }
    }
}