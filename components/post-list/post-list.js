(function() {

    angular.module('postList', [
        'flash'
    ]).controller('postList', postList);

    function postList($scope, $http, Flash,$location,$filter) {

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

        $scope.filterPost=filterPost;

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
                    $scope.length=$scope.posts.length;
                    $scope.new.title="";
                    $scope.new.content="";
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
                    $scope.length=$scope.posts.length;
                    filterPost('createdAt');
                } else {
                    console.error(result);
                }
            }, function (err) {
                console.error(err);
            });
        }

        function filterPost(filterType){
            switch(filterType){
                case 'createdAt':$scope.filtId=1;break;
                case 'updatedAt':$scope.filtId=2;break;
                case 'countReply':$scope.filtId=3;break;
            }
            $scope.posts.sort(function(a,b) {
                if (a.isTop < b.isTop) return 1;
                else if (a.isTop > b.isTop) return -1;
                else{
                    if(a[filterType]< b[filterType]) return 1;
                    else return -1;
                }
            })
        }
    }


})();