(function() {

    angular.module('postList', [
        'flash',
        'ngCkeditor'
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
                $scope.isEdit=false;
                $scope.posts.push(res.data.post);
                $scope.length=$scope.posts.length;
                $scope.new.title="";
                $scope.new.content="";
                Flash.create("success", "发表成功！");
            })
        };

        getPostList();

        function getPostList() {
            $http({
                method: 'GET',
                url: 'API/posts/' + $scope.course_id
            }).then(function (res) {
                $scope.posts = res.data.posts;
                $scope.length=$scope.posts.length;
                filterPost('createdAt');
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