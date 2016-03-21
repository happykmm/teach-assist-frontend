(function() {

    angular.module("courseMain", [
        'ui.router',
        'LocalStorageModule' ])
        .controller("courseMain", function($scope, $http, $stateParams, $location, localStorageService) {
            routeUpdate();
            $scope._id = $stateParams._id;
            $scope.$on('$routeUpdate', routeUpdate);
            $scope.users = localStorageService.get("users");

            function routeUpdate() {
                $scope.param = $stateParams.param;
            }
        });

})();


