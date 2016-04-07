(function() {

    angular.module('coursePosts', [
        'flash'
    ]).directive('coursePosts', coursePosts);

    function coursePosts() {
        return {
            templateUrl: '/components/course-posts/course-posts.html',
            transclude: false,
            controller: function($scope, $http, Flash,$location) {
                $scope.$on("$locationChangeSuccess",getPostList);
                $scope.new = {};
                $scope.posts = [];
                $scope.isEdit=false;

                $scope.newPost=function(){
                    $scope.isEdit=true;
                };

                $scope.backForum=function(){
                    $scope.isEdit=false;
                };

                $scope.goDetail=function(post_id){
                    $location.search({'param':'detail','pid':post_id});
                };

                $scope.add = function() {
                    if (!$scope.new.title) {
                        Flash.create("danger", "标题不能为空");
                        return false;
                    }
                    if (!$scope.new.content) {
                        Flash.create("danger", "内容不能为空");
                        return false;
                    }
                    $http({
                        method: 'POST',
                        url: 'API/posts/'+$scope.course_id,
                        data: {
                            title: $scope.new.title,
                            content: $scope.new.content
                        }
                    }).then(function(res) {
                        var result = res.data;
                        if (result.code === 0) {
                            $scope.isEdit=false;
                            $scope.posts.push(result.post);
                            Flash.create("success", "发表成功！");
                        } else {
                            console.error(result.desc);
                        }
                    }, function(err) {
                        console.error(err);
                    })
                };

                getPostList();

                function getPostList() {
                    $http({
                        method: 'GET',
                        url: 'API/posts/' + $scope.course_id
                    }).then(function (res) {
                        var result = res.data;
                        if (result.code === 0) {
                            $scope.posts = result.posts;
                        } else {
                            console.error(result);
                        }
                    }, function (err) {
                        console.error(err);
                    });
                }
            }
        }
    }

})();