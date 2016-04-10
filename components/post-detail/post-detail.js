(function(){

    angular.module('postDetail',[
        'flash'
    ]).controller('postDetail', postDetail);

    function postDetail($scope,$http,Flash,$location,$anchorScroll){
        var delayTime=5000,replyable=0;//delay reply control
        var oldTitle,oldContent;
        $scope.idEdit=false;

        $scope.$on("$locationChangeSuccess",function(){
            if($location.search().pid) {
                $scope.post_id = $location.search().pid;
                getDetail();
            }
        });
        if($location.search().pid) {
            $scope.post_id = $location.search().pid;
            getDetail();
        }

        $scope.like=function(){
            $http({
                method:'PUT',
                url:'API/posts/'+$scope.course_id+'/'+$scope.post_id+'/like'
            }).then(function(res){
                var result=res.data;
                if(result.code==0){
                    $scope.isLike=result.isLike;
                    if($scope.isLike){
                        $scope.countLike++;
                    }
                    else{
                        $scope.countLike--;
                    }
                }
                else{
                    Flash.create('danger',result.desc);
                    console.log(result.desc);
                }
            },function(err){
                Flash.create('danger','点赞失败!');
                console.error(err);
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
                var result=res.data;
                if(result.code==0){
                    $scope.isTop=result.isTop;
                }
                else{
                    Flash.create('danger',result.desc);
                    console.log(result,desc);
                }
            },function(err){
                Flash.create('danger','置顶失败!');
                console.error(err);
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
                var result=res.data;
                if(result.code==0){
                    $scope.isEdit=false;
                    Flash.create('success','更新成功!');
                }
                else{
                    Flash.create('danger','更新失败!');
                }
            },function(err){
                Flash.create('danger','更新失败!');
                console.error(err);
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
                var result=res.data;
                if(result.code==0){
                    Flash.create('success','删除帖子成功!');
                    setTimeout(function(){
                        $location.replace();
                        $location.search({param:'posts'});
                    })
                }
                else{
                    Flash.create('danger','删除帖子失败!');
                }
            },function(err){
                Flash.create('danger','删除帖子失败!');
                console.error(err);
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
                var result=res.data;
                if(result.code==0){
                    replyable=1;
                    setTimeout(function(){
                        replyable=0;
                    },delayTime);
                    $scope.replyList.push(result.reply);
                    $scope.countReply++;
                    $scope.reply.content="";
                    Flash.create('success','评论成功！');
                }
                else{
                    Flash.create('danger','评论失败！');
                    console.error(result.desc);
                }
            },function(err){
                Flash.create('danger','评论失败！');
                console.log(err);
            })
        };

        $scope.delReply=function(index){
            $http({
                method:'DELETE',
                url:'API/posts/'+$scope.course_id+'/'+$scope.post_id+'/'+$scope.replyList[index]._id
            }).then(function(res){
                var result=res.data;
                if(result.code==0){
                    $scope.replyList.splice(index,1);
                    $scope.countReply--;
                    Flash.create('success','删除评论成功!');
                }
                else{
                    Flash.create('danger','删除评论失败!');
                    console.error(result.desc);
                }
            },function(err){
                Flash.create('danger','删除评论失败！');
                console.log(err);
            })
        };

        function getDetail(){
            $http({
                method: 'GET',
                url: 'API/posts/' + $scope.course_id + '/' +$scope.post_id
            }).then(function(res){
                var result=res.data;
                if(result.code === 0){
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
                }
                else{
                    console.error(result.desc);
                }
            },function(err){
                console.error(err);
            })
        }
    }


})();