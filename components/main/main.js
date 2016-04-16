(function() {

    angular.module("main", [
        'teachAssist',
        'ui.router',
        [
            'ngTouch',
            'angular-carousel',
            'usericon',
            'backgroundImage'
        ]
    ]).controller("main", main);

    function main($scope, userService, $timeout) {
        
        $scope.images = [
            'http://7xpijn.com1.z0.glb.clouddn.com/carousel01.jpg',
            'http://7xpijn.com1.z0.glb.clouddn.com/carousel02.jpg',
            'http://7xpijn.com1.z0.glb.clouddn.com/carousel03.jpg',
            'http://7xpijn.com1.z0.glb.clouddn.com/carousel04.jpg'
        ];

        $scope.user = userService();
        
    }

})();