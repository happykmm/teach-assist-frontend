angular.module("courseAside", ["ngRoute"]).
    directive("courseAside", function() {
        return {
            templateUrl: "/components/course-aside/course-aside.html",
            transclude: false,
            controller: function($scope, $routeParams, $location) {
                $scope.jump = function(param) {
                    $location.search(param);
                }
            }
        }
    });