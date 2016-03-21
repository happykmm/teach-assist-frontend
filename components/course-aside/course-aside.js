(function() {

    angular.module("courseAside", ["ui.router"]).
        directive("courseAside", function() {
            return {
                templateUrl: "/components/course-aside/course-aside.html",
                transclude: false,
                controller: function($scope, $stateParams, $location,$state) {
                    $scope.jump = function(param) {
                        //$location.search(param);
                        $state.go("courses_id",{"param":param});
                    }
                }
            }
        });


})();


