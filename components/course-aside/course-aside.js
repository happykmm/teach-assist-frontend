(function() {

    angular.module("courseAside", [
        "ui.router"
    ]).directive("courseAside", courseAside);
        
        
    function courseAside() {
        return {
            templateUrl: "/components/course-aside/course-aside.html",
            transclude: false,
            scope: {
                // scope 表示建立独立作用域
                // param: "@", //@表示取字面值
                user: "="  //=表示双向绑定
            },
            controller: function($scope, $state, $rootScope) {
                $scope.state = $state.current.name.replace("course.", "");
                
                var cleanUp = $rootScope.$on('$stateChangeStart',
                    function(event, toState, toParams, fromState, fromParams, options){
                        $scope.state = toState.name.replace("course.", "");
                    });
                
                //注销事件监听，否则会导致内存泄露
                $scope.$on('$destroy', function() {
                    cleanUp();
                });
            }
        }
    }


})();


