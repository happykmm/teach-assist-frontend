(function() {

    angular.module("navbar", [
        'teachAssist',
        'ui.router'
    ]).directive('navbar', function() {
        return {
            templateUrl: '/components/navbar/navbar.html',
            transclude: false,
            controller: function () {
                //nothing to do here
            }
        }
    });
    
})();

