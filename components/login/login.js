var login = angular.module('login', []);

login.directive('login', function($location) {
    return {
        templateUrl: '/components/login/login.html',
        transclude: false,        //disable content between <login></login>
        scope: {

        },
        controller: function($scope) {
            $scope.submit = function () {
                if (!$scope.username || !$scope.password) {
                    console.log("invalid");
                    return false;
                }

                console.log($scope.username);
                console.log($scope.password);
            }
        }

    }
})

