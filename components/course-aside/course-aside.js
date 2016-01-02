angular.module("courseAside", ["ngRoute"]).
    directive("courseAside", function() {
        return {
            templateUrl: "/components/course-aside/course-aside.html",
            transclude: false,
            controller: function($scope, $routeParams, $location) {
                $scope._id = $routeParams._id;
                $scope.$on('$routeUpdate', function() {
                    $scope.param = Object.keys($location.search())[0];
                });
                $scope.jump = function(param) {
                    $location.search(param);
                }
            }
        }
    });