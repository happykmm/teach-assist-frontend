angular.module("courseAside", ["ngRoute"]).
    directive("courseAside", function() {
        return {
            templateUrl: "/components/course-aside/course-aside.html",
            transclude: false,
            controller: function($scope, $routeParams) {
                $scope._id = $routeParams._id;
                $scope.param = $routeParams.param;
                $scope.jump = function(param) {
                    location.href = "/#/courses/"+$scope._id+"/"+param;
                }
            }
        }
    });