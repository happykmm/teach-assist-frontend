(function() {

    angular.module("courseMain", [
        'ui.router',
        'teachAssist',
        [
            'navbar',
            'usericon',
            'courseAside'
        ]
    ]).controller("courseMain", courseMain);


    function courseMain($scope, $rootScope, $state, $stateParams, userService) {
        //以下属性会继承给子控制器
        $scope.course_id = $stateParams.course_id;
        $scope.user = userService();
        $scope.state = $state.current.name.split('.');

        var cleanUp = $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams, options){
                $scope.state = toState.name.split('.');
            });

        //注销事件监听，否则会导致内存泄露
        $scope.$on('$destroy', function() {
            cleanUp();
        });
    }

})();


