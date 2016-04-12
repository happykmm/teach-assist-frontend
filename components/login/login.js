(function() {

    angular.module('login', [
        'teachAssist',
        'ui.router'
    ]).controller('login', login);

    function login($scope, $http, $state, userService) {
        $scope.errorMessage = null;
        $scope.submit = function () {
            if (!$scope.username || !$scope.password) {
                console.log("invalid username or password");
                return false;
            }
            $http({
                method: 'POST',
                url: "API/login",
                data: {
                    username: $scope.username,
                    password: $scope.password
                }
            }).then(function (res) {
                userService(res.data);
                $state.go('courses');
            });
        }
    }


})();


