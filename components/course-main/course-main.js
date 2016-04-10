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

        // console.log($rootScope);
        // $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
        //     alert(1);
        //     console.log("TOSTATE");
        //     console.log(toState);
        //     console.log("TOSTATE");
        //     $scope.state = toState.name.replace("course.","");
        // });

        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams, options){
                event.preventDefault();
                alert(1);
                // transitionTo() promise will be rejected with
                // a 'transition prevented' error
            })
    }

})();


