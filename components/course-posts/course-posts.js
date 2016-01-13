(function() {

    angular.module('coursePosts', [

    ]).directive('coursePosts', coursePosts);

    function coursePosts() {
        return {
            templateUrl: '/components/course-posts/course-posts.html',
            transclude: false,
            controller: function($scope) {

            }
        }
    }

})();