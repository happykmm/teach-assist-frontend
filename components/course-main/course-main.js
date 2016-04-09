(function() {

    angular.module("courseMain", [
        'ui.router',
        'LocalStorageModule',
        [
            'navbar',
            'usericon',
            'courseAside'
        ]
    ]).controller("courseMain", courseMain);


    function courseMain($scope, $state, $stateParams, $location, localStorageService) {
        routeUpdate();
        $scope.course_id = $stateParams.course_id;
        $scope.users = localStorageService.get("users");
        $scope.$on('$locationChangeSuccess', routeUpdate);
        function routeUpdate() {
            $scope.param = $state.current.url.replace("/","");
        }
    }

})();


