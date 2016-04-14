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


    function courseMain($scope, $stateParams, userService) {
        //以下属性会继承给子控制器
        $scope.course_id = $stateParams.course_id;
        $scope.users = userService();

        // setInterval(function() {
        //     console.error($scope.state);
        // }, 1000);
    }

})();


