(function() {

    angular.module("courseAside", [
        "ui.router"
    ]).directive("courseAside", courseAside);
        
        
    function courseAside() {
        return {
            templateUrl: "/components/course-aside/course-aside.html",
            transclude: false,
            controller: function($scope, $state) {
                // 从父控制器继承
                // $scope.course_id = $stateParams.course_id;
                // $scope.users = localStorageService.get("users");
                // $scope.param = "";
            }
        }
    }


})();


