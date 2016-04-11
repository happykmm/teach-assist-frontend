(function() {

    angular.module('login', [
        'LocalStorageModule',
        'ui.router'
    ]).controller('login', login);

    function login($scope, $http, $timeout, $location, localStorageService) {
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
                var result = res.data;
                if (result.code === 0) {
                    console.log("Login success, token=" + result.token);
                    localStorageService.set("users", result);
                    $http.defaults.headers.common["x-access-token"] = result.token;
                    $location.url('/courses');
                } else {
                    $scope.errorMessage = result.desc;
                    $timeout(function() {
                        $scope.errorMessage = null;
                    }, 2000);
                }
            }, function (err) {
                console.error(err);
            });
        }
    }


})();


