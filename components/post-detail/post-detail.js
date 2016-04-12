(function(){

    angular.module('postDetail',[
        'flash'
    ]).controller('postDetail', postDetail);

    function postDetail($scope,$http,Flash,$location,$anchorScroll,$state,$stateParams){
        var delayTime=5000,replyable=0;//delay reply control
        var oldTitle,oldContent;
        $scope.idEdit = false;
        $scope.post_id = $stateParams.post_id;
        getDetail();


        $scope.like=function(){
            $http({
                method:'PUT',
                url:'API/posts/'+$scope.course_id+'/'+$scope.post_id+'/like'
            }).then(function(res){
                $scope.isLike = res.data.isLike;
                $scope.isLike ? $scope.countLike++ : $scope.countLike--;
            })
        };

        $scope.goEditAnchor=function(){
            $anchorScroll('replyBox');
        };

        $scope.makeTop=function(){
            $http({
                method:'PUT',
                url:'API/posts/'+$scope.course_id+'/'+$scope.post_id+'/top'
            }).then(function(res){
                $scope.isTop=res.data.isTop;
            })
        }

        $scope.editPost=function(){
            oldTitle=$scope.title;
            oldContent=$scope.content;
            $scope.isEdit=true;
        };

        $scope.updatePost=function(){
            $http({
                method:'PUT',
                url:'API/posts/'+$scope.course_id+'/'+$scope.post_id,
                data:{
                    title:$scope.title,
                    content:$scope.content
                }
            }).then(function(res){
                $scope.isEdit=false;
                Flash.create('success','更新成功!');
            })
        };

        $scope.goBack=function(){
            $scope.title=oldTitle;
            $scope.content=oldContent;
            $scope.isEdit=false;
        }

        $scope.delPost=function(){
            $http({
                method:'DELETE',
                url:'API/posts/'+$scope.course_id+'/'+$scope.post_id
            }).then(function(res){
                Flash.create('success','删除帖子成功!');
                $location.replace();
                $state.go("course.posts");
            })
        };

        $scope.addReply=function(){
            if(replyable){
                Flash.create('warning',delayTime/1000+'秒后再试试');
                return false;
            }
            if(!$scope.reply.content){
                Flash.create('danger','评论不可为空!');
                return false;
            }
            $http({
                method:'POST',
                url:'API/posts/'+$scope.course_id+'/'+$scope.post_id,
                data:{
                    content:$scope.reply.content
                }
            }).then(function(res){
                replyable=1;
                setTimeout(function(){
                    replyable=0;
                },delayTime);
                $scope.replyList.push(res.data.reply);
                $scope.countReply++;
                $scope.reply.content="";
                Flash.create('success','评论成功！');
            })
        };

        $scope.delReply=function(index){
            $http({
                method:'DELETE',
                url:'API/posts/'+$scope.course_id+'/'+$scope.post_id+'/'+$scope.replyList[index]._id
            }).then(function(res){
                $scope.replyList.splice(index,1);
                $scope.countReply--;
                Flash.create('success','删除评论成功!');
            })
        };

        function getDetail(){
            $http({
                method: 'GET',
                url: 'API/posts/' + $scope.course_id + '/' +$scope.post_id
            }).then(function(res){
                var result=res.data;
                $scope.postOwner=result.post.userId;
                $scope.title=result.post.title;
                $scope.content=result.post.content;
                $scope.countLike=result.post.countLike;
                $scope.countRead=result.post.countRead;
                $scope.countReply=result.post.countReply;
                $scope.author=result.post.userName;
                $scope.replyList=result.post.reply;
                $scope.isLike=result.post.isLike;
                $scope.isTop=result.post.isTop;
            })
        }
    }


})();