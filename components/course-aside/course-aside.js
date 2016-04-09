(function() {

    angular.module("courseAside", ["ui.router"]).
        directive("courseAside", function() {
            return {
                templateUrl: "/components/course-aside/course-aside.html",
                transclude: false,
                controller: function($scope, $state, $location) {
                    $scope.jump = function(param) {
                        $state.go("course."+param);
                    }
                }
            }
        });


})();


