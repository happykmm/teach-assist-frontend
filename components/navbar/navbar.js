(function() {

    angular.module("navbar", [
        'LocalStorageModule',
        'usericon'
    ]).directive('navbar', function() {
        return {
            templateUrl: '/components/navbar/navbar.html',
            transclude: false,
            controller: function ($scope, $location, $http, localStorageService) {
                $scope.users = localStorageService.get('users');

                $scope.linkToMain = function() {
                    $location.path('/').search({});
                }
            }
        }
    });

})();

