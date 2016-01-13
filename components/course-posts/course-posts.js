(function() {

    angular.module('coursePosts', [
        'flash'
    ]).directive('coursePosts', coursePosts);

    function coursePosts() {
        return {
            templateUrl: '/components/course-posts/course-posts.html',
            transclude: false,
            controller: function($scope, $http, Flash) {
                $scope.new = {};
                $scope.posts = [];

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
                        url: 'API/posts/'+$scope._id,
                        data: {
                            title: $scope.new.title,
                            content: $scope.new.content
                        }
                    }).then(function(res) {
                        var result = res.data;
                        if (result.code === 0) {
                            $scope.posts.push(result.posts[0]);
                            Flash.create("success", "发表成功！");
                        } else {
                            console.error(result);
                        }
                    }, function(err) {
                        console.error(err);
                    })
                };

                $http({
                    method: 'GET',
                    url: 'API/posts/'+$scope._id
                }).then(function(res) {
                    var result = res.data;
                    if (result.code === 0) {
                        $scope.posts = result.posts;
                    } else {
                        console.error(result);
                    }
                }, function(err) {
                    console.error(err);
                });
            }
        }
    }

})();