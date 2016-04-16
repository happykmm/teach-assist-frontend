(function() {

    angular.module("main", [
        'teachAssist',
        'ui.router',
        [
            'ngTouch',
            'angular-carousel',
            'usericon'
        ]
    ]).controller("main", main);

    function main($scope, $location, userService) {
        $scope.images = [
            'http://7xpijn.com1.z0.glb.clouddn.com/carousel01.jpg',
            'http://7xpijn.com1.z0.glb.clouddn.com/carousel02.jpg',
            'http://7xpijn.com1.z0.glb.clouddn.com/carousel03.jpg',
            'http://7xpijn.com1.z0.glb.clouddn.com/carousel04.jpg'
        ];
        $scope.user = userService();
        
    }

})();