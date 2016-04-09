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
        console.log($state);
        console.log($stateParams);
        routeUpdate();
        $scope.course_id = $stateParams.course_id;
        $scope.$on('$stateChangeSuccess', routeUpdate);
        $scope.users = localStorageService.get("users");
        //console.log($scope.users);
        function routeUpdate() {
            console.log("f**************************k");
        }
    }

})();


