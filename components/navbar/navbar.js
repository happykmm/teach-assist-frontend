(function() {

    angular.module("navbar", [
        'LocalStorageModule',
        'ui.router'
    ]).directive('navbar', function() {
        return {
            templateUrl: '/components/navbar/navbar.html',
            transclude: false,
            controller: function ($scope, $location, $http, localStorageService) {
                $scope.users = localStorageService.get('users');


            }
        }
    });
    
})();

