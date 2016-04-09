(function() {

    angular.module("courseAside", [
        "ui.router"
    ]).directive("courseAside", courseAside);
        
        
    function courseAside() {
        return {
            templateUrl: "/components/course-aside/course-aside.html",
            transclude: false,
            controller: function($scope, $state) {
                $scope.jump = function(param) {
                    $state.go("course."+param);
                }
            }
        }
    }


})();


