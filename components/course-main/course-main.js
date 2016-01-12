angular.module("courseMain", [
    'navbar',
    'courseAside',
    'courseIntroSched',
    'courseStudents',
    'courseWare',
    'homework',
    'LocalStorageModule' ])
    .controller("courseMain", function($scope, $http, $routeParams, $location, localStorageService) {
        routeUpdate();
        $scope._id = $routeParams._id;
        $scope.$on('$routeUpdate', routeUpdate);
        $scope.users = localStorageService.get("users");

        function routeUpdate() {
            var search = Object.keys($location.search());
            //if (search.length === 0)
            //    $location.search('intro');
            $scope.param = search[0];
        }
    });