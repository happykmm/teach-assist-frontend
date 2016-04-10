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


    function courseMain($scope, $state, $stateParams, localStorageService, $rootScope) {
        //以下属性会继承给子控制器
        $scope.course_id = $stateParams.course_id;
        $scope.users = localStorageService.get("users");
        $scope.state = $state.current.name.replace("course.", "");
        
        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams, options){
                $scope.state = toState.name.replace("course.", "");
            });
    }

})();


