(function() {

    angular.module("main", ['LocalStorageModule', [
        'ngTouch',
        'angular-carousel',
        'usericon'
    ]]).controller("main", main);

    function main($scope, $location, localStorageService) {
        $scope.images = [
            'http://7xpijn.com1.z0.glb.clouddn.com/carousel01.jpg',
            'http://7xpijn.com1.z0.glb.clouddn.com/carousel02.jpg',
            'http://7xpijn.com1.z0.glb.clouddn.com/carousel03.jpg',
            'http://7xpijn.com1.z0.glb.clouddn.com/carousel04.jpg'
        ];

        $scope.login = function() {
            $location.path('/login');
        }

        $scope.users = localStorageService.get('users');
    }

})();